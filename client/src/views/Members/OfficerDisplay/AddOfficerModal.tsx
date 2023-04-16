import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from "@mui/material"
import React, { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import useEmailVerify from "../../../hooks/useEmailVerify"

type AddOfficerProps = {
    createOfficer: (officer: AddOfficerRequest) => void
    open: boolean,
    setOpen: Dispatch<React.SetStateAction<boolean>>
    errorMessage: string
    setErrorMessage: Dispatch<React.SetStateAction<string>>
    club_id: string
}

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

export default function AddMemberModal({
                                           createOfficer, open, setOpen, errorMessage, setErrorMessage, club_id
                                       }: AddOfficerProps) {
    const emailVerify = useEmailVerify()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const clearFields = () => {
        setName('')
        setEmail('')
    }

    const close = () => {
        clearFields()
        setErrorMessage("")
        setOpen(false)
    }

    const handleAdd = () => {
        if (!name || !email) {
            setErrorMessage('Please enter both name and email.')
            return
        }

        if (!emailVerify(email)) {
            setErrorMessage('Invalid email.')
            return
        }

        let newOfficer: AddOfficerRequest = {
            name, email, club_id
        }

        createOfficer(newOfficer)
        clearFields()
    }

    return (
        <Modal open={open} onClose={close}>
            <Box sx={style}>
                <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
                    <Grid item>
                        <Grid container direction="row">
                            <Grid item xs={1}>
                                <IconButton size="small" onClick={close}>
                                    <CloseIcon color="action" />
                                </IconButton>
                            </Grid>
                            <Grid item xs={10}>
                                <Box textAlign="center" className='h-[100%] flex-col justify-content-center'>
                                    <Typography className='' variant="h6" fontWeight={"bold"}>Add Officer</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {(errorMessage != '') ?
                        <Grid item>
                            <Box textAlign="center">
                                <Typography color="error" variant="subtitle1">{errorMessage}</Typography>
                            </Box>
                        </Grid> : <></>}
                    <Grid item>
                        <TextField className="w-[100%]" size="small" value={name}
                                   label="Name" variant="outlined" type="text" required
                                   onChange={(e) => { setName(e.target.value); setErrorMessage('')}}/>
                    </Grid>
                    <Grid item>
                        <TextField className="w-[100%]" size="small" value={email} required
                                   label="Email" variant="outlined" type="email" id="email-text-field"
                                   onChange={(e) => { setEmail(e.target.value); setErrorMessage('')}}
                                   error={email != '' && !emailVerify(email)}/>
                    </Grid>
                    <Grid item>
                        <Button color="secondary" variant="contained" className="w-[100%]"
                                onClick={handleAdd}>Send Invite</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}