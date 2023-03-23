import { Box, Button, Chip, Divider, Grid, InputAdornment, Stack, Switch, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { SettingAccordionProp } from "./Settings";
import { Moment } from "moment";
import moment from "moment";

export default function MemberSettings({ setExpanded, settings, club_id, updateSettings }: SettingAccordionProp) {
  const [dateOne, setDateOne] = useState<Moment | null>((settings.memberButtonPresetOne.startsWith("+"))
  ? null : moment(parseInt(settings.memberButtonPresetOne)))
  const [dateTwo, setDateTwo] = useState<Moment | null>((settings.memberButtonPresetTwo.startsWith("+"))
  ? null : moment(parseInt(settings.memberButtonPresetTwo)))

  const [amountOne, setAmountOne] = useState((settings.memberButtonPresetOne.startsWith("+"))
    ? settings.memberButtonPresetOne.substring(1) : "")
  const [amountTwo, setAmountTwo] = useState((settings.memberButtonPresetTwo.startsWith("+"))
    ? settings.memberButtonPresetTwo.substring(1) : "")

  const [labelOne, setLabelOne] = useState(settings.memberButtonLabelOne)
  const [labelTwo, setLabelTwo] = useState(settings.memberButtonLabelTwo)

  const onSave = () => {
    setExpanded(false)
    if (labelOne != settings.memberButtonLabelOne || labelTwo != settings.memberButtonLabelTwo 
        || getButtonOneString() != settings.memberButtonPresetOne ||  getButtonTwoString() != settings.memberButtonPresetTwo) {
      let request: UpdateSettingsRequest = { club_id: club_id,
        memberButtonLabelOne: labelOne,
        memberButtonLabelTwo: labelTwo,
        memberButtonPresetOne: getButtonOneString(),
        memberButtonPresetTwo: getButtonTwoString() 
      }
      updateSettings(request) 
    }
  }

  const getButtonOneString = () => {
    if (dateOne) {
      return dateOne.valueOf().toString()
    } else {
      return "+" + amountOne
    }
  }

  const getButtonTwoString = () => {
    if (dateTwo) {
      return dateTwo.valueOf().toString()
    } else {
      return "+" + amountTwo
    }
  }

  const dateOneChanged = (e: moment.Moment | null) => {
    setDateOne(e)
    setAmountOne('')
  }

  const dateTwoChanged = (e: moment.Moment | null) => {
    setDateTwo(e)
    setAmountTwo('')
  }

  const amountOneChanged = (e: any) => {
    setAmountOne(e.target.value)
    setDateOne(null)
  }

  const amountTwoChanged = (e: any) => {
    setAmountTwo(e.target.value)
    setDateTwo(null)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <Stack>
          <Typography variant='subtitle1'>Default Member Expirations</Typography>
          <Typography variant='body2'>Edit the default expiration options for members.</Typography>
        </Stack>
      </Grid>
      <Grid container item xs={6} md={6} alignItems='center'>
        <Grid item xs={4} lg={6}/>
        <Grid item xs={4} lg={3}>
            <Button color="secondary" variant="contained" className='w-[100%]'>{labelOne}</Button>
        </Grid>
        <Grid item xs={4} lg={3}>
          <Button color="secondary" variant="contained" className='w-[100%]'>{labelTwo}</Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} marginLeft={4}>
        <Grid item xs={12}>
          <Stack direction={{xs: "column", md: "row"}} spacing={1} alignItems="center" >
            <Typography variant="body1">Button 1:</Typography>
            <TextField sx={{width: "150px"}} label="Label" size="small" value={labelOne} onChange={(e) => {setLabelOne(e.target.value)}}/>
            <Divider sx={{ borderRightWidth: 3 }}orientation="vertical" flexItem/>
            <TextField label="Amount (1w, 6m, etc)" size="small" onChange={amountOneChanged} InputProps={{
              endAdornment: <InputAdornment position="end"><MoreTimeIcon/></InputAdornment>,
            }} value={amountOne}/>
            <Chip label="OR" />
            <DatePicker label="Exact Date" value={dateOne}
              renderInput={(params) => <TextField size="small" {...params} />} 
              onChange={dateOneChanged}/>
          </Stack>
        </Grid>
      </Grid>
      <Grid container item xs={12} marginLeft={4}>
        <Grid item xs={12}>
          <Stack direction={{xs: "column", md: "row"}} spacing={1} alignItems="center" >
            <Typography variant="body1">Button 2:</Typography>
            <TextField sx={{width: "150px"}} label="Label" size="small" value={labelTwo} onChange={(e) => {setLabelTwo(e.target.value)}}/>
            <Divider sx={{ borderRightWidth: 3 }}orientation="vertical" flexItem/>
            <TextField label="Amount (1w, 6m, etc)" size="small" onChange={amountTwoChanged} InputProps={{
              endAdornment: <InputAdornment position="end"><MoreTimeIcon/></InputAdornment>,
            }} value={amountTwo}/>
            <Chip label="OR" />
            <DatePicker label="Exact Date" value={dateTwo}
              renderInput={(params) => <TextField size="small" {...params} />}
              onChange={dateTwoChanged} />
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={12} marginTop={4}>
        <Box alignItems="center" justifyContent="center" display="flex">
          <Button variant="contained" onClick={onSave}>Save</Button>
        </Box>
      </Grid>
    </Grid>
  )
}
