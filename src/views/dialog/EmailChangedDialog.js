import { LoadingButton } from '@mui/lab'
import {
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  FormHelperText,
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Rating
} from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import useCustomTranslation from 'src/@core/hooks/useCustomTranslation'
import Translations from 'src/layouts/components/Translations'
import { FormValidationMessages } from 'src/constants/form.const'
// import Cancel from 'src/assets/images/cancel.svg'
import { styled } from '@mui/system'
import Tick from 'src/assets/tick.png'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
// import StarIcon from 'src/assets/images/star.svg'
// import FilledStarIcon from 'src/assets/images/filled-star.svg'

const StyledSelect = styled('select')({
  border: 'none'
  // Add any other custom styles here
})

const validationSchema = yup.object().shape({
  // fund_amount: yup
  //   .number()
  //   .typeError(FormValidationMessages.FUND_AMOUNT.required)
  //   .required(FormValidationMessages.FUND_AMOUNT.required)
})

function EmailChangedDialog(props) {
  const translation = useCustomTranslation()
  const [loading, setLoading] = useState(false)
  const { open, toggle } = props
  const [selectedCurrency, setSelectedCurrency] = useState('₦')
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  })
  const [ratingValue, setRatingValue] = useState(2) // Initial value

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue)
  }

  const onSubmit = async data => {
    setValue('fund_amount', '')
    toggle()
  }

  const handleClose = () => {
    toggle()
    setValue('fund_amount', '')
    clearErrors('fund_amount')
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth='xs'
        sx={{ '& .MuiPaper-root': { borderRadius: '30px' } }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={7}>
            <img src={Tick} alt='Tick' style={{ height: '58px', width: '58px' }} />
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={1}>
              <Typography variant='fm-h6' color='neutral.80' fontWeight={500} px={4}>
                <Translations text='Email Changed Successfully.' />
              </Typography>
              <Typography variant='fm-p3' color='neutral.70' fontWeight={400} px={4}>
                <Translations text='You have changed email successfully.' />
              </Typography>
            </Box>
            <LoadingButton
              // fullWidth
              onClick={() => navigate('/login')}
              sx={{
                height: '53px',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                background: 'primary'
              }}
              type='submit'
              variant='contained'
              loading={loading}
            >
              <Translations text={'Log in Again'} />
            </LoadingButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default EmailChangedDialog
