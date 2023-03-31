import rootRouter from '../routes'
import express from 'express'
import request from 'supertest'

const app = express()
app.use('/', rootRouter)

/* ^^^^^^^^ Necessary Boilerplate ^^^^^^^^ */
/* vvvvvvvv File Specific Tests vvvvvvvvv */

describe('General Tests', () => {
  test('jest expect works', () => {
    expect(true).toEqual(true)
  })

  test('ping works', async () => {
    const res = await request(app).get('/ping')
    expect(res.text).toEqual('pong')
  })

})