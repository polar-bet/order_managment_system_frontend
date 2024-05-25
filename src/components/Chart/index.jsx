import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts'
import axiosInstance from '../../api/axiosInstance'
import { useSelector } from 'react-redux'
import { red } from '@mui/material/colors'

const OrderChart = () => {
  const [data, setData] = useState([])
  const accessToken = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/stats', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAdminStats = async () => {
    try {
      const response = await axiosInstance.get('/admin/stats', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAdminStats()
    } else {
      fetchStats()
    }
  }, [user])

  const dates = data.map(item => item.date)
  const quantities = data.map(item => item.quantity)

  return (
    <BarChart
      series={[{ data: quantities }]}
      height={400}
      xAxis={[{ data: dates, scaleType: 'band' }]}
      margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
    />
  )
}

export default OrderChart
