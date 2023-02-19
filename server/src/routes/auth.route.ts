import { login, logout, register } from "controllers/auth.controller";
import { Router } from "express";
import passport from "passport";

const authRouter = Router()

// https://www.passportjs.org/packages/passport-local/
// possibly add res.redirect('/)
authRouter.post('/login', passport.authenticate('local'), login)
authRouter.post('/register', register)
authRouter.post('/logout', logout)

export default authRouter