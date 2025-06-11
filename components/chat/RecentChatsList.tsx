"use client";
import React, {useEffect, useState} from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Divider,
  ListItemButton,
} from '@mui/material';
import APIRepository from '@/utils/APIRepository';
import { useRouter, usePathname } from "next/navigation";


// Define the type for each chat item
interface ChatItem {
  chatId: string;
  patientName: string;
  lastMessage: string;
  timestamp: string;
}


const RecentChatsList: React.FC = () => {
  const [chats, setChats] = useState<any>([])
  const router = useRouter()
  useEffect(() => {
    APIRepository.get('chat/s').then((res) => {
        console.log(res.data)
        setChats(res.data)
    })
  }, [])

  const navigateToChat = (patientId: string) => {
    localStorage.setItem("active_chat_patient", patientId)
    router.push(`/patient-detail/${patientId}`)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Chats
      </Typography>
      <List sx={{ width: '100%' }}>
        {chats.map((chat: any, index: number) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigateToChat(chat.metadata.patientId)}>
                <ListItemAvatar>
                  <Avatar>{chat.metadata['patient_name'].charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                        variant="body2"
                        sx = {(theme) => ({
                          color: theme.palette.text.primary
                        })}
                      >
                      {chat.metadata['patient_name']}
                      </Typography>
                    }
                  
                />
              </ListItemButton>
            </ListItem>
           
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RecentChatsList;
