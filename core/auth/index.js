import { appConfig } from '@config/index'
import { ENDPOINTS } from '@constants/index'
const { API, AUTH } = ENDPOINTS
const { secret, baseURL, clientID, issuerBaseURL } = appConfig

export const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret,
  baseURL,
  clientID,
  issuerBaseURL,
  routes: {
    login: false,
    postLogoutRedirect: `${API}/${AUTH}/logout`,
  },
}
