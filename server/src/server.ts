import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session';
import cors from 'cors';
import rootRouter from './routes';
import passport from 'passport';
import User from './models/user.model';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { JwtStrategy } from 'config/jwt';
import { logRequest, RequestLog, resolveClubId } from 'modules/Logger';
import to from 'await-to-js';

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

// https://www.npmjs.com/package/cors
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL || 'http://localhost:8080'],
  optionsSuccessStatus: 200
}))

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

const VALID_LOG_METHODS = ["PUT", "POST", "DELETE"]
const INVALID_PATHS = ["/refresh"]
const INVALID_BASEURL = ["/users"]

app.use(async (req, res, next) => {
  console.log(req.method, 'request received at ' + req.path + 
    '\n\tBody:', JSON.stringify(req.body) + 
    '\n\tParams:', req.query)

  if (!req.body.club_id) {
    const [errClubId, res_club_id] = await to(resolveClubId(req.body))
    console.log("adasd: ", res_club_id)
    if (!errClubId) {
      console.log(res_club_id)
      req.body.club_id = res_club_id
    }
  }

  res.on('finish', () => {
    const user : any = req.user
    if (res.statusCode == 200 && VALID_LOG_METHODS.includes(req.method) 
      && user && !INVALID_PATHS.includes(req.path) && !INVALID_BASEURL.includes(req.baseUrl)) {
      const log : RequestLog = {
        method: req.method,
        baseUrl: req.baseUrl, 
        path: req.path, 
        _body: req.body,
        params: JSON.stringify(req.params),
        user_id: (req.user as any)._id
      }
      logRequest(log);
    }

  });

  next()
})

// add all API routes
app.use(rootRouter)

// connect to MongoDB server
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clava')
mongoose.connection.once('open', () => {
  console.log('Server connected to mongodb at', process.env.MONGO_URL)
  app.listen(port, () => {
    console.log('Server initialized and listening on port', port)
    console.log()
  })
})


