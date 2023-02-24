import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session';
import cors from 'cors';
import rootRouter from 'routes';
import passport from 'passport';
import User from 'models/user.model';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { JwtStrategy } from 'config/jwt';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

// used for cookies and sessions
// https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,  maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
)

// enable data parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET as string))

// this is unsafe; enables all requests with cors
// https://www.npmjs.com/package/cors
app.use(cors())

// initialize passport authentication middleware
app.use(passport.initialize())
app.use(passport.session())

// checks the JWT to approve the request
// https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/
passport.use(JwtStrategy())

// passport-local authentication with user/password
// https://mherman.org/blog/user-authentication-with-passport-dot-js/
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// add all API routes
app.use(rootRouter)

// connect to MongoDB server
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once('open', () => {
  console.log('Server connected to mongodb at', process.env.MONGO_URL)
  app.listen(port, () => {
    console.log('Server initialized and listening on port', port)
  })
})


