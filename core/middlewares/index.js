export const notFound = () => {
  return (req, res, next) => {
    const err = new Error('Not Found')
    err['status'] = 404
    next(err)
  }
}

export const Unauthorized = () => {
  return (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end()
    }
    return next(err)
  }
}

export const genericErrorRes = () => {
  return (err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      errors: {
        message: err.message,
      },
    })
  }
}
