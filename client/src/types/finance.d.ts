interface Transaction {
  _id: string,
  source: string,
  amount: number,
  date: number,  
  club_id: string
}

interface AddTransactionRequest {
  club_id: string,
  source: string,
  amount: number,
  date: number,
}