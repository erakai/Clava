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

dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

// TODO: Separate middleware into their own config files 
// like in MERN boilerplate, right now they are all in server
// when they shouldn't be

// used for session refresh tokens
// https://www.npmjs.com/package/express-session
// https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
const oneWeek = 1000 * 60 * 60 * 24 * 7
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,  maxAge: oneWeek },
  })
)

// enable data parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET as string))

// this is unsafe; enables all requests with cors
// https://www.npmjs.com/package/cors
app.use(cors())

// used for passport mongoose username-password authentication
// https://mherman.org/blog/user-authentication-with-passport-dot-js/
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

// add all API routes
app.use(rootRouter)

// connect to MongoDB server
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once('open', () => {
  console.log('Server connected to mongodb at', process.env.MONGO_URL)
})

app.listen(port, () => {
  console.log('Server initialized and listening on port', port)
})

