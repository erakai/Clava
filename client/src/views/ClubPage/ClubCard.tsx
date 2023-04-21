import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Dialog, DialogTitle, DialogActions, Link, Tooltip, DialogContent, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider} from '@mui/material'
import to from 'await-to-js'
import { deleteClub, removeClubFromUser, transferClub } from '../../api/clubApi'
import PlaceHolder from '../../assets/placeholder.png'
import DiamondIcon from '@mui/icons-material/Diamond';
import useSettings from '../../hooks/useSettings'
import { hasPermission } from '../ClubComposite'
import { createClavaAlert } from '../../components/Alert'
import { getOfficers } from '../../api/officerApi'
import { off } from 'process'

type ClubProps = {
    user_id: string,
    club: Club,
    removeClub: (club: Club) => void
}

export default function ClubCard({user_id, club, removeClub} : ClubProps) {

    const [open, setLeaveClubOpen] = React.useState(false)
    const [disableLeavingClub, setDisableLeavingClub] = React.useState(false)
    const [officerList, setOfficerList] = React.useState<Officer[]>([])
    const [officerLoading, setOfficerLoading] = React.useState(false)
    const { refreshSettings } = useSettings()

    const [officerID, setOfficerID] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setOfficerID(event.target.value as string)
    };

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

    const handleDeleteAndClose = () => {
        setLeaveClubOpen(false)
        const club_id = club._id
        let deleteRequest : DeleteClubRequest = {
            club_id
        }
        let leaveRequest : ClubToUserRequest = {
            user_id, club_id
        }
        removeClubFromUser(leaveRequest)
        deleteClub(deleteRequest)
        removeClub(club)
    }

    const handleTransferAndClose = () => {
        setLeaveClubOpen(false)
        const club_id = club._id
        let leaveRequest : ClubToUserRequest = {
            user_id, club_id
        }
        let transferRequest : ClubToUserRequest = {
            club_id : club_id, user_id: officerID
        }
        transferClub(transferRequest)
        removeClubFromUser(leaveRequest)
        removeClub(club)
    }

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/${club._id}/documents`;
        refreshSettings(club._id)
        navigate(path);
    }

    React.useEffect(() => {
        const fetchOfficers = async () => {
            const [err, res] = await to(getOfficers(club._id))
            if (err) {
                createClavaAlert("warning", err.message)
                console.log(err)
            }

            if (!res) { return }
            const retrieved = res.data.officers
            if (retrieved) {
                setOfficerList(retrieved)
                setOfficerLoading(false)
            }
        }

        fetchOfficers()
    }, [])

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
                        <Tooltip title="Owner">
                            <DiamondIcon className={ownerVisibility}/>
                        </Tooltip>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {club.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className='place-content-center'>
                {!officerLoading &&
                <Button onClick={handleClickOpen} size="small" color="error">
                    Leave
                </Button>
                }
                {ownerVisibility == "visible" ?
                    <div>
                    {officerList.length > 0 ?
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Leaving the Club requires you to transfer ownership..."}
                        </DialogTitle>
                        <DialogContent>
                            <br />
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Officer</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={officerID}
                                label="Officer"
                                onChange={handleChange}
                              >
                                {officerList.map(officer =>
                                    <MenuItem value={officer._id}>{officer.name}</MenuItem>
                                )}
                              </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="error" disabled={disableLeavingClub} onClick={handleTransferAndClose} variant="contained" autoFocus>
                            Transfer Ownership
                        </Button>
                        </DialogActions>
                    </Dialog>
                    :
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Leaving the Club will result in it's deletion."}
                        </DialogTitle>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="error" disabled={disableLeavingClub} onClick={handleDeleteAndClose} variant="contained" autoFocus>
                            Delete Club
                        </Button>
                        </DialogActions>
                    </Dialog>
                    }
                    </div>
                :
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
                }
            </CardActions>
        </Card>
    )

}