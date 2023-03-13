import { Box, Button, Chip, Divider, Grid, InputAdornment, Stack, Switch, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { SettingAccordionProp } from "./Settings";

export default function MemberSettings({ setExpanded }: SettingAccordionProp) {
  const [dateOne, setDateOne] = useState(null)
  const [buttonOne, setButtonOne] = useState('6M')
  const [buttonTwo, setButtonTwo] = useState('12M')

  const onSave = () => {
    setExpanded(false)
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
            <Button color="secondary" variant="contained" className='w-[100%]'>{buttonOne}</Button>
        </Grid>
        <Grid item xs={4} lg={3}>
          <Button color="secondary" variant="contained" className='w-[100%]'>{buttonTwo}</Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} marginLeft={4}>
        <Grid item xs={12}>
          <Stack direction={{xs: "column", md: "row"}} spacing={1} alignItems="center" >
            <Typography variant="body1">Button 1:</Typography>
            <TextField sx={{width: "150px"}} label="Label" size="small" defaultValue={buttonOne}/>
            <Divider sx={{ borderRightWidth: 3 }}orientation="vertical" flexItem/>
            <TextField label="Amount (1w, 6m, etc)" size="small" InputProps={{
              endAdornment: <InputAdornment position="end"><MoreTimeIcon/></InputAdornment>,
            }}/>
            <Chip label="OR" />
            <DatePicker label="Exact Date" onChange={() => {}} value={dateOne}
              renderInput={(params) => <TextField size="small" {...params} />} />
          </Stack>
        </Grid>
      </Grid>
      <Grid container item xs={12} marginLeft={4}>
        <Grid item xs={12}>
          <Stack direction={{xs: "column", md: "row"}} spacing={1} alignItems="center" >
            <Typography variant="body1">Button 2:</Typography>
            <TextField sx={{width: "150px"}} label="Label" size="small" defaultValue={buttonTwo}/>
            <Divider sx={{ borderRightWidth: 3 }}orientation="vertical" flexItem/>
            <TextField label="Amount (1w, 6m, etc)" size="small" InputProps={{
              endAdornment: <InputAdornment position="end"><MoreTimeIcon/></InputAdornment>,
            }}/>
            <Chip label="OR" />
            <DatePicker label="Exact Date" onChange={() => {}} value={dateOne}
              renderInput={(params) => <TextField size="small" {...params} />} />
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
