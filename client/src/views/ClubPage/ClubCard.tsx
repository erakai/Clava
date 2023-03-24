import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Dialog, DialogTitle, DialogActions, Link} from '@mui/material'
import to from 'await-to-js'
import { removeClubFromUser } from '../../api/clubApi'
import PlaceHolder from '../../assets/placeholder.png'
import DiamondIcon from '@mui/icons-material/Diamond';
import useSettings from '../../hooks/useSettings'

type ClubProps = {
    user_id: string,
    club: Club,
    removeClub: (club: Club) => void
}

export default function ClubCard({user_id, club, removeClub} : ClubProps) {

    const [open, setLeaveClubOpen] = React.useState(false)
    const [disableLeavingClub, setDisableLeavingClub] = React.useState(false)
    const { refreshSettings } = useSettings()

    const ownerVisibility = user_id == club.owner_id ? "visible" : "invisible"

    const handleClickOpen = () => {
        setLeaveClubOpen(true)
    };
    
    const handleClose = () => {
        setLeaveClubOpen(false)
    };

    const handleLeaveAndClose = () => {
        setLeaveClubOpen(false)
        let club_id = club._id
        let leaveRequest : ClubToUserRequest = {
            user_id, club_id
        }
        removeClubFromUser(leaveRequest)
        removeClub(club)
    };

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/${club._id}/members`;
        refreshSettings(club._id)
        navigate(path);
    }

    return (
        <Card className="flex-auto max-w-xs m-2">
            <CardActionArea onClick={routeChange}>
                <CardMedia
                    component="img"
                    height="140"
                    src={PlaceHolder}
                    alt="image failed load"
                />
                <CardContent>
                    <Box className="flex items-top">
                        <Typography gutterBottom variant="h5" component="div">
                            {club.name}
                        </Typography>
                        <Box className="grow"/>
                        <DiamondIcon className={ownerVisibility}/>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {club.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='place-content-center'>
                <Button onClick={handleClickOpen} size="small" color="error">
                    Leave
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Leave Club? You will require an invite to rejoin."}
                    </DialogTitle>
                
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" disabled={disableLeavingClub} onClick={handleLeaveAndClose} variant="contained" autoFocus>
                        Leave Club
                    </Button>
                    </DialogActions>
                </Dialog>
            </CardActions>
        </Card>
    )

}