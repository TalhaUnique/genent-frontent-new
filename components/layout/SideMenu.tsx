import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Typography,
  Collapse,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const recentChats = [
  { id: 1, name: 'John Doe', avatar: '', lastMessage: 'See you at 2pm' },
  { id: 2, name: 'Jane Smith', avatar: '', lastMessage: 'Vitals updated' },
  { id: 3, name: 'Alice Johnson', avatar: '', lastMessage: 'Sent X-ray' },
];

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
      {/* <Box sx={{ display: 'flex', alignItems: 'center', p: 1, justifyContent: open ? 'flex-end' : 'center' }}>
        {setOpen && (
          <IconButton onClick={() => setOpen(!open)} size="small">
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Box>
      <Divider /> */}
      <List>
        <ListItem  component="a" href="/patients">
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
            <PeopleIcon />
          </ListItemIcon>
          <Collapse in={open} orientation="horizontal">
            <ListItemText primary="Patients" />
          </Collapse>
        </ListItem>
        <ListItem  component="a" href="/chat">
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
            <ChatIcon />
          </ListItemIcon>
          <Collapse in={open} orientation="horizontal">
            <ListItemText primary="Chat" />
          </Collapse>
        </ListItem>
      </List>
      <Divider sx={{ my: 1 }} />
      <Collapse in={open}>
        <Box sx={{ px: 2, pb: 1, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Recent Chats
          </Typography>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={1}>
              {recentChats.map((chat) => (
                <Box key={chat.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 28, height: 28 }}>{chat.name[0]}</Avatar>
                  <Box>
                    <Typography variant="body2" noWrap>{chat.name}</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Collapse>
    </Drawer>
  );
};

export default SideMenu;
