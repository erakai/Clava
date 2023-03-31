import to from 'await-to-js'
import type { Request, Response } from 'express'
import Log from '../models/log.model'
import { ILog } from '../types/log'

export const getLogs = async (req: Request, res: Response) => {
	let { club_id } = req.query

	if (!club_id) {
		res.status(400).send("Error: Need club_id")
	}

 	
  	const [logErr, logs] = await to(Log.find({'club_id' : club_id}).exec())
  	
	return res.status(200).json({logs})
}