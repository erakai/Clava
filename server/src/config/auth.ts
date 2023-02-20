import { CookieOptions, NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import ms from "ms"
import passport from "passport"

const prod = process.env.NODE_ENV === 'prod'

interface Signed {
  _id: string
}

// most of this is verbatim from https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/
export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: prod,
  signed: true,
  maxAge: ms(process.env.REFRESH_EXPIRY || '30d')
}

export const getToken = (user: Signed) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.SESSION_EXPIRY
  })
}

export const getRefreshToken = (user: Signed) => {
  const refresh = jwt.sign(user, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRY
  })
  return refresh
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.signedCookies) {
    res.status(401).send('Unauthorized')
  } else {
    passport.authenticate('jwt', { session: false })(req, res, next)
  }
}