import { Box, Grid, Paper, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import useSettings from "../../hooks/useSettings"
import { TransactionDisplay } from "./Transactions"

type FinanceViewProps = {
  club_id: string
}

const transactions: Transaction[] = [
  {
    _id: "test",
    source: "test",
    amount: -100,
    date: moment().valueOf()
  },
  {
    _id: "test",
    source: "test2",
    amount: 100,
    date: moment().add(-1, 'w').valueOf()
  }
]

export default function FinanceView(props: FinanceViewProps) {
  const [income, setIncome] = useState<Transaction[]>([])
  const [expenses, setExpenses] = useState<Transaction[]>([])
  const [balance, setBalance] = useState(0)
  const { settings, refreshSettings} = useSettings()

  useEffect(() => {
    let trans = transactions

    let b = 0
    let incomeTemp: Transaction[] = []
    let expensesTemp: Transaction[] = []
    trans.forEach(t => {
      if (t.amount >= 0) {
        incomeTemp.push(t)
      } else {
        expensesTemp.push(t)
      }

      b += t.amount
    })
    setBalance(b)
    setIncome(incomeTemp)
    setExpenses(expensesTemp)
  }, [])

  return (
    <Grid container marginY={0} rowSpacing={2}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%">
          <Typography variant="h4">Finance Dashboard</Typography>
        </Box>
      </Grid>

      <Grid item container marginX={2} xs={12} md={8} rowSpacing={2}>
        {/*Income/Expense (Transaction) Tables*/}
        <Grid item container xs={12} spacing={1}>
          <Grid item md={6}>
            <TransactionDisplay title="Income" transactions={income} settings={settings}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TransactionDisplay title="Expenses" transactions={expenses} settings={settings}/>
          </Grid>
        </Grid>

        {/*Balance Overview and Buttons*/}
        <Grid item xs={12}>
          <Paper style={{padding: 8, alignContent: 'center', textAlign: 'center'}} elevation={3}>
            <Typography variant="h5">Current Balance</Typography>
            <Typography variant="h6" sx={{ 'color': (balance >= 0) ? 'green' : 'red' }}>
              ${balance}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/*Reimbursements column*/}
      <Grid item xs={12} md={3} marginLeft={2} style={{ textAlign: 'center' }} border={2}>
        <Typography variant="h5">Reimbursements</Typography>
      </Grid>
    </Grid>
  )
}