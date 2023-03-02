import { verifyUser } from "config/auth";
import { createMember, deleteMembers, getMembers, updateMembers } from "controllers/member.controller";
import { Router } from "express";

const memberRouter = Router()

/*
Member Routes:
  - /members GET (club id): returns all members in club 
  - /members POST (name, email, club id, ?expiration): creates + returns new member in club
  - /members DELETE ([member_ids]): deletes members
  - /member PUT (member_id, name, email) : updates the member_id with information
If you need a temp club_id since we don't have clubs working, use:
  "5e1a0651741b255ddda996c4"
*/

memberRouter.get('/', verifyUser, getMembers)
memberRouter.post('/', verifyUser, createMember)
memberRouter.delete('/', verifyUser, deleteMembers)
memberRouter.put('/', verifyUser, updateMembers)

export default memberRouter