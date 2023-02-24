import { verifyUser } from "config/auth";
import { createClub } from "controllers/club.controller";
import { Router } from "express";

const clubRouter = Router()

/*
Member Routes:
  - /members GET (club id): returns all members in club 
  - /members POST (name, club id, ?expiration): creates + returns new member in club
If you need a temp club_id since we don't have clubs working, use:
  "5e1a0651741b255ddda996c4"
*/

clubRouter.post('/', verifyUser, createClub)

export default clubRouter