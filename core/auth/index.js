const { secret, baseURL, clientID, issuerBaseURL } = require('@config/index')
const { ENDPOINTS } = require('@constants/index')
const { API, AUTH } = ENDPOINTS

const authConfig = {
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

module.exports = authConfig
