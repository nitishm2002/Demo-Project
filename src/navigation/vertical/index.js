// ** Icon imports
import HomeIcon from 'mdi-material-ui/Home'
import CogIcon from 'mdi-material-ui/Cog'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import WebStoriesIcon from '@mui/icons-material/WebStories'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard'
    },
    {
      sectionTitle: 'Knowledge Base'
    },
    {
      title: 'Users',
      icon: GroupIcon,
      children: [
        {
          icon: PersonIcon,
          title: 'Plan Owner',
          path: '/plan-owner'
        },
        {
          icon: PersonIcon,
          title: 'Provider',
          path: '/provider'
        },
        {
          icon: PersonIcon,
          title: 'Member',
          path: '/member'
        }
      ]
    },
    {
      title: 'Medical Specialization',
      icon: MedicalInformationIcon,
      path: '/medical-specialization'
    },
    {
      title: 'Provider Type',
      icon: AutoAwesomeMotionIcon,
      path: '/provider-type'
    },
    {
      sectionTitle: 'Subscription Settings'
    },
    {
      title: 'Plan Services',
      icon: AutoAwesomeMotionIcon,
      path: '/plan-services'
    },
    {
      title: 'Complimentary Services',
      icon: CogIcon,
      path: '/complimentary-services'
    },
    {
      title: 'Package',
      icon: WebStoriesIcon,
      path: '/plan-packages'
    },
    {
      title: 'Subscription Plans',
      icon: CogIcon,
      path: '/subscription-plans'
    },
    {
      sectionTitle: 'Settings'
    },
    {
      title: 'Settings',
      icon: CogIcon,
      path: '/settings'
    }
  ]
}

export default navigation
