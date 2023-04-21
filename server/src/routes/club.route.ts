import { verifyUser } from "../config/auth";
import { getClubs, getClub, createClub, addClubToUser, removeClubFromUser, deleteClub, transferOwnership } from "../controllers/club.controller";
import { getRoles, createRole, deleteRole, editRole, getPerms } from "../controllers/role.controller";
import { getReimbursements, createReimbursement, editReimbursement, deleteReimbursement } from "../controllers/reimbursement.controller";
import { Router } from "express";

const clubRouter = Router()

/*
Club Routes:
  - /clubs GET (user id): returns all clubs for a user
  - /clubs POST (name, description, owner_id): makes a new club and returns it
  - /clubs PUT (user id, club id) adds the club to a user
*/

clubRouter.get('/', verifyUser, getClubs)
clubRouter.get('/id', verifyUser, getClub)
clubRouter.post('/', verifyUser, createClub)
clubRouter.put('/', verifyUser, addClubToUser)
clubRouter.put('/leave', verifyUser, removeClubFromUser)
clubRouter.delete('/', verifyUser, deleteClub)
clubRouter.put('/transfer', verifyUser, transferOwnership)

clubRouter.get('/roles', verifyUser, getRoles)
clubRouter.get('/roles/perms', verifyUser, getPerms)
clubRouter.post('/roles', verifyUser, createRole)
clubRouter.put('/roles', verifyUser, editRole)
clubRouter.delete('/roles', verifyUser, deleteRole)

clubRouter.get('/reimbursements', verifyUser, getReimbursements)
clubRouter.post('/reimbursements', verifyUser, createReimbursement)
clubRouter.put('/reimbursements', verifyUser, editReimbursement)
clubRouter.delete('/reimbursements', verifyUser, deleteReimbursement)


export default clubRouter