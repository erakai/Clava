import to from "await-to-js"
import User from "models/user.model"
import { ExtractJwt, Strategy } from "passport-jwt"

export const JwtStrategy = () => {
  return new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
  }, async (jwt_payload, done) => {
    const [err, user] = await to(User.findById(jwt_payload._id).exec())
    if (err) return done(err, false)
    if (user) return done(null, user)
    return done(null, false)
  }
)
}