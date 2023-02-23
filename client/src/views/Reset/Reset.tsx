import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { getUsers } from "api/user"

function Reset() {
    return (
        <Box className="flex w-screen h-screen items-center justify-center">
            <Stack
                spacing={7}
                className="bg-emerald-300 items-center m-8 p-8 pb-16 max-w-[30%]"
                sx={{ borderRadius: '2%', borderColor: 'grey.500' }}
            >
                <Stack className="flex-row w-full items-center" direction="row">
                    <IconButton component={Link} to="/">
                        <ArrowBack color="action"></ArrowBack>
                    </IconButton>
                    <Typography variant="h5" component="h1">Password Reset</Typography>
                </Stack>
                <Stack spacing={4} className="flex w-full items-center">
                    <TextField
                        className="w-80"
                        id="new-password-text-field"
                        label="New Password"
                        variant="outlined"
                        type="password"/>
                    <TextField
                        className="w-80"
                        id="confirm-new-password-text-field"
                        label="Confirm New Password"
                        variant="outlined"
                        type="password"/>
                    <Button className="w-80" variant="contained">Reset Password</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Reset