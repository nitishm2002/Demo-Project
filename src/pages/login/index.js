import { Box, FormHelperText } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Translations from 'src/layouts/components/Translations'
import useCustomTranslation from 'src/@core/hooks/useCustomTranslation'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormValidationMessages } from 'src/constants/form.const'
import { useAuth } from 'src/hooks/useAuth'
import { axiosInstance } from 'src/network/adapter'
import { ApiEndPoints } from 'src/network/endpoints'
import { toastError, toastSuccess } from 'src/utils/utils'
import { Link } from 'react-router-dom'

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 500
  }
}))

const validationSchema = yup.object().shape({
  email: yup.string().email(FormValidationMessages.EMAIL.invalid).required(FormValidationMessages.EMAIL.required),
  password: yup
    .string()
    .min(FormValidationMessages.PASSWORD.minLength, FormValidationMessages.PASSWORD.minLengthErrorMessage)
    .matches(FormValidationMessages.PASSWORD.pattern, FormValidationMessages.PASSWORD.patternErrorMessage)
    .required(FormValidationMessages.PASSWORD.required)
})

const LoginPage = () => {
  const auth = useAuth()
  const translation = useCustomTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'admin@bobcat.com',
      password: 'Admin@1234'
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  })

  const onSubmit = data => {
    setLoading(true)
    let payload = {
      email: data.email,
      password: data.password
    }
    axiosInstance
      .post(ApiEndPoints.AUTH.login, payload)
      .then(response => response.data)
      .then(response => {
        toastSuccess(response.message)
        auth.login(response.data)
      })
      .catch(error => {
        toastError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {/* <Header /> */}
      <Box
        sx={{
          p: { md: 12, xs: 8 },
          marginTop: "-70px",
          height: '65vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '20px'
        }}
      >
        <BoxWrapper>
          <Box sx={{ mb: 6 }} display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <Typography variant='fm-h4' color='neutral.80' fontWeight={600}>
              <Translations text='Login' />
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel htmlFor='email'>{translation.translate('form.email.label')}</FormLabel>
              <Controller
                name='email'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    autoFocus
                    onChange={onChange}
                    id='email'
                    value={value}
                    placeholder={translation.translate('form.email.placeholder')}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <Translations text={`form.email.error.${errors.email.message}`} />
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel htmlFor='password'>{translation.translate('form.password.label')}</FormLabel>
              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field: { value, onChange } }) => (
                  <TextField
                    id='password'
                    placeholder={translation.translate('form.password.placeholder')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    value={value}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={handleTogglePassword} edge='start'>
                            {showPassword ? <Visibility fontSize='small' /> : <VisibilityOff fontSize='small' />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true
                    }}
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <Translations text={`form.password.error.${errors.password.message}`} />
                </FormHelperText>
              )}
            </FormControl>
            <Typography
              variant='body2'
              color='neutral.100'
              align='right'
              sx={{ mr: 2, mb: 4, cursor: 'pointer', textDecoration: 'underline' }}
            >
              {/* <span style={{ color: '#FB3601', fontWeight: 600 }}>Resend OTP </span> */}
              <Translations text='Forgot Password?' />
            </Typography>
            <LoadingButton
              sx={{ borderRadius: '10px', height: '48px', fontWeight: 600 }}
              fullWidth
              loading={loading}
              size='large'
              type='submit'
              variant='contained'
            >
              <Translations text='Next' />
            </LoadingButton>
          </form>
          <Link to='/register' underline='none' style={{ cursor: 'pointer', textDecoration: "none" }}>
            <Typography variant='body2' color='neutral.100' align='center' sx={{ mr: 2, mt: 7, fontWeight: 500 }}>
              <Translations text='Don’t have an account? ' />
              <span style={{ color: '#1A7AE7', fontWeight: 600 }}>Sign Up </span>
            </Typography>
          </Link>
        </BoxWrapper>
      </Box>
    </>
  )
}

export default LoginPage
