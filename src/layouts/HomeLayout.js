import { Box, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
// import Logo from 'src/@core/components/logo'
import { useSettings } from 'src/@core/hooks/useSettings'

import Header from './components/Header';

const RightWrapper = styled(Box)(({ theme }) => ({
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 550
  }
}))

const HomeLayout = ({ children }) => {
  const theme = useTheme()
  const { settings } = useSettings()

  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Grid container className='content-right' spacing={4}>
        <Header />
        <Grid item xs={12}>
          <Box className='content-center'>
            <RightWrapper
              sx={
                skin === 'bordered' && !hidden
                  ? { borderLeft: `1px solid ${theme.palette.divider}`, height: '100%' }
                  : {}
              }
            >
              {children}
            </RightWrapper>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default HomeLayout
