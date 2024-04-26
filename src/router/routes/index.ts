import auth from './auth'
import dashboard from './dashboard'
import teams from './teams'
import settings from './settings'
import errors from './errors'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  auth,
  dashboard,
  teams,
  settings,
  errors
]
