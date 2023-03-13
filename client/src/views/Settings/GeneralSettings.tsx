import { Box, Button, Grid, Stack, Switch, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { SettingAccordionProp } from "./Settings";

export default function GeneralSettings({ setExpanded }: SettingAccordionProp) {

  const onSave = () => {
    setExpanded(false)
  }

  const onSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    let checked = e.target.checked
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack>
          <Typography variant='subtitle1'>Dense Tables</Typography>
          <Typography variant='body2'>Make tables in all hubs more compact.</Typography>
        </Stack>
      </Grid>
      <Grid container item xs={4} alignItems='center' justifyContent="end">
        <Switch onChange={onSwitchChange} />
      </Grid>

      <Grid item xs={12} marginTop={4}>
        <Box alignItems="center" justifyContent="center" display="flex">
          <Button variant="contained" onClick={onSave}>Save</Button>
        </Box>
      </Grid>
    </Grid>
  )
}
