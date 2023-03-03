import { verifyUser } from "config/auth";
import { getClubs, getClub, createClub, addClubToUser, removeClubFromUser } from "controllers/club.controller";
import { getRoles, createRole, deleteRole } from "controllers/role.controller";
import { Router } from "express";

const clubRouter = Router()

/*
Club Routes:
  - /clubs GET (user id): returns all clubs for a user
  - /clubs POST (name, description): makes a new club and returns it
  - /clubs PUT (user id, club id) adds the club to a user
*/

clubRouter.get('/', verifyUser, getClubs)
clubRouter.get('/id', verifyUser, getClub)
clubRouter.post('/', verifyUser, createClub)
clubRouter.put('/', verifyUser, addClubToUser)
clubRouter.put('/leave', verifyUser, removeClubFromUser)

clubRouter.get('/roles', verifyUser, getRoles)
clubRouter.post('/roles', verifyUser, createRole)
clubRouter.delete('/roles', verifyUser, deleteRole)


export default clubRouter