import {
    Box,
    TextField,
    Stack,
    Typography,
    Button,
    IconButton,
    DialogTitle,
    DialogContent,
    DialogContentText, Dialog
} from "@mui/material"
import {Link, useParams, useNavigate} from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import {_passwordChangeRequest} from '../../api/userApi'
import React from "react";
import to from "await-to-js";
import LoginContainer from "../Login/LoginContainer";

// @ts-ignore
function Reset() {
    const navigate = useNavigate()
    const { userId } = useParams()

    const [p1, setP1] = React.useState("")
    const [p2, setP2] = React.useState("")

    const sendChangePasswordRequest = async (req: UserChangePasswordRequest) => {
        try {
            await to(_passwordChangeRequest(req))
        } catch (err) {
            console.log(err)
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        navigate('/login')
    };

    return (
        <Box className="flex w-screen h-screen items-center justify-center" sx={{bgcolor: "secondary.main"}}>
            <Stack
                spacing={7}
                className="items-center m-8 p-8 pb-16 max-w-[30%]"
                sx={{ borderRadius: '2%', borderColor: 'grey.500', bgcolor: "white"}}
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
                        value={p1}
                        error={p1 == ''}
                        helperText={(p1 == '') ? "Your password can't be empty" : ""}
                        onChange={(e) => {
                            setP1(e.target.value.trim())
                        }}
                        type="password"/>
                    <TextField
                        className="w-80"
                        id="confirm-new-password-text-field"
                        label="Confirm New Password"
                        variant="outlined"
                        value={p2}
                        error={p1 != p2}
                        helperText={(p1 != p2) ? "Passwords must match" : ""}
                        onChange={(e) => {
                            setP2(e.target.value.trim())
                        }}
                        type="password"/>
                    <Button className="w-80" variant="contained" color="secondary"
                    onClick={(e) => {
                        if (p1 == p2 && p1 != '') {
                            handleClickOpen()
                            _passwordChangeRequest({user_id: userId!, password: p1}).then(r => console.log("REQUEST SENT"))
                        }
                    }}
                    >Reset Password</Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Password Reset Success"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Your Clava password has been changed. You can now log in with your new password.
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Reset
