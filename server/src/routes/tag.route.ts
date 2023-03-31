import { verifyUser } from "../config/auth";
import { tagPut, getTags, tagDelete, tagPost } from "../controllers/tag.controller";
import { Router } from "express";

const tagRouter = Router()


/*
Tag Routes:
  - /members/tags GET (club_id): returns all tags of a club 
  - /members/tags POST (tag_name, tag_color, club_id): creates + returns new tag of a club
  - /members/tags DELETE (_id): deletes tag
  - /members/tags DELETE (member_id, tag_id): deletes tag from member
  - /members/tags POST (member_id[], tag_id): adds tag to member(s)
*/

tagRouter.get('/', verifyUser, getTags)
tagRouter.post('/', verifyUser, tagPost)
tagRouter.delete('/', verifyUser, tagDelete)
tagRouter.put('/', verifyUser, tagPut)

export default tagRouter