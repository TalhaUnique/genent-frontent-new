import React from 'react';
import { Card, Box, Typography, IconButton, Stack } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

interface ChatMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
}

const menuItems = [
    { icon: <InsertPhotoIcon />, label: 'Send Image' },
    { icon: <AttachFileIcon />, label: 'Attach File' },
    { icon: <EmojiEmotionsIcon />, label: 'Add Emoji' },
];

const ChatMenu: React.FC<ChatMenuProps> = ({ anchorEl, open, onClose }) => {
    if (!open) return null;

    const rect = anchorEl?.getBoundingClientRect();
    const containerRect = document.querySelector('[data-chat-container]')?.getBoundingClientRect();
    const width = containerRect ? containerRect.width : 360;
    const left = containerRect ? containerRect.left : 0;
    const style = rect
        ? {
              position: 'fixed' as const,
              left,
              bottom: window.innerHeight - rect.top + 8,
              width,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 1300,
          }
        : {};

    return (
        <Box sx={style} onClick={onClose}>
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 480,
                    mx: 'auto',
                    borderRadius: 3,
                    boxShadow: 6,
                    bgcolor: 'background.paper',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.grey[900]
                            : theme.palette.grey[100],
                    p: 2,
                }}
            >
                <Stack direction="row" spacing={2} justifyContent="center">
                    {menuItems.map((item) => (
                        <Card
                            key={item.label}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.grey[800]
                                        : theme.palette.grey[200],
                                boxShadow: 2,
                                minWidth: 90,
                            }}
                        >
                            <IconButton size="small">{item.icon}</IconButton>
                            <Typography variant="body2">{item.label}</Typography>
                        </Card>
                    ))}
                </Stack>
            </Card>
        </Box>
    );
};

export default ChatMenu;
