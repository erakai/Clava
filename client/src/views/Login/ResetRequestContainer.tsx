import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

type ResetProps = {
    switchToLogin: () => void
}

function ResetRequestContainer({switchToLogin}: ResetProps) {
    return (
        <Box className="flex w-screen h-screen items-center justify-center">
            <Stack spacing={2} bgcolor="white" color="secondary"
                className="items-center p-8 w-96 rounded-lg">
                <Stack spacing={1} className="flex w-full items-center">
                    <Stack spacing={1} className="flex-row w-full items-center" direction="row">
                        <IconButton onClick={switchToLogin}>
                            <ArrowBack color="action"/>
                        </IconButton>
                        <Typography variant="h5" component="h1">Password Reset</Typography>
                    </Stack>
                    <Typography className="" variant="subtitle2" component="h1">Enter the email address associated with your account and we'll send you a link to reset your password.</Typography>
                </Stack>
                <Stack spacing={4} className="flex w-full items-center">
                    <TextField
                        className="w-80"
                        id="email-text-field"
                        label="Email"
                        variant="outlined"
                        type="email"/>
                    <Popup trigger={<Button className="w-80" variant="contained" color="secondary">Request Reset</Button>} modal>
                        <div className="modal">
                            If an account associated with the provided email exists, you will receive a password reset link in your inbox.
                        </div>
                    </Popup>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ResetRequestContainer
