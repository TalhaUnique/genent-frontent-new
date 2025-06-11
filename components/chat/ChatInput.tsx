"use client";

import { Box, Paper, InputBase, IconButton, useTheme, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { useState, useEffect } from 'react';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import StopCircleIcon from '@mui/icons-material/StopCircle';


const ChatInput = ({ onSend }: {onSend: (msg: string) => void}) => {
    const [message, setMessage] = useState('');
    const [transcriptCursor, setTranscriptCursor] = useState(0);
    const {
        transcript,
        listening,
        startListening,
        stopListening,
        resetTranscript
      } = useSpeechToText();
      
      const theme = useTheme()
      const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };


    const startRecording = () => {
        console.log("RECORDING STARTED")
        resetTranscript();
        console.log("reset transcript")
        setTranscriptCursor(0);
        console.log('reset cursor')
        startListening();   
        console.log('start listening')
    }



    useEffect(() => {
    if (transcript) {
        const newPart = transcript.slice(transcriptCursor);
        if (newPart) {
        setMessage((prev) => prev + newPart);
        
        setTranscriptCursor(transcript.length);
        }
    }
    }, [transcript]);
// ${t.palette.divider}
    return (
        <Box mt={2} sx={{flex: 1, display: 'flex', justifyContent: 'center', 
        alignItems: 'center', position: 'sticky', bottom: isMobile ? 40 : 5, left: 0}}>
            <Paper
                elevation={3}
                sx={(theme) => ({   
                    p: 1,
                    borderRadius: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    border: t => `0.5px solid `,
                    width: '100%',
                    background: theme.palette.background.default
                })}
            >
                <InputBase
                    multiline
                    minRows={1}
                    maxRows={6}
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    sx={{
                        px: 1,
                        borderRadius: 2,
                        fontSize: 16,
                        bgcolor: 'background.paper',
                    }}
                    startAdornment = {<IconButton sx={{ border: t => `0.5px solid `, borderRadius: 4, mr: 1 }} onClick={listening ? stopListening : startRecording} >
                            {listening ? <StopCircleIcon sx={{color: 'red'}} /> : <MicIcon />}
                        </IconButton>}
                    endAdornment = {
                        <IconButton
                            color="primary"
                            onClick={handleSend}
                            sx={{ border: t => `0.5px solid `, borderRadius: 4 }}
                        >
                            <SendIcon />
                        </IconButton>
                    }
                />
                {/* Commented for later use <Stack direction="row" spacing={1} justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        <IconButton sx={{ border: t => `0.5px solid `, borderRadius: 4 }}>
                            <InsertPhotoIcon />
                        </IconButton>
                        <IconButton sx={{ border: t => `0.5px solid `, borderRadius: 4 }}>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton sx={{ border: t => `0.5px solid `, borderRadius: 4 }}>
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <IconButton sx={{ border: t => `0.5px solid `, borderRadius: 4 }} onClick={listening ? stopListening : startRecording} >
                            {listening ? <StopCircleIcon sx={{color: 'red'}} /> : <MicIcon />}
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={handleSend}
                            sx={{ border: t => `0.5px solid `, borderRadius: 4 }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Stack>
                </Stack> */}
            </Paper>
        </Box>
    );
};

export default ChatInput;