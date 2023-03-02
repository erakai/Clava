import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

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

type ConfirmationModalProps = {
  open : boolean
  question : string
  handleClose : () => void
  handleConfirmation : () => void
  handleDecline? : () => void
}
// See TableToolbar for use guide with Delete / Edit
// TL;DR - Parent component needs state that it passes a prop

export default function ConfirmationModal(
  {open, handleClose, handleConfirmation, handleDecline, question} : ConfirmationModalProps) 
{
  const handleYesClick = () => {
    handleClose()
    handleConfirmation()
  }

  const handleNoClick = () => {
    handleClose()
    if (handleDecline) {
      handleDecline()
    }
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
            {question}
          </Typography>
          <Stack 
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            paddingTop={2}
          >
            <Button variant="contained" onClick={handleYesClick}>Yes</Button>
            <Button variant="contained" onClick={handleNoClick}>No</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}