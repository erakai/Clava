import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { FormControl, TextField } from '@mui/material';

// WORK IN PROGRESS, NOT FUNCTIONAL

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid',
  borderColor: 'primary.main',
  boxShadow: 24,
  p: 4,
};

type FormModalProps = {
  open : boolean
  title : string
  options : string[]
  handleClose : () => void
  handleConfirmation : ({}) => void
  handleDecline? : () => void
}

export default function FormModal(
  {open, title, options, handleClose, handleConfirmation, handleDecline} : FormModalProps) 
{
  const handleYesClick = () => {
    const options = {} // TODO
    handleClose()
    handleConfirmation(options)
  }

  const handleNoClick = () => {
    handleClose()
    if (handleDecline) {
      handleDecline()
    }
  }

  const handleValueChange = (event : object) => {
    console.log(event)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" display="flex" justifyContent="center">
            {title}
          </Typography>
          <Stack 
            direction="row" 
            justifyContent="space-evenly"
            alignItems="center"
            paddingTop={2}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              {options.map(option => (
                <TextField 
                  id="standard-basic" label={option} variant="standard" key={option}
                  onChange={handleValueChange}
                />
              ))}
            </FormControl>
          </Stack>
          <Stack 
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            paddingTop={2}
          >
            <Button variant="contained" onClick={handleYesClick}>Submit</Button>
            <Button variant="contained" onClick={handleNoClick}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}