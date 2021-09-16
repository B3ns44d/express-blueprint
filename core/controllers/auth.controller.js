import { ENDPOINTS } from '@constants'
const { api, user, profile } = ENDPOINTS
import Logger from '@utils/logger'

export const login = (req, res) => {
  try {
    return res.oidc.login({ returnTo: `${api}/${user}/${profile}` }).catch((error) => {
      Logger.error(error)
      return res.status(500).send(error)
    })
  } catch (error) {
    Logger.error(error)
  }
}

export const logout = (req, res) => {
  try {
    return res.oidc
      .logout({ returnTo: '/' })
      .catch((error) => {
        Logger.error(error)
      })
      .finally(() => {
        req.session.destroy()
      })
  } catch (error) {
    Logger.error(error)
  }
}
