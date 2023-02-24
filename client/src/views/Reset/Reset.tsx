import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { getUsers } from "api/user"

function Reset() {
    return (
        <Box className="flex w-screen h-screen items-center justify-center">
            <Stack
                spacing={7}
                className="bg-emerald-300 items-center m-8 p-8 pb-20 max-w-[30%]"
                sx={{ borderRadius: '2%', borderColor: 'grey.500' }}
            >
                    <Stack spacing={1} className="flex w-full items-center">
                        <Stack className="flex-row w-full items-center" direction="row">
                            <IconButton component={Link} to="/Login">
                                <ArrowBack color="action"></ArrowBack>
                            </IconButton>
                            <Typography variant="h5" component="h1">Password Reset</Typography>
                        </Stack>
                        <Typography className="px-8" variant="subtitle2" component="h1">Enter the email address associated with your account and we'll send you a link to reset your password.</Typography>
                    </Stack>
                <Stack spacing={4} className="flex w-full items-center">
                    <TextField
                        className="w-80"
                        id="email-text-field"
                        label="Email"
                        variant="outlined"
                        type="email"/>
                    <Button className="w-80" variant="contained">Request Reset</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Reset
