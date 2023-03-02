import * as React from 'react'
import { Box, Stack, Typography, AppBar, MenuItem, Menu, Tooltip, Avatar, IconButton, Container, Toolbar, Fab, Button, TextField } from '@mui/material'
import { Dialog, DialogContent, DialogActions, DialogTitle} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClubCard from './ClubCard'
import to from 'await-to-js'
import { getClubs, createClub as _createClub, addClubToUser } from '../../api/clubApi'
import { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'

const settings = ['Profile', 'Logout'];

function ClubPage() {

  const [errorMessage, setErrorMessage] = useState('')
  const [clubs, setClubs] = useState<Club[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [disableAddingClub, setDisableAddingClub] = useState(false)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [open, setCreateClubOpen] = React.useState(false);
  const { user, state, logout } = useUser()

  // Gets clubs and listens for new clubs added to the DB
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const [err, res] = await to(getClubs(user._id))
        if (err) {
          console.log(err)
          return
        }

        const retrieved = res.data.clubs
        if (retrieved) {
          setClubs(retrieved)
        }
      }
      fetch()
    }
  }, [state, user])

  // Creates a club and displays
  const createClub = async (club: ClubRequest) => {
    setDisableAddingClub(true)

    const [err, res] = await to(_createClub(club))
    if (err || !user) {
      console.log(err)
      setErrorMessage('Something went wrong.')
    } else if (res) {
      setClubs([...clubs, res.data.club])
      let club_id = res.data.club._id
      let clubToUserRequest : ClubToUserRequest = {
        user_id: user._id, club_id
      }
      addClubToUser( clubToUserRequest )
    }

    setDisableAddingClub(false)
  
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  };

  const handleCloseUserMenu = (clicked: string) => {
    setAnchorElUser(null)
    if (clicked == 'Logout') {
      logout()
    }
  };

  const handleClickOpen = () => {
    setCreateClubOpen(true)
  };

  const handleClose = () => {
    setCreateClubOpen(false)
  };

  const handleCloseAndClubCreate = () => {
    setCreateClubOpen(false) 
    let clubRequest : ClubRequest = {
      name, description
    }
    createClub(clubRequest)
  };

  const removeClub = (club : Club) => {
    let newClubs = [...clubs]
    newClubs.splice(newClubs.indexOf(club), 1)
    setClubs(newClubs)
  };

  return (
    <Box className="ClubPage w-screen">

      <AppBar sx={{backgroundColor: 'primary.light'}} position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Clubs
          </Typography>
          <Box
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          />
          <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Stack className="justify-center" spacing={2}>
        <Box className="ClubDisplayArea flex flex-wrap">
          {clubs.length > 0 && user ?
            clubs.map((club) => <ClubCard key={club._id} user_id={user._id} club={club} removeClub={removeClub}></ClubCard>)
            : <Box margin={2}>
                <Typography variant="h6">You are not currently in any clubs.</Typography>
              </Box>
          }
        </Box>
      </Stack>

      <Fab onClick={handleClickOpen} color='primary' sx={{
        position: 'absolute',
        bottom: 64,
        right: 64,
      }}>
        <AddIcon/>
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Club"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              required
              id="club-name"
              label="Club Name"
              variant="standard"
              onChange={(e) => { setName(e.target.value); setErrorMessage('')}}
            />
            <TextField
              required
              id="club-description"
              label="Club Description"
              variant="standard"
              onChange={(e) => { setDescription(e.target.value); setErrorMessage('')}}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disableAddingClub} onClick={handleCloseAndClubCreate} variant="contained" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
  
export default ClubPage
  