import { verifyUser } from "config/auth";
import { createMember, deleteMembers, getMembers, updateMembers } from "controllers/member.controller";
import { Router } from "express";
import tagRouter from "./tag.route";

const memberRouter = Router()

/*
Member Routes:
  - /members GET (club id): returns all members in club 
  - /members POST (name, email, club id, ?expiration): creates + returns new member in club
  - /members DELETE ([member_ids]): deletes members
  - /members PUT (member_id, name, email) : updates the member_id with information
*/

memberRouter.get('/', verifyUser, getMembers)
memberRouter.post('/', verifyUser, createMember)
memberRouter.delete('/', verifyUser, deleteMembers)
memberRouter.put('/', verifyUser, updateMembers)

memberRouter.use('/tags', tagRouter)

export default memberRouter