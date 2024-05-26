import * as React from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../store/userSlice'
import { roleActions } from '../../store/roleSlice'
import axiosInstance from '../../api/axiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import { Button } from '@mui/material'
import styles from './index.module.scss'

function createData(id, name, email, role, created_at) {
  return {
    id,
    name,
    email,
    role,
    created_at
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: true,
    label: "Ім'я",
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Електронна пошта',
  },
  {
    id: 'role',
    numeric: true,
    disablePadding: false,
    label: 'Роль',
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Дата створення',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'дія',
  },
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, rowCount } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

function EnhancedTableToolbar(props) {
  const { numSelected, onDelete } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} обрано
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Користувачі
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => onDelete()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default function UserTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const users = useSelector(state => state.user.users)
  const roles = useSelector(state => state.role.roles)
  const accessToken = useSelector(state => state.auth.token)
  const [changedRole, setChangedRole] = React.useState([])
  const dispatch = useDispatch()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  )

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('admin/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const users = response.data.map(user =>
        createData(user.id, user.name, user.email, user.role, user.created_at)
      )

      dispatch(userActions.setUsers(users))
      setRows(users)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/role', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      dispatch(roleActions.setRoles(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRoleChange = (e, id) => {
    const roleId = e.target.value

    setChangedRole(prevChangedRole => {
      const newChangedRole = prevChangedRole.filter(item => item.user_id !== id)
      newChangedRole.push({ user_id: id, role_id: roleId })
      return newChangedRole
    })
  }

  const handleRoleUpdate = async id => {
    const roleChange = changedRole.find(item => item.user_id === id)
    if (!roleChange) return

    try {
      const response = await axiosInstance.put(
        `/admin/user/${id}`,
        {
          role_id: roleChange.role_id,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      setChangedRole(changedRole.filter(item => item.user_id !== id))

      const updatedUsers = users.map(item =>
        item.id === id ? { ...item, role: response.data.role } : item
      )

      dispatch(userActions.setUsers(updatedUsers))

      toast.success('Роль користувача змінена')
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (accessToken) {
      fetchUsers()
      fetchRoles()
    }
  }, [accessToken])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={() => {}}
        />
        <TableContainer className={styles.tableContainer}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow tabIndex={-1} key={row.id}>
                    <TableCell padding="checkbox" />
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      <select
                        className={styles.roleSelect}
                        onChange={e => handleRoleChange(e, row.id)}
                      >
                        {roles &&
                          roles.map(role => (
                            <option
                              selected={role.name === row.role}
                              key={role.id}
                              value={role.id}
                            >
                              {role.name}
                            </option>
                          ))}
                      </select>
                    </TableCell>
                      <TableCell align="right">{row.created_at}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleRoleUpdate(row.id)}
                        className={styles.button}
                        disabled={
                          !changedRole.find(item => item.user_id === row.id)
                        }
                      >
                        Змінити роль
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
      />
    </Box>
  )
}
