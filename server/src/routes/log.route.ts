import { verifyUser } from "config/auth";
import { getLogs } from "controllers/log.controller";
import { Router } from "express";

const logRouter = Router()


/*
Log Routes:
	- /logs GET (club_id) : returns all logs for a club
*/


logRouter.get("/", verifyUser, getLogs);

export default logRouter