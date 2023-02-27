import to from 'await-to-js'
import { COOKIE_OPTIONS, getRefreshToken, getToken } from 'config/auth'
import type { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from 'models/user.model'
import { IUser } from 'types/user'
// import send_password_reset from 'modules/Emailing.mjs'

// again i followed https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/
// very closely for the below approach

// on register we want to give them their token and refresh token
export const register = async (req: Request, res: Response) => {
  let { email, name, password } = req.body
  if (!name) {
    name = email
  }

  User.register(new User({ email, name }), password,
    async (err, user: IUser) => {
      if (err) {
        return res.status(500).send({err})
      }

      const token = getToken({ _id: user._id })
      const refreshToken = getRefreshToken({ _id: user._id })
      user.refreshTokens.push(refreshToken)

      const [error, _user] = await to(user.save())
      if (error) {
        console.log(error)
        return res.status(500).send({error})
      } 

      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      return res.json({user, token})
    })
}

// email validation check should be done client-side
export const resetrequest = async (req: Request, res: Response) => {
  let { email } = req.body
  User.findOne({ email : email },
      async (err, user) => {
        if (err) {
          //No user found --> no account associated with given email
          return res.status(200).send({err})
        }
        const link = process.env.CLIENT_URL + "/reset/_id"
        // send_password_reset(email, user.name, link)
        return res.status(200)
      })
}

// on login we want to give them their token and refresh token
export const login = async (req: Request, res: Response) => {
  // TODO: Why am I forced to put any here? It should infer.
  const user: any = req.user
  if (!user) {
    return res.status(401).send('Unauthorized')
  }

  const token = getToken({ _id: user._id })
  const refreshToken = getRefreshToken({ _id: user._id })

  const [error, userDoc] = await to(User.findByIdAndUpdate(user._id, {
    $push: { refreshTokens: refreshToken} }, 
    { returnDocument: 'after' }).exec())
  
  if (error) {
    return res.status(500).json({error})
  }

  if (!userDoc) {
    return res.status(500).json({error: "user doesn't exist"})
  }


  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
  return res.json({user, token})
}

// given an old refresh token replace it with a new one
export const refresh = async (req: Request, res: Response) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  
  if (!refreshToken) {
    return res.status(401).json({error: 'no refresh token'})
  } 

  let payload: JwtPayload = null;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET) as JwtPayload
  } catch (err) {
    res.status(500).json({err})
  }

  const userId = payload._id
  const user: IUser = await User.findById(userId)

  if (!user) {
    return res.status(401).json({error: 'invalid token'})
  }

  const tokenIndex = user.refreshTokens.indexOf(refreshToken)

  if (tokenIndex == -1) {
    return res.status(401).json({error: 'invalid token'})
  }

  const token = getToken({ _id: userId })
  const newRefreshToken = getRefreshToken({ _id: userId })
  user.refreshTokens[tokenIndex] = newRefreshToken
  user.save((err, user) => {
    if (err) {
      return res.status(500).json({err})
    }
    res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
    res.status(200).json({token})
  })

}

// return the user making the request
export const getSelf = async (req: Request, res: Response) => {
  return res.status(200).json({user: req.user})
}

// very similar to log in, revoke refresh token
export const logout = async (req: Request, res: Response) => {
  // again, why forced to use any?
  const user: any = req.user
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  if (!user) {
    return res.status(401).send('Unauthorized')
  }

  const tokenIndex = user.refreshTokens.indexOf(refreshToken)
  
  if (tokenIndex == -1) {
    return res.status(401).send('Invalid Refresh Token')
  }

  user.refreshTokens.splice(tokenIndex, 1)
  user.save((err, user) => {
    if (err) {
      return res.status(500).json({err})
    }

    res.cookie('refreshToken', 'none', {
      httpOnly: true,
      maxAge: 1000
    })
    res.status(200).send({success: true})
  })

}