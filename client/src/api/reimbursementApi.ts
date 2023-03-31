import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetReimbursementsResponse = { reimbursements: Reimbursement[] }
type CreateReimbursementResponse = { reimbursement: Reimbursement }
type EditReimbursementResponse = { reimbursement: Reimbursement }
type DeleteReimbursementResponse = { reimbursement: Reimbursement }

const ReimbursementInstance = axios.create({
  baseURL: `http://localhost:8080/clubs`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(ReimbursementInstance, getRefreshToken)

export const getReimbursements = (club_id: string) => {
  return ReimbursementInstance.get<GetReimbursementsResponse>('/reimbursements', { params: { club_id: club_id }})
}

export const createReimbursement = ({ name, amount, creditor, link, paid, club_id }: CreateReimbursementRequest) =>  {
  return ReimbursementInstance.post<CreateReimbursementResponse>('/reimbursements', { name, amount, creditor, link, paid, club_id })
}

export const editReimbursement = ({ _id, name, amount, creditor, link, paid, club_id }: EditReimbursementRequest) =>  {
  return ReimbursementInstance.put<EditReimbursementResponse>('/reimbursements', { _id, name, amount, creditor, link, paid, club_id })
}

export const deleteReimbursement = (_id : string) =>  {
  return ReimbursementInstance.delete<DeleteReimbursementResponse>('/reimbursements', {data: { _id }})
}