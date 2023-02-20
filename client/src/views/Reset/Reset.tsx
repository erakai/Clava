import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
//import {ArrowBack} from "@mui/icons-material"
import { getUsers } from "api/user"

function Reset() {
    return (
        <Box className="flex w-screen h-screen items-center justify-center">
            <Stack
                spacing={2}
                className="bg-emerald-300 items-center m-8 p-8"
                sx={{ borderRadius: '2%', borderColor: 'grey.500' }}
            >
                <Stack className="flex-row w-full items-center" direction="row">
                    <IconButton component={Link} to="/">

                    </IconButton>
                    <Typography variant="h5" component="h1">Password Reset</Typography>
                </Stack>
                <TextField
                    id="email-text-field"
                    label="Email"
                    variant="outlined"
                    type="email"/>
                <Button variant="contained">Request Reset</Button>
            </Stack>
        </Box>
    )
}

export default Reset
