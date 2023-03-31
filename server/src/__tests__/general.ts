import { jest } from '@jest/globals'
import { ping } from "../routes";

describe('General Tests', () => {

  test('jest true = true', () => {
    expect(true).toEqual(true)
  })

  test('request to /ping', async () => {
    const mockRequest: any = {
      body: {},
    }

    const mockResponse: any = () => {
      const res: any = {text: '', json: {}};
      res.status = () => res;
      res.json = (input) => { res.json = input };
      res.send = (input) => res.text = input 
      return res;
    };
    const res = mockResponse()

    ping(mockRequest, res);
    
    expect(res.text).toEqual('pong');
  })

})