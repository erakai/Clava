import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Stack, Typography} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeneralSettings from "./GeneralSettings";
import MemberSettings from "./MemberSettings";
import { useEffect, useState } from "react";
import useSettings from "../../hooks/useSettings";
import { SetSettingsResponse } from "../../api/settingsApi";

export type SettingAccordionProp = {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  settings: Settings
  club_id: string
  updateSettings: (req: UpdateSettingsRequest) => Promise<SetSettingsResponse>
}

type SettingsProp = {
  clubName: string,
  club_id: string
}

// refresh settings every 5 seconds
const REFRESH_RATE = 1000 * 5;

export default function Settings({ clubName, club_id }: SettingsProp) {
  const { settings, refreshSettings, updateSettings, loading } = useSettings()

  const [generalExpanded, setGeneralExpanded] = useState(false)
  const [memberExpanded, setMemberExpanded] = useState(false)
  const [eventExpanded, setEventExpanded] = useState(false)
  const [docExpanded, setDocExpanded] = useState(false)
  const [financeExpanded, setFinanceExpanded] = useState(false)
  const [discordExpanded, setDiscordExpanded] = useState(false)

  useEffect(() => {
    refreshSettings(club_id)

    const interval = setInterval(() => {
      refreshSettings(club_id)
    }, REFRESH_RATE)
    return () => clearInterval(interval)
  }, [])

  return (
    <Stack justifyContent='center' alignItems='center'>
      <Stack justifyContent="center" alignItems="center" marginX={2} marginY={4} sx={{ 'width': {'xs': '90%', 'md': '50%'}}}>
        <Typography variant="h3">Settings</Typography>
        <Typography variant="subtitle1">{clubName}</Typography>
        <Box sx={{ p: 2}}/>

        {(!settings) ?
        <CircularProgress />
        :
        (<>
          <Accordion expanded={generalExpanded} onChange={() => setGeneralExpanded(!generalExpanded)}
            sx={{ width: '100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography fontWeight='bold' variant='subtitle1'>General Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GeneralSettings setExpanded={setGeneralExpanded} settings={settings} club_id={club_id} updateSettings={updateSettings}/>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={memberExpanded}  onChange={() => setMemberExpanded(!memberExpanded)}
          sx={{ minWidth: '100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography fontWeight='bold' variant='subtitle1'>Member Hub</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MemberSettings setExpanded={setMemberExpanded} settings={settings} club_id={club_id} updateSettings={updateSettings}/>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={eventExpanded} onChange={() => setEventExpanded(!eventExpanded)}
            sx={{ minWidth: '100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography fontWeight='bold' variant='subtitle1'>Event Hub</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Settings coming soon!
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={docExpanded} onChange={() => setDocExpanded(!docExpanded)}
            sx={{ minWidth: '100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography fontWeight='bold' variant='subtitle1'>Document Hub</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Settings coming soon!
            </AccordionDetails>
          </Accordion>


          <Accordion expanded={financeExpanded} onChange={() => setFinanceExpanded(!financeExpanded)}
            sx={{ minWidth: '100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography fontWeight='bold' variant='subtitle1'>Finance Hub</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Settings coming soon!
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={discordExpanded} onChange={() => setDiscordExpanded(!discordExpanded)}
            sx={{ minWidth: '100%'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              <Typography fontWeight='bold' variant='subtitle1'>Discord Bot</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='subtitle1'>Club Id</Typography>
              <Typography variant='body2'>{club_id}</Typography>
            </AccordionDetails>
          </Accordion></>
        )}

      </Stack>
    </Stack>
  )
}