
module.exports = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case 'NotFound':
        res.status(404).json({ message: 'Item not Found' })
        break

      case 'JsonWebTokenError':
      case 'Forbidden':
        res.status(401).json({ message: 'Request not Authenticated' })
        break

      case 'Unauthorized':
        res.status(403).json({ message: 'Not Authorized' })
        break

      case 'Wrong Email':
      case 'Wrong Password':
        res.status(400).json({ message: 'Wrong email/password' })
        break

      case 'SequelizeUniqueConstraintError':
      case 'SequelizeValidationError':
        res.status(400).json({
          message: 'Validation Error',
          errors: err.errors.map(error => error.message)
        })
        break

      case 'Error':
        res.status(400).json({
          message: 'Validation Error',
          errors: [err.message]
        })
        break

      default:
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
  } else {
    next()
  }
}