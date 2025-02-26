// ** React Imports
import { Fragment } from 'react'

// ** Next Imports
import { Link, useLocation, useSearchParams } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import MuiListItem from '@mui/material/ListItem'

// ** Third Party Imports
import clsx from 'clsx'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const ListItem = styled(MuiListItem)(({ theme }) => ({
  width: 'auto',
  paddingTop: theme.spacing(2.25),
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(2.25),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.active, &.active:hover': {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
  },
  '&.active .MuiTypography-root, &.active .MuiListItemIcon-root': {
    color: theme.palette.primary.main
  }
}))

const HorizontalNavLink = props => {
  // ** Props
  const { item, settings, hasParent } = props

  // ** Hook & Vars
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const { navSubItemIcon, menuTextTruncate } = themeConfig
  const IconTag = item.icon ? item.icon : navSubItemIcon
  const Wrapper = !hasParent ? List : Fragment

  const handleURLQueries = () => {
    if (Object.keys(searchParams).length && item.path) {
      const arr = Object.keys(searchParams)

      return location.pathname.includes(item.path) && location.pathname.includes(searchParams[arr[0]])
    }
  }

  const isNavLinkActive = () => {
    if (location.pathname === item.path || handleURLQueries()) {
      return true
    } else {
      return false
    }
  }

  return (
    <CanViewNavLink navLink={item}>
      <Wrapper {...(!hasParent ? { component: 'div', sx: { py: settings.skin === 'bordered' ? 2.625 : 2.75 } } : {})}>
        {/* <Link to={`${item.path}`}> */}
        <ListItem
          to={`${item.path}`}
          component={Link}
          disabled={item.disabled}
          className={clsx({ active: isNavLinkActive() })}
          target={item.openInNewTab ? '_blank' : undefined}
          onClick={e => {
            if (item.path === undefined) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
          sx={{
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
            ...(!hasParent
              ? {
                px: 5.5,
                borderRadius: 3.5,
                '&.active, &.active:hover': {
                  boxShadow: 3,
                  backgroundColor: theme => theme.palette.primary.main,
                  '& .MuiTypography-root, & .MuiListItemIcon-root': {
                    color: 'common.white'
                  }
                }
              }
              : { px: 5 })
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(menuTextTruncate && { overflow: 'hidden' })
              }}
            >
              <ListItemIcon sx={{ color: 'text.primary', mr: !hasParent ? 2 : 3 }}>
                <UserIcon
                  icon={IconTag}
                  componentType='horizontal-menu'
                  iconProps={{ sx: IconTag === navSubItemIcon ? { fontSize: '0.875rem' } : { fontSize: '1.375rem' } }}
                />
              </ListItemIcon>
              <Typography {...(menuTextTruncate && { noWrap: true })}>
                <Translations text={item.title} />
              </Typography>
            </Box>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  ml: 1.6,
                  height: 20,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                }}
              />
            ) : null}
          </Box>
        </ListItem>
        {/* </Link> */}
      </Wrapper>
    </CanViewNavLink>
  )
}

export default HorizontalNavLink
