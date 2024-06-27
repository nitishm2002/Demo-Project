import { Box, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
// import Logo from 'src/@core/components/logo'
import { useSettings } from 'src/@core/hooks/useSettings'
import Logo from 'src/assets/Logo.png'

import Header from './components/Header';

const LeftWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  padding: '24px',
  display: 'flex'
}))

const LeftContainer = styled(Box)(({ theme }) => ({
  borderRadius: '24px',
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  background: '#8C77B8',
  backgroundImage: 'url(/assets/images/illustration_bg.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))

const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  marginTop: '125px',
  padding: '25px',
  maxWidth: '400px',
  alignItems: 'center'
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  margin: 'auto',
  [theme.breakpoints.up('md')]: {
    maxWidth: 550
  }
}))

const AuthLayout = ({ children }) => {
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

export default AuthLayout
