const input = theme => {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.neutral[70],
          color: '#454545',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '22px',
          marginBottom: 6
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '16px',
          margin: '8px 0 0'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:before': {
            borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.22)`
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.32)`
          },
          '&.Mui-disabled:before': {
            borderBottomStyle: 'none'
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: `rgba(${theme.palette.customColors.main}, 0.04)`,
          '&:hover:not(.Mui-disabled)': {
            backgroundColor: `rgba(${theme.palette.customColors.main}, 0.08)`
          },
          '&:before': {
            borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.22)`
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `1px solid rgba(${theme.palette.customColors.main}, 0.32)`
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#F5F6FA',
          '&:hover:not(.Mui-focused):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none'
          },
          '&:hover.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none'
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'none'
          }
        }
      }
    }
  }
}

export default input
