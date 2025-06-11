"use client";
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import RecentChatsList from '@/components/chat/RecentChatsList';

const SideMenu: React.FC<{ open?: boolean; setOpen?: (open: boolean) => void }> = ({
  open = true,
  setOpen,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      slotProps={{paper:{
        sx: {
          width: open ? 240 : 64,
          transition: 'width 0.2s',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 56,
          left: 0,
          height: 'calc(100vh - 56px)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1200,
        },
      }}}
    >
      <List>
        <ListItem  component="a" href="/patients">
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
            <PeopleIcon />
          </ListItemIcon>
          <Collapse in={open} orientation="horizontal">
            <ListItemText primary={<Typography 
              sx = {(theme) => ({
                color: theme.palette.text.primary
              })}
              >Patients</Typography>} 
            />
          </Collapse>
        </ListItem>
        <ListItem  component="a" href={`/patients`}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
            <ChatIcon />
          </ListItemIcon>
          <Collapse in={open} orientation="horizontal">
            <ListItemText primary={<Typography 
              sx = {(theme) => ({
                color: theme.palette.text.primary
              })}
            >Chat</Typography>} />
          </Collapse>
        </ListItem>
      </List>
      <Divider sx={{ my: 1 }} />
      <Collapse in={open}>
        <Box sx={{px:1,flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <RecentChatsList/>
        </Box>
      </Collapse>
    </Drawer>
  );
};

export default SideMenu;
