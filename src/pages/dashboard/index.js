import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FallbackSpinner from 'src/@core/components/spinner'
import { axiosInstance } from 'src/network/adapter'
import { ApiEndPoints } from 'src/network/endpoints'
import { toastError } from 'src/utils/utils'

const data = [
  {
    stats: '0',
    title: 'Plan Owner',
    type: 'total_planOwners',
    link: '/plan-owner'
  },
  {
    stats: '0',
    title: 'Provider',
    type: 'total_providers',
    link: '/provider'
  },
  {
    stats: '0',
    title: 'Member',
    type: 'total_members',
    link: '/member'
  },
  {
    stats: '0',
    title: 'Services',
    type: 'total_plan_services',
    link: '/plan-services'
  },
  {
    stats: '0',
    title: 'Package',
    type: 'total_packages',
    link: '/plan-packages'
  },
  {
    stats: '0',
    title: 'Subscription',
    link: '/subscription-plans'
  },
  {
    stats: '0',
    title: 'Medical Specs',
    type: 'total_medical_specializations',
    link: '/medical-specialization'
  }
]
function DashBoardPage() {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = React.useState(data)
  const fetchData = () => {
    setLoading(true)

    axiosInstance
      .get(ApiEndPoints.DASHBOARD.count)
      .then(response => {
        let data = response.data.data
        setStats(prev =>
          prev.map(p => ({
            ...p,
            ...(data[`${p.type}`] && { stats: data[`${p.type}`] })
          }))
        )
      })
      .catch(error => {
        toastError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  if (loading) {
    return <FallbackSpinner />
  }
  return (
    <>
      <Grid container spacing={6} height={100}>
        {stats.map((item, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Typography component={Link} to={item.link} key={index} variant='body1' sx={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  overflow: 'visible',
                  position: 'relative',
                  border: '1px solid #7338AC',
                  backgroundImage: `url('/assets/images/logo.png')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom right'
                }}
              >
                <CardContent>
                  <Typography sx={{ mb: 10, fontWeight: 600 }}>{item.title}</Typography>
                  <Box>
                    <Typography key={index} variant='h5'>
                      {item.stats}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default DashBoardPage
