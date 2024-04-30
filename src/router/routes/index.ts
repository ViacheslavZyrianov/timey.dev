import auth from './auth'
import profile from './profile'
import dashboard from './dashboard'
import teams from './teams'
import settings from './settings'
import errors from './errors'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  profile,
  auth,
  dashboard,
  teams,
  settings,
  errors
]
