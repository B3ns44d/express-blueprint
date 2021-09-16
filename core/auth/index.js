import config from '@config'
import { ENDPOINTS } from '@constants'
const { api, auth } = ENDPOINTS

const { secret, baseURL, clientID, issuerBaseURL } = config.auth0

export const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret,
  baseURL,
  clientID,
  issuerBaseURL,
  routes: {
    login: false,
    postLogoutRedirect: `${api}/${auth}/logout`,
  },
}
