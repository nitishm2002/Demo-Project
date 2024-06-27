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
import Logo from 'src/assets/logo-sm.png'

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

const ChangeEmailPage = () => {
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
          <Box sx={{ mb: 6 }} gap={4} display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
            <img src={Logo} alt='Logo' style={{ height: '62px', width: '64px' }} />
            <Typography variant='fm-h4' color='neutral.80' fontWeight={600}>
              <Translations text='Change Email Address' />
            </Typography>
            <Typography variant='fm-p2' color='neutral.70' fontWeight={400}>
              <Translations text='Provide your new email address.' />
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel htmlFor='email'>
                <Translations text='Current Address' />
              </FormLabel>
              <Controller
                name='current_email'
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
              {errors.current_email && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <Translations text={`form.email.error.${errors.current_email.message}`} />
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel htmlFor='email'>
                <Translations text='New Email Address' />
              </FormLabel>
              <Controller
                name='new_email'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    autoFocus
                    onChange={onChange}
                    id='email'
                    value={value}
                    placeholder={translation.translate('form.email.placeholder')}
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
              {errors.new_email && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <Translations text={`form.email.error.${errors.new_email.message}`} />
                </FormHelperText>
              )}
            </FormControl>
            <LoadingButton
              sx={{ borderRadius: '10px', height: '48px', fontWeight: 600 }}
              fullWidth
              loading={loading}
              size='large'
              type='submit'
              variant='contained'
            >
              <Translations text='Change' />
            </LoadingButton>
          </form>
        </BoxWrapper>
      </Box>
    </>
  )
}

export default ChangeEmailPage
