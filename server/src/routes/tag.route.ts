import { verifyUser } from "config/auth";
import { createTag, getTags } from "controllers/tag.controller";
import { Router } from "express";

const tagRouter = Router()

/*
Tag Routes:
  - /tags GET (club_id): returns all tags of a club 
  - /tags POST (tag_name, tag_color, club_id): creates + returns new tag of a club

If you need a temp club_id since we don't have clubs working, use:
  "5e1a0651741b255ddda996c4"
*/

tagRouter.get('/', verifyUser, getTags)
tagRouter.post('/', verifyUser, createTag)

export default tagRouter