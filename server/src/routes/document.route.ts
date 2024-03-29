import { verifyUser } from "../config/auth";
import { documentPost, documentDelete, documentPut, getDocuments, getDocumentRoles, documentRolePost, documentRoleDelete } from "../controllers/document.controller";
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

// for roles
documentRouter.get('/roles', verifyUser, getDocumentRoles);
documentRouter.post('/roles', verifyUser, documentRolePost);
documentRouter.delete('/roles', verifyUser, documentRoleDelete);


export default documentRouter