import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, FormHelperText, Snackbar, Typography, styled } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast, { ToastBar } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useCustomTranslation from 'src/@core/hooks/useCustomTranslation'
// import { FormValidationMessages } from 'src/constants/form.const'
import { useAuth } from 'src/hooks/useAuth'
import Translations from 'src/layouts/components/Translations'
import { axiosInstance } from 'src/network/adapter'
import { ApiEndpoints } from 'src/network/endpoints'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import Logo from 'src/assets/logo-sm.png'
import DialogConfirmation from 'src/views/dialog/DialogConfirmation'
import EmailChangedDialog from 'src/views/dialog/EmailChangedDialog'

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  }
  // [theme.breakpoints.down('md')]: {
  //   maxWidth: 500
  // }
}))

const validationSchema = yup.object().shape({
  //   otp: yup
  //     .string()
  //     .required(FormValidationMessages.OTP.required)
  //     .matches(FormValidationMessages.OTP.pattern, FormValidationMessages.OTP.patternErrorMessage)
})

const VerifyOtpPage = () => {
  const [loading, setLoading] = useState('')
  const translation = useCustomTranslation()
  const { state } = useLocation()
  const navigate = useNavigate()
  const { otpState, country_code, phone_number, type } = state || {}
  const [otpStateSet, setotpStateSet] = useState(otpState)
  const [otp, setOtp] = useState('')
  const [open, setOpen] = React.useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const { verifyOtp } = useAuth()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: ''
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  })

  const handleOtpChange = newValue => {
    setOtp(newValue)
  }

  const handleOtpVerify = async e => {
    setLoading(true)
    await verifyOtp(type, { otp: otp, phone_number: phone_number, country_code: country_code }, err => {
      setLoading(false)
    })
    setLoading(false)
  }

  const handleResendOtp = async e => {
    e.preventDefault()
    // try {
    //   const response = await axiosInstance
    //     .post(
    //       ApiEndpoints.OTP.resendotp(type),
    //       { phone_number: phone_number, country_code: country_code }
    //       // { headers: { Authorization: `Bearer ${token}` } }
    //     )
    //     .then(response => {
    //       toast.success(response.data.message)
    //       setResendTimer(60)
    //       setotpStateSet(response.data.data.otp)
    //       setIsTimerRunning(true)
    //       e.preventDefault()
    //     })
    //     .catch(error => {
    //       console.log('error', error)
    //       toast.error(error.response.data.message)
    //       e.preventDefault()
    //     })
    // } catch (error) {
    //   setLoading(false)
    // }
  }

  useEffect(() => {
    let intervalId

    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setResendTimer(prevTimer => {
          if (prevTimer === 0) {
            setIsTimerRunning(false)
            clearInterval(intervalId)
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [isTimerRunning])

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
        <BoxWrapper mb={5} display='flex' alignItems='center' flexDirection='column'>
          <img src={Logo} alt='logo' style={{ width: '64px', height: '62px', marginBottom: 35 }} />
          <Box sx={{ mb: 6 }} display='flex' textAlign='center' alignItems='center' flexDirection='column'>
            <Typography variant='fm-h4' color='neutral.80' fontWeight={600}>
              <Translations text='Verify OTP' />
            </Typography>
            <Typography variant='fm-p3' sx={{ mt: 3, mb: 3 }} color='neutral.70' display='block'>
              <Translations text='We have sent an OTP to your registered email ' />
              <span style={{ color: 'neutral.80', fontWeight: 600 }}>
                example***@gmail.com
                {/* **** **** ****{" "} */}
                {/* {phone_number.substring(0, phone_number.length - 4)}xxxx */}
                {/* {phone_number} */}
              </span>
            </Typography>
            <Typography variant='fm-p2' sx={{ mt: 5, mb: 3 }} color='neutral.70' display='block'>
              OTP is :{otpStateSet}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(handleOtpVerify)}>
            {/* <Typography variant='h6'>Verify Your OTP</Typography> */}
            {/* <Typography variant='subtitle1'>Please Enter 4 digit code sent to</Typography>
            <Typography variant='body2'>{email}</Typography> */}
            <Controller
              name='otp'
              control={control}
              defaultValue=''
              render={({ field, fieldState }) => (
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  width={{ md: '380px', xs: '350px' }}
                  pr={14}
                >
                  <MuiOtpInput
                    {...field}
                    value={otp}
                    onChange={newValue => {
                      handleOtpChange(newValue)
                      field.onChange(newValue)
                    }}
                    style={{ display: 'flex', justifyContent: 'center', marginTop: 5, width: '100%' }}
                  />
                  {fieldState.invalid ? <FormHelperText error>{fieldState.error?.message}</FormHelperText> : null}
                </Box>
              )}
            />
            {isTimerRunning ? (
              <>
                {/* <Typography variant='body2' color='common.white' fontWeight={700} sx={{ mr: 2 }}>
                  Didn’t get OTP?
                </Typography> */}
                <Typography variant='body2' color='neutral.70' sx={{ mr: 2, mt: 4 }}>
                  <span style={{ color: '#FB3601', fontWeight: 600 }}>Resend OTP </span> in {resendTimer} Seconds.
                </Typography>
              </>
            ) : (
              <Typography
                variant='body2'
                color='primary'
                onClick={event => handleResendOtp(event)}
                sx={{ cursor: 'pointer', fontWeight: 700, mt: 4 }}
              >
                Resend OTP
              </Typography>
            )}
            <Box>
              <LoadingButton
                fullWidth
                sx={{
                  mt: 8,
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  backgroundColor: 'primary',
                  height: '55px',
                  fontSize: '16px'
                }}
                type='submit'
                variant='contained'
                loading={loading}
              >
                Verify
              </LoadingButton>
            </Box>
            {open && (
              <Snackbar open={open} autoHideDuration={2000}>
                <Alert severity='success' sx={{ width: '100%', color: 'fff' }}>
                  OTP verified Successfully
                </Alert>
              </Snackbar>
            )}
          </form>
        </BoxWrapper>

        {/* <BoxWrapper sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', mt: 5 }}>
          {isTimerRunning ? (
            <>
              <Typography variant='body2' color='common.white' fontWeight={700} sx={{ mr: 2 }}>
                Didn’t get OTP?
              </Typography>
              <Typography variant='body2' color='neutral.70' sx={{ mr: 2 }}>
                Resend SMS in {resendTimer} Sec
              </Typography>
            </>
          ) : (
            <Typography
              variant='body2'
              color='primary'
              onClick={event => handleResendOtp(event)}
              sx={{ cursor: 'pointer', fontWeight: 700 }}
            >
              Resend SMS
            </Typography>
          )}
        </BoxWrapper> */}
      </Box>
      <EmailChangedDialog open={false} />
    </>
  )
}

export default VerifyOtpPage
