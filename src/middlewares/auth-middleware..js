import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(403).send()
  } else {
    const [, token] = authorization.trim().split(' ')

    const verified = jwt.verify(token, process.env.JWT_SECRET || '')
    if (verified) {
      next()
    } else {
      res.status(403).send()
    }
  }
}

export default authMiddleware