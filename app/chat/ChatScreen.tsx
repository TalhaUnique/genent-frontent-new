"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, List, Container } from '@mui/material';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import APIRepository from '@/utils/APIRepository';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface iMessgeList {type: string; text: string; sender: "user" | "bot"; status: "streaming" | "final"}
interface APIMessage {instruction: string; response: string;}
const ChatScreen = ({patient}: {patient: any}) => {
  const [messages, setMessages] = useState<iMessgeList[]>([]);
  const [chatId, setchatId] = useState<string | null>(null);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    APIRepository.get(`chat/${patient.latest_chat_id}`).then((res : any) => {
      var convertedMessages = convertToChatMessages(res.data.chat_history as APIMessage[])
      setMessages(convertedMessages)
      setchatId(res.data.metadata.chatId)
    })
  }, [])
  
  const {
        speak,
        stopSpeaking
  } = useTextToSpeech();
  
  const startSpeaking = (message: string, msgIndex: number) => {
    stopSpeaking()
    setSpeakingMsgIndex(msgIndex)
    speak(message!, () => setSpeakingMsgIndex(null))
  }

  const stopTextSpeaking = () => {
    setSpeakingMsgIndex(null)
    stopSpeaking()
  }

  const convertToChatMessages = (apiMessages: APIMessage[] ): iMessgeList[]  => {
    const msgs:iMessgeList[] = [];

    for (const item of apiMessages) {
      // User message
      msgs.push({
        type: "text",
        text: item.instruction,
        sender: "user",
        status: "final"
      });

      // Bot message
      msgs.push({
        type: "text",
        text: item.response,
        sender: "bot",
        status: "final"
      });
    }

    return msgs;
  }

  const isHtml = (str: string) => {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    return htmlRegex.test(str);
  }

  const startStream = async (msg: string) => {
    
    setMessages((prev) => [...prev, {type:"text", sender: "user", text: msg, status: "final"}])

    let url = `/chat/converse_with_doc_stream?instruction=${encodeURIComponent(msg)}&patientId=${patient['uuid']}`;
    if (chatId) {
      url = url + `&chatId=${chatId}`;
    }
    const token = localStorage.getItem('authToken');
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
      method: "POST",
      headers: {
        // Add auth headers if needed
        Authorization: `Bearer ${token}`
      },
    });

    if (!response.ok || !response.body) {
      console.error("Failed to connect to stream");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let currentText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n\n");
      buffer = lines.pop()!; // save incomplete chunk

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const jsonStr = line.replace("data: ", "");
            const data = JSON.parse(jsonStr);
            
            if (data.text !== undefined) {
              currentText += data.text;
              var msgType = isHtml(currentText) ? "html" : "text"
              
              setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];

                if (lastMsg?.sender === "bot" && lastMsg.status === "streaming") {
                  // Update the last bot streaming message
                  return [
                    ...prev.slice(0, -1),
                    { sender: "bot", type: msgType, text: currentText + " . . .", status: "streaming" },
                  ];
                } else {
                  // Append a new streaming message from the bot
                  return [
                    ...prev,
                    { sender: "bot", type: msgType, text: currentText + " . . .", status: "streaming" },
                  ];
                }
              });
            }

            if (data.final !== undefined) {
              
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { sender: "bot", type: msgType, text: data.final.response.trim(), status: "final" },
              ]);
            }
          } catch (err) {
            console.error("Failed to parse stream data", err);
          }
        }
      }
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (messagesEndRef && messagesEndRef.current ) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
      <Container maxWidth="md">
      
      <Box sx={{ height: "85vh"}}>
      
          <Box sx={{ 
              flex: 1, display: 'flex', 
              flexDirection: 'column',
              padding: 2, overflowY: 'auto',
              height: '85%'
          }}>
              {messages.length ?
                <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {messages.map((message, index) => (
                        <ChatMessage
                            key={index}
                            msgIndex={index}
                            message={message.text}
                            sender={message.sender}
                            msgType = {message.type}
                            speakingMsgIndex={speakingMsgIndex}
                            startSpeaking={startSpeaking}
                            stopSpeaking={stopTextSpeaking}
                        />
                    ))}
                <div ref={messagesEndRef} />

                </List>:
                <Box sx={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height: "100%"}} >
                  <Typography variant="body1" sx={(theme) => ({
                    color: theme.palette.text.secondary
                  })}>No conversation found for the patient.</Typography>
                  <Typography variant="body2" sx={(theme) => ({
                    color: theme.palette.text.secondary
                  })}>Send a new message to start the conversation.</Typography>
                </Box>
              }
          </Box>
          <ChatInput onSend={startStream} />
      
      </Box>
      </Container>
  );
};

export default ChatScreen;