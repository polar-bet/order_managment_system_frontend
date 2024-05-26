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
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { PlusSquare } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../store/productSlice'
import axiosInstance from '../../api/axiosInstance'
import CreateProductForm from '../../components/Product/Create'
import { Edit } from '@mui/icons-material'
import UpdateProductForm from '../../components/Product/Update'
import { ToastContainer, toast } from 'react-toastify'
import { orderActions } from '../../store/orderSlice'
import { Button } from '@mui/material'

function createData(id, status, product, destination, count, price) {
  return {
    id,
    product,
    status,
    destination,
    count,
    price,
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Назва товару',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Статус',
  },
  {
    id: 'destination',
    numeric: false,
    disablePadding: false,
    label: 'Пункт призначення',
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: 'Кількість (шт)',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Сума (грн)',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'дія',
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
        // padding="checkbox"
        >
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
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
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
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
          Запити на замовлення
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
  // numSelected: PropTypes.number.isRequired,
  // onDelete: PropTypes.func.isRequired,
}

export default function AdminRequestTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('name')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])
  const requests = useSelector(state => state.order.requests)
  const products = useSelector(state => state.product.products)
  const accessToken = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('product', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      dispatch(productActions.setProducts(response.data))
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get('admin/order', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const orders = response.data.map(order =>
        createData(
          order.id,
          order.status,
          order.product,
          order.destination,
          order.count,
          order.price
        )
      )

      dispatch(orderActions.setRequests(orders))
      setRows(orders)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const handleDelivered = async id => {
    try {
      const response = await axiosInstance.put(`/order/${id}/delivered`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      const updatedRequests = requests.map(item =>
        item.id === id ? response.data : item
      )

      dispatch(orderActions.setRequests(updatedRequests))

      toast.success('Запит позначено як «доставлено»')
    } catch (error) {
      console.log(error)
    }
  }

  const handleExecute = async id => {
    try {
      const response = await axiosInstance.put(`/order/${id}/execute`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      const updatedRequests = requests.map(item =>
        item.id === id ? response.data.order : item
      )

      const updatedProducts = products.map(item => {
        const product = response.data.product
        return item.id === product.id ? product : item
      })

      console.log(updatedProducts)

      dispatch(orderActions.setRequests(updatedRequests))
      dispatch(productActions.setProducts(updatedProducts))

      toast.success('Запит відправлено на виконання')
    } catch (error) {
      console.log(error)
      const errorData = error.response.data
      if (errorData) {
        toast.error(errorData.message)
      }
    }
  }
  const handleDecline = async id => {
    try {
      const response = await axiosInstance.put(`/order/${id}/decline`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      const updatedRequests = requests.map(item =>
        item.id === id ? response.data : item
      )

      dispatch(orderActions.setRequests(updatedRequests))

      toast.success('Запит відхилено')
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (accessToken) {
      fetchRequests()
      fetchProducts()
    }
  }, [accessToken])

  React.useEffect(() => {
    if (requests) {
      setRows(requests)
    }
  }, [requests])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          // onDelete={handleDelete}
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
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    // selected={isItemSelected}
                    // sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      {/* <Checkbox
                        onClick={event => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      /> */}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.product.name}
                    </TableCell>
                    <TableCell align="right">{row.status.label}</TableCell>
                    <TableCell align="right">{`${row.destination.lat},${row.destination.lng}`}</TableCell>
                    <TableCell align="right">{row.count.toFixed(2)}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <div className={styles.actions}>
                        {row && row.status.name === 'approved' && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() => handleExecute(row.id)}
                              className={`${styles.button} ${styles.button__approve}`}
                            >
                              Виконати
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDecline(row.id)}
                              className={`${styles.button} ${styles.button__delete}`}
                            >
                              Відхили
                            </Button>
                          </>
                        )}
                        {row && row.status.name === 'in_progress' && (
                          <>
                            <Button
                              variant="contained"
                              onClick={() => handleDelivered(row.id)}
                              className={`${styles.button} ${styles.button__approve}`}
                            >
                              доставлено
                            </Button>
                          </>
                        )}
                      </div>
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
