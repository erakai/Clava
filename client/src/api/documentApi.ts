import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetDocumentsResponse = { documents: Document[] }
type CreateDocumentResponse = { document: Document }
type DeleteDocumentResponse = { document: Document }
type EditDocumentResponse = { document: Document }


const DocumentInstance = axios.create({
  baseURL: `http://localhost:8080/documents`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(DocumentInstance, getRefreshToken)

export const getDocuments = (club_id: string) => {
  return DocumentInstance.get<GetDocumentsResponse>('/', { params: { club_id: club_id }})
}

export const createDocument = ({ name, link, club_id }: AddDocumentRequest) =>  {
  return DocumentInstance.post<CreateDocumentResponse>('/', { name, link, club_id })
}

export const deleteDocument = ({ _id }: DeleteDocumentRequest) =>  {
  return DocumentInstance.delete<DeleteDocumentResponse>('/', { data: { _id }})
}

export const editDocument = ({ newName, newLink, _id }: EditDocumentRequest) =>  {
  return DocumentInstance.put<EditDocumentResponse>('/', { newName, newLink, _id })
}