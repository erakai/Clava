import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Avatar, Box, Button, Fab, Grid, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material"
import to from "await-to-js"
import moment from "moment"
import { useEffect, useState } from "react"
import ReimbursementDisplay from "./ReimbursementDisplay"
import { addTransaction, deleteTransactions, getTransactions } from "../../api/transactionApi"
import { ScrollTop } from "../../components/Navigation"
import useSettings from "../../hooks/useSettings"
import { TransactionDisplay } from "./Transactions"
import AddTransactionModal from './Transactions/AddTransactionModal';
import { hasPermission } from '../ClubComposite';
import { createClavaAlert } from '../../components/Alert';

type FinanceViewProps = {
  club_id: string
}

export default function FinanceView(props: FinanceViewProps) {
  // Data State
  const [income, setIncome] = useState<Transaction[]>([])
  const [expenses, setExpenses] = useState<Transaction[]>([])
  const [balance, setBalance] = useState(0)
  const { settings, refreshSettings } = useSettings()

  // Modal State
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false)

  // Loading data on render
  useEffect(() => {
    const fetchData = async () => {
      const [errT, trans] = await to(getTransactions(props.club_id))
      if (errT) {
        console.log(errT)
        return
      }

      let b = 0
      let incomeTemp: Transaction[] = []
      let expensesTemp: Transaction[] = []
      trans.data.transactions.forEach((t: Transaction) => {
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
    }

    if (!hasPermission("VIEW_FINANCES")) {
      createClavaAlert("warning", "Sorry! You do not have permission to view finances.")
    }

    fetchData()
    refreshSettings(props.club_id)
  }, [])

  const addTransactionWrapper = async (req: AddTransactionRequest) => {
    const [err, t] = await to(addTransaction(req))
    if (err) {
      return "Something went wrong."
    }

    let trans = t.data.transaction
    if (trans.amount >= 0) {
      let newIncome = income
      newIncome.push(trans)
      setIncome(newIncome)
    } else {
      let newExpense = expenses
      newExpense.push(trans)
      setExpenses(newExpense)
    }
    setBalance(balance + trans.amount)

    return null
  }

   
  const onTransactionDelete = async (deleted: Transaction[]) => {
    const trans_ids: string[] =  deleted.map(t => t._id)
    const [err, res]= await to(deleteTransactions(trans_ids))
    if (err) {
      console.log(err)
      return
    }

    // I love horrific code  patterns !
    let newIncome = income.filter(t => {
      return deleted.indexOf(t) == -1
    })
    setIncome(newIncome)
    let newExpenses = expenses.filter(t => {
      return deleted.indexOf(t) == -1
    })
    setExpenses(newExpenses)
  }

  return (
    <>
      <AddTransactionModal open={addTransactionModalOpen} 
        setOpen={setAddTransactionModalOpen} club_id={props.club_id}
        addTransactionWrapper={addTransactionWrapper}/>

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

        {/*Balance Overview and Buttons*/}
        <Grid item xs={12} alignItems={"top"}>
          <Paper style={{padding: 8, alignContent: 'center', textAlign: 'center', marginLeft: 8, marginRight: 8}} elevation={3}>
            <Grid container>
              <Grid item xs={4} container justifyContent="flex-start" alignItems="center">
                <Stack alignItems={"center"} paddingLeft={1}>
                  {/* <Typography variant="caption">Add Transaction</Typography> */}
                  <Tooltip title={"Add Transaction"}>
                    <Avatar sx={{ bgcolor: "secondary.main", mx:1, width:48, height:48 }}>
                      <IconButton sx={{ color: 'white', display: 'block', width:48, height:48 }}
                        onClick={() => setAddTransactionModalOpen(true)} >
                        <AddShoppingCartIcon/>
                      </IconButton>
                    </Avatar>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5">Current Balance</Typography>
                <Typography variant="h6" sx={{ 'color': (balance >= 0) ? 'green' : 'red' }}>
                  ${(Math.round(balance * 100) / 100).toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={4}/>
            </Grid>
          </Paper>
        </Grid>

        <Grid item container marginX={2} xs={12} md={8} rowSpacing={2}>
          {/*Income/Expense (Transaction) Tables*/}
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} lg={6}>
              <TransactionDisplay title="Income" transactions={income} settings={settings} onDelete={onTransactionDelete}/>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TransactionDisplay title="Expenses" transactions={expenses} settings={settings} onDelete={onTransactionDelete}/>
            </Grid>
          </Grid>
        </Grid>

        {/*Reimbursements column*/}
        <Grid item xs={12} md={3} margin={2} style={{ textAlign: 'center' }}>
          <ReimbursementDisplay club_id={props.club_id}></ReimbursementDisplay>
        </Grid>
      </Grid>


      <ScrollTop>
        <Fab size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}