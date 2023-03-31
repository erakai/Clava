import { jest } from '@jest/globals'
import { createClub } from '../controllers/club.controller';
import mongoose from 'mongoose';

const mockResponse: any = () => {
  const res: any = {stat: 0, text: '', js: {}};
  res.status = (input) => { res.stat = input; return res }
  res.json = (input) => { res.js = input; return res };
  res.send = (input) => { res.text = input; return res } 
  return res;
};

describe('Settings Tests', () => {
  
  beforeAll(async () => {
    mongoose.set('strictQuery', true)
    mongoose.connect('mongodb://127.0.0.1:27017/clava')
  })

  test('creating a club creates settings', async () => {
    const clubReq: any = {
      body: { owner_id: '641f99307e34d85dd3bd86fb', name: 'test', description: 'test234' },
    }
    const clubRes = mockResponse() 

    await createClub(clubReq, clubRes)
    console.log(clubRes)

    expect(clubRes.stat).toEqual(200)
  })

})