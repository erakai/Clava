import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Dialog, DialogTitle, DialogActions, Link} from '@mui/material'
import to from 'await-to-js'
import { removeClubFromUser } from '../../api/clubApi'
import PlaceHolder from '../../assets/placeholder.png'

type ClubProps = {
    user_id: string,
    club: Club,
    removeClub: (club: Club) => void
}

export default function ClubCard({user_id, club, removeClub} : ClubProps) {

    const [open, setLeaveClubOpen] = React.useState(false)
    const [disableLeavingClub, setDisableLeavingClub] = React.useState(false)

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
        navigate(path);
    }

    return (
        <Card className="flex-auto max-w-xs">
            <CardActionArea onClick={routeChange}>
                <CardMedia
                    component="img"
                    height="140"
                    src={PlaceHolder}
                    alt="image failed load"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {club.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {club.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={handleClickOpen} size="small" color="primary">
                    Edit
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Leave Club"}
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