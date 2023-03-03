import { verifyUser } from "config/auth";
import { getOfficers, requestAddOfficer } from "controllers/officer.controller";
import { Router } from "express";
import tagRouter from "./tag.route";

const officerRouter = Router()

/*
Officer Routes:
  - /officers GET (club id): returns all officers in club 
  - /officers POST (name, email, club_id): requests officer to be in club, adds to db member + officer, default date for officer
  - /officers POST (officer_id, expiration?): finalizes the officer request by updating the expiration, set expiration for member/officer
*/

officerRouter.get('/', verifyUser, getOfficers)
officerRouter.post('/', verifyUser, requestAddOfficer)
// TODO: Implement finalizeAddOfficer

export default officerRouter