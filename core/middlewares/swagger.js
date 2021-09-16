import swaggerDocument from 'swagger.json'

export const swaggerConfig = () => {
  return (req, res, next) => {
    swaggerDocument.host = req.get('host')
    swaggerDocument.schemes.http = req.protocol
    req.swaggerDoc = swaggerDocument
    next()
  }
}
