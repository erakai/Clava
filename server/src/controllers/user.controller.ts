import type { Request, Response } from 'express'

export const getUsers = async (_req: Request, res: Response) => {
  return res.json([
    {
      'user_id': '1',
      'name': 'Test Test',
      'email': 'wassup@gmail.com',
      'password': 'i feel like this is irresponsible',
      'club_ids': [],
      'officer_ids': []
    }
  ])
}