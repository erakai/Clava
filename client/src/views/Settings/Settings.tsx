import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GeneralSettings from "./GeneralSettings";
import MemberSettings from "./MemberSettings";
import { useState } from "react";

export type SettingAccordionProp = {
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

type SettingsProp = {
  clubName: string
}

export default function Settings({ clubName }: SettingsProp) {
  const [generalExpanded, setGeneralExpanded] = useState(false)
  const [memberExpanded, setMemberExpanded] = useState(false)
  const [eventExpanded, setEventExpanded] = useState(false)
  const [docExpanded, setDocExpanded] = useState(false)
  const [financeExpanded, setFinanceExpanded] = useState(false)

  return (
    <Stack justifyContent='center' alignItems='center'>
      <Stack justifyContent="center" alignItems="center" marginX={2} marginY={4} sx={{ 'width': {'xs': '90%', 'md': '50%'}}}>
        <Typography variant="h3">Settings</Typography>
        <Typography variant="subtitle1">{clubName}</Typography>
        <Box sx={{ p: 2}}/>

        <Accordion expanded={generalExpanded} onChange={() => setGeneralExpanded(!generalExpanded)}
          sx={{ width: '100%'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography fontWeight='bold' variant='subtitle1'>General Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GeneralSettings setExpanded={setGeneralExpanded}/>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={memberExpanded}  onChange={() => setMemberExpanded(!memberExpanded)}
         sx={{ minWidth: '100%'}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography fontWeight='bold' variant='subtitle1'>Member Hub</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MemberSettings setExpanded={setMemberExpanded}/>
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

      </Stack>
    </Stack>
  )
}