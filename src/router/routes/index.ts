import auth from './auth'
import dashboard from './dashboard'
import teams from './teams'
import errors from './errors'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  auth,
  dashboard,
  teams,
  errors
]
