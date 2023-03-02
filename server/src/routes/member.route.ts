import { verifyUser } from "config/auth";
import { createMember, getMembers } from "controllers/member.controller";
import { createTag, deleteTag, getTags } from "controllers/tag.controller";
import { Router } from "express";

const memberRouter = Router()

/*
Member Routes:
  - /members GET (club id): returns all members in club 
  - /members POST (name, email, club id, ?expiration): creates + returns new member in club

If you need a temp club_id since we don't have clubs working, use:
  "5e1a0651741b255ddda996c4"
*/

memberRouter.get('/', verifyUser, getMembers)
memberRouter.post('/', verifyUser, createMember)

/*
Tag Routes:
  - /members/tags GET (club_id): returns all tags of a club 
  - /members/tags POST (tag_name, tag_color, club_id): creates + returns new tag of a club

If you need a temp club_id since we don't have clubs working, use:
  "5e1a0651741b255ddda996c4"
*/

memberRouter.get('/tags/', verifyUser, getTags)
memberRouter.post('/tags/', verifyUser, createTag)
memberRouter.delete('/tags/', verifyUser, deleteTag)
// memberRouter.put('/tags/', verifyUser, editTag)

export default memberRouter