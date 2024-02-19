import { logoutUser } from '../../services/user'

export default defineAuthEventHandler(() => {
  return logoutUser()
})
