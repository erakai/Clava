import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session';
import cors from 'cors';
import rootRouter from 'routes';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000;

// https://www.npmjs.com/package/express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
)

// this is unsafe; enables all requests
// https://www.npmjs.com/package/cors
app.use(cors())

// add all routes
app.use(rootRouter)

app.listen(port, () => {
  console.log('Server initialized and listneing on port', port)
})

