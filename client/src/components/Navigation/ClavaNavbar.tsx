import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from "@mui/material/Divider";
import SettingsIcon from '@mui/icons-material/Settings';

import NavButton from './NavButton';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pages = ['Members', 'Events', 'Documents', 'Finances'];
const settings = ['Logout'];

type ClavaNavbarProps = {
  currentRoute : string
  username : string
  email : string
  clubId : string
  clubName : string
  logout: () => Promise<void | undefined>
}

function ClavaNavbar({currentRoute, clubId, clubName, logout, username, email} : ClavaNavbarProps) {
	const navigate = useNavigate();

  // menu operations for transformations when window size is changed
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (clicked: string) => {
    setAnchorElUser(null);  
    if (typeof clicked == 'string') {
      if (clicked == 'Logout') {
        logout()
      }
    }
  };

  const handleSettingsClicked = () => {
    navigate('/' + clubId + '/settings')
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
          {/* === START OF TITLE FOR LARGE WINDOW SIZE === */}
          <Box sx={{
            justifySelf: { xs: 'none', md: 'flex-start'},
            flex: { xs: 0, md: 1 },
            display: { xs: "none", md: "flex" },
            mr: 'auto',
            alignItems: 'center'}}
          >
            <Tooltip title="Club Settings" sx={{ marginRight: 1}}>
              <IconButton onClick={handleSettingsClicked}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/clubs"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {clubName}
            </Typography>
          </Box>
          {/* === END OF TITLE FOR LARGE WINDOW SIZE === */}
          {/* === START OF NAVIGATION MENU FOR SMALL WINDOW SIZE === */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* === END OF NAVIGATION MENU FOR SMALL WINDOW SIZE === */}
          {/* === START OF TITLE FOR SMALL WINDOW SIZE === */}
          <Tooltip title="Club Settings" sx={{ marginRight: 1}}>
              <IconButton sx ={{ display: { xs: 'flex', md: 'none' },}}onClick={handleSettingsClicked}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/clubs"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 0,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {clubName}
          </Typography>
          {/* === END OF TITLE FOR SMALL WINDOW SIZE === */}
          {/* === START OF MENU ITEMS AS BUTTONS === */}
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((page) => (
              <NavButton 
                key={page} title={page as any} 
                isSelected={page.toLowerCase() === currentRoute.toLowerCase()} 
                clubId={clubId}
              />
            ))}
          </Stack>
          {/* === END OF MENU ITEMS AS BUTTONS === */}
          {/* === START OF AVATAR ICON BUTTON === */}
          <Box sx={{ display:"flex", justifyContent:"flex-end", flex:1 }}>
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
              <MenuItem disabled={true}>
                <Typography>{username}</Typography>
              </MenuItem>
              <MenuItem disabled={true}>
                <Typography>{email}</Typography>
              </MenuItem>
              <Divider />
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* === END OF AVATAR ICON BUTTON === */}
        </Toolbar>
      </Container>
    </AppBar>

  );
}

export default ClavaNavbar