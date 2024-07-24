import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  email: string
}

const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMDE2ODY1NiwiaWF0IjoxNzIwMTY4NjU2fQ.iUgOkAQ0eQWFgStv-tuxz-GgvPI0rX5vxts9ucgMaW8'
    ) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}

export { authenticate }
