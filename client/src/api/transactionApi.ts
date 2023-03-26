import axios from "axios";
import { KeyObject } from "crypto";
import { intercepts } from "./config";
import { getRefreshToken } from "./userApi";

export type GetTransactionsResponse = { transactions: Transaction[] }
export type AddTransactionsResponse = { transaction: Transaction }

const TransactionInstance = axios.create({
  baseURL: `http://localhost:8080/transactions`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(TransactionInstance, getRefreshToken)

export const getTransactions = (club_id: string) => {
  return TransactionInstance.get<GetTransactionsResponse>('/', { params: { club_id: club_id }})
}

export const addTransaction = (req: AddTransactionRequest) => {
  return TransactionInstance.post<AddTransactionsResponse>('/', req)
}