"use client";
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/navigation';

const TopMenu: React.FC<{ onMenuClick?: () => void; sideMenuOpen?: boolean, toggleThemeMode: any }> = ({
  onMenuClick,
  sideMenuOpen,
  toggleThemeMode
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const handleThemeToggle = () => {
    if(theme.palette.mode == "dark"){
      toggleThemeMode("light")
    } 
    else{
      toggleThemeMode("dark")
    }
  }
 
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        // backgroundColor: 'white',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {onMenuClick && !isMobile && (
            <IconButton
              edge="start"
              // color="inherit"
              aria-label="open drawer"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src="/gennet.avif"
            alt="Logo"
            style={{ height: 40, marginLeft: 8 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleThemeToggle} size="small" sx={{ ml: 1 }}>
            {theme.palette.mode == "dark" ? 
              <Brightness7Icon /> : 
              <Brightness4Icon />}
          </IconButton>
          <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 2 }}>
            <Avatar alt="Profile" src="/avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: { minWidth: 180, borderRadius: 3 },
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Profile</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
