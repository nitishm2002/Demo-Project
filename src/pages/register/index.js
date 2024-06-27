import { Box, FormControlLabel, FormHelperText, MenuItem, Radio, RadioGroup, Select, } from '@mui/material'
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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 500
  }
}))

const validationSchema = yup.object().shape({
  full_name: yup.string()
    .matches(FormValidationMessages.FULL_NAME.pattern, FormValidationMessages.FULL_NAME.patternErrorMessage)
    .required(FormValidationMessages.FULL_NAME.required),
  mobile_number: yup.string()
    .matches(FormValidationMessages.MOBILE_NUMBER.pattern, FormValidationMessages.MOBILE_NUMBER.patternErrorMessage)
    .required(FormValidationMessages.MOBILE_NUMBER.required),
  email: yup.string().email(FormValidationMessages.EMAIL.invalid).required(FormValidationMessages.EMAIL.required),
  password: yup
    .string()
    .min(FormValidationMessages.PASSWORD.minLength, FormValidationMessages.PASSWORD.minLengthErrorMessage)
    .matches(FormValidationMessages.PASSWORD.pattern, FormValidationMessages.PASSWORD.patternErrorMessage)
    .required(FormValidationMessages.PASSWORD.required)
})

const RegisterPage = () => {
  const auth = useAuth()
  const translation = useCustomTranslation()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      gender: 'male',
      role: '',
      dob: null
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const onSubmit = async data => {
    setLoading(true);
    data.dob = data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null; // Format the date to DD/MM/YYYY

    let payload = {
      full_name: data.full_name,
      email: data.email,
      mobile_number: data.mobile_number,
      password: data.password,
      gender: data.gender,
      dob: data.dob,
      role: data.role,
    }
    try {
      const response = await axiosInstance.post(ApiEndPoints.AUTH.register, payload)
      const responseData = response.data
      toastSuccess(responseData.message)
      auth.login(responseData.data)
    } catch (error) {
      toastError(error)
    }

  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Box
        sx={{
          p: { md: 12, xs: 8 },
          mt: { xs: '-40px', md: '-70px' },
          height: { xs: 'auto', md: '90vh' },
          marginTop: "-70px",
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
              <Translations text='Sign up' />
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel htmlFor='full_name'>{translation.translate('form.fullName.label')}</FormLabel>
              <Controller
                name='full_name'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    autoFocus
                    onChange={onChange}
                    id='full_name'
                    value={value}
                    placeholder={translation.translate('form.fullName.placeholder')}
                  />
                )}
              />
              {errors.full_name && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <Translations text={`form.fullName.error.${errors.full_name.message}`} />
                </FormHelperText>
              )}
            </FormControl>

            {/* Email */}
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

            {/* Mobile Number */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel htmlFor='mobile_number'>{translation.translate('form.mobileNumber.label')}</FormLabel>
              <Controller
                name='mobile_number'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    autoFocus
                    onChange={onChange}
                    id='mobile_number'
                    value={value}
                    placeholder={translation.translate('form.mobileNumber.placeholder')}
                  />
                )}
              />
              {errors.mobile_number && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  <Translations text={`form.mobileNumber.error.${errors.mobile_number.message}`} />
                </FormHelperText>
              )}
            </FormControl>

            {/* Password */}
            <FormControl fullWidth sx={{ mb: 4 }}>
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

            {/* Gender */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel id="gender-label">{translation.translate('form.gender.label')}</FormLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue="male"
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    row
                    aria-labelledby="gender-label"
                    value={value}
                    onChange={onChange}
                  >
                    <FormControlLabel value="male" control={<Radio />} label={translation.translate('form.gender.value.male')} />
                    <FormControlLabel value="female" control={<Radio />} label={translation.translate('form.gender.value.female')} />
                  </RadioGroup>
                )}
              />
            </FormControl>

            {/* Date of Birth */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel htmlFor='date_of_birth'>{translation.translate('form.dob.label')}</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="dob"
                  control={control}
                  defaultValue={null}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      label={translation.translate('form.dob.placeholder')}
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="DD/MM/YYYY"
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>

            {/* Select Role */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <FormLabel id="role-label">{translation.translate('form.role.label')}</FormLabel>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Select
                    labelId="role-label"
                    id="role"
                    value={value}
                    onChange={onChange}
                  >
                    <MenuItem value="">{translation.translate('form.role.placeholder')}</MenuItem>
                    <MenuItem value="caregiver">{translation.translate('form.role.value.caregiver')}</MenuItem>
                    <MenuItem value="patient">{translation.translate('form.role.value.patient')}</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            {/* Submit Button */}
            <LoadingButton
              sx={{ borderRadius: '10px', height: '48px', fontWeight: 600 }}
              fullWidth
              loading={loading}
              size='large'
              type='submit'
              variant='contained'
            >
              <Translations text='Submit' />
            </LoadingButton>
          </form>

          <Link to='/login' underline='none' style={{ cursor: 'pointer', textDecoration: "none" }}>
            <Typography variant='body2' color='neutral.100' align='center' sx={{ mr: 2, mt: 7, fontWeight: 500 }}>
              <Translations text='Already have an account? ' />
              <span style={{ color: '#1A7AE7', fontWeight: 600 }}>Sign In</span>
            </Typography>
          </Link>
        </BoxWrapper>
      </Box >
    </>
  )
}

export default RegisterPage
