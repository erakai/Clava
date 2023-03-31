import { verifyUser } from "../config/auth";
import { documentPost, documentDelete, documentPut, getDocuments } from "../controllers/document.controller";
import { Router } from "express";

const documentRouter = Router()

/*
Document Routes:
  - /documents GET (club_id): returns all documents in club 
  - /documents POST (name, link, club_id): creates + returns new document in club
  - /documents DELETE (_id): deletes a single document
  - /documents PUT (newName, newLink, _id) : updates the document_id with information
*/

documentRouter.get('/', verifyUser, getDocuments);
documentRouter.post('/', verifyUser, documentPost);
documentRouter.delete('/', verifyUser, documentDelete);
documentRouter.put('/', verifyUser, documentPut);


export default documentRouter