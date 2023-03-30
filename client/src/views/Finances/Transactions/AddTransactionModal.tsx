import { Box, Button, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { Moment } from "moment"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DatePicker } from "@mui/x-date-pickers";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #ffb500',
  boxShadow: 24,
  p: 4,
  color: "primary"
}

type AddTransactionModalProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  addTransactionWrapper: (req: AddTransactionRequest) => Promise<string | null>
  club_id: string
}

export default function AddTransactionModal(props: AddTransactionModalProps) {
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('in')
  const [date, setDate] = useState<Moment | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const close = () => {
    setErrorMessage('')
    setSource('')
    setAmount('')
    setDate(null)
    props.setOpen(false)
  }
  
  const handleAdd = async () => {
    if (!source || !amount || !date || !type) {
      setErrorMessage('Please enter source, amount, and date.')
      return
    }

    let numeric = Number(amount)
    if (isNaN(numeric) || numeric < 0) {
      setErrorMessage('Please enter a valid amount.')
      return
    }

    if (type == 'exp') numeric *= -1

    let newTransaction: AddTransactionRequest = {
      source, amount: numeric, date: date.valueOf(), club_id: props.club_id }

    let result = await props.addTransactionWrapper(newTransaction)
    if (result) {
      setErrorMessage(result)
      return
    }

    close()
  }

  return (
    <Modal open={props.open} onClose={close}>
      <Box sx={style}>
        <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
          <Grid item container direction="row">
            <Grid item xs={1}>
              <IconButton size="small" onClick={close}>
                <CloseIcon color="action" />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Box textAlign="center" className='h-[100%] flex-col justify-content-center'>
                <Typography className='' variant="h6" fontWeight={"bold"}>Add Transaction</Typography>
              </Box>
            </Grid>
          </Grid>
          {(errorMessage != '') ?
              <Grid item>
                <Box textAlign="center">
                  <Typography color="error" variant="subtitle1">{errorMessage}</Typography>
                </Box>
              </Grid> : <></>}
            <Grid item>
              <TextField className="w-[100%]" size="small" value={source}
                label="Source" variant="outlined" type="text" required
                onChange={(e) => { setSource(e.target.value); setErrorMessage('')}}/>
            </Grid>
            <Grid item>
              <TextField className="w-[100%]" size="small" value={amount} required
                label="Amount" variant="outlined"
                onChange={(e) => { setAmount(e.target.value); setErrorMessage('')}}
                InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon/></InputAdornment>}}/>
            </Grid>
            <Grid item>
              <DatePicker label="Date Of" renderInput={(params) => <TextField size="small" {...params} fullWidth />} 
                value={date} onChange={(newDate) => { setDate(newDate); setErrorMessage('') }}/>
            </Grid>
            <Grid item container justifyContent="center">
              <FormControl>
                <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
                  <FormControlLabel value="in" control={<Radio />} label="Income" />
                  <FormControlLabel value="exp" control={<Radio />} label="Expense" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="contained" className="w-[100%]" 
                onClick={handleAdd}>Add Transaction</Button>
            </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}