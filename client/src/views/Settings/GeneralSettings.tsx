import { Box, Button, Grid, Stack, Switch, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { SettingAccordionProp } from "./Settings";

export default function GeneralSettings({ setExpanded, settings, club_id, updateSettings }: SettingAccordionProp) {
  const [dense, setDense] = useState(settings.dense)

  const onSave = () => {
    setExpanded(false)
    if (dense != settings.dense) {
      let request: UpdateSettingsRequest = { club_id: club_id, dense: dense }
      updateSettings(request)
    }
  }

  const onSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDense(!dense)
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
        <Switch onChange={onSwitchChange} checked={dense} />
      </Grid>

      <Grid item xs={12} marginTop={4}>
        <Box alignItems="center" justifyContent="center" display="flex">
          <Button variant="contained" onClick={onSave}>Save</Button>
        </Box>
      </Grid>
    </Grid>
  )
}
