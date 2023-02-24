import { verifyUser } from "config/auth";
import { getClubs, createClub } from "controllers/club.controller";
import { Router } from "express";

const clubRouter = Router()

/*
Club Routes:
  - /clubs GET (user id): returns all clubs for a user
  - /clubs POST (name, description): makes a new club and returns it
*/

clubRouter.get('/', verifyUser, getClubs)
clubRouter.post('/', verifyUser, createClub)

export default clubRouter