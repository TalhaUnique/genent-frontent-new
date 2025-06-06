import React from 'react';
import { Container } from '@mui/material';
import ChatScreen from './ChatScreen';

const ChatPage = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <ChatScreen />
  </Container>
);

export default ChatPage;
