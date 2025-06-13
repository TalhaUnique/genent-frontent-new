"use client";
import { 
  Box, 
  Typography, 
  IconButton, 
  Tooltip, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
 } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
// import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
// import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// import ReplyIcon from '@mui/icons-material/Reply';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import remarkGfm from 'remark-gfm';


interface ChatMessageProps {
  message?: string;
  sender: 'user' | 'bot';
  chatId?: string | null;
  msgType: string;
  msgIndex: number;
  speakingMsgIndex: number | null;
  startSpeaking: (message: string, msgIndex: number) => void;
  stopSpeaking: () => void;
}

interface HtmlRendererProps {
  escapedHtml: string | undefined | null;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ escapedHtml }) => {
  const [unescapedHtml, setUnescapedHtml] = useState<string>('');

  useEffect(() => {
    const txt: HTMLTextAreaElement = document.createElement('textarea');
    txt.innerHTML = escapedHtml as string;
    setUnescapedHtml(txt.value);
  }, [escapedHtml]);

  return <div dangerouslySetInnerHTML={{ __html: unescapedHtml }} />;
};

const validAligns = ['left', 'right', 'center', 'justify', 'inherit'] as const;


const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender, msgType, msgIndex, speakingMsgIndex, startSpeaking, stopSpeaking }) => {
  const [hover, setHover] = useState(false);
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    setSpeaking(msgIndex == speakingMsgIndex)
  }, [msgIndex, speakingMsgIndex])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
        mb: 4,
        position: 'relative',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-29px',
          right: sender === 'user' ? 0 : 'unset',
          left: sender === 'bot' ? 0 : 'unset',
          display: 'flex',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.2s',
          zIndex: 1,
        }}
      >
        
        {!speaking && <Tooltip title={"Listen"} key={"Listen"}>
          <IconButton size="small" onClick={() => startSpeaking(message!, msgIndex)}>
            <VolumeUpIcon fontSize="small" />
          </IconButton>
        </Tooltip>}
        {speaking && <Tooltip title={"Listen"} key={"Listen"}>
          <IconButton size="small" onClick={() => stopSpeaking()}>
            <StopCircleIcon sx={{color: "red"}} fontSize="small" />
          </IconButton>
        </Tooltip> }
        <Tooltip title={"Copy"} key={"Copy"}>
          <IconButton size="small">
            <ContentCopyOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
      </Box>
      <Box
        sx={{
          maxWidth: '70%',
          padding: sender === 'user' ? 1.5 : 0,
          borderRadius: sender === 'user' ? 4 : 0,
          bgcolor: sender === 'user' ? '#e3f2fd' : 'transparent',
          color: sender === 'user' ? 'black' : 'inherit',
          position: 'relative',
          transition: 'background 0.2s',
        }}
      >
        {sender === 'bot' ? (
          <> 
            {msgType == "text" && 
              <>
                <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => <Typography variant="h5" {...props} />,
                        h2: ({ node, ...props }) => <Typography variant="h6" {...props} />,
                        h3: ({ node, ...props }) => <Typography variant="subtitle1" {...props} />,
                        p: ({ node, ...props }) => <Typography variant="body1" {...props} sx={{ mb: 1 }} />,
                        li: ({ node, ...props }) => (
                          <Typography
                            component="li"
                            variant="body2"
                            {...props}
                            sx={{ ml: 2, listStyleType: 'disc' }}
                          />
                        ),
                        table: ({ node, ...props }) => (
                          <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table size="small" {...props} />
                          </TableContainer>
                        ),
                        thead: ({ node, ...props }) => <TableHead {...props} />,
                        tbody: ({ node, ...props }) => <TableBody {...props} />,
                        tr: ({ node, ...props }) => <TableRow {...props} />,
                        th: ({ node, ...props }) => {

                          const { align, ...rest } = props;
                          return <TableCell
                            key={Math.random()}
                            component="th"
                            align={"left"}
                            sx={{ fontWeight: 'bold', backgroundColor: 'grey.100' }}
                            {...rest}
                          />
                        },
                        td: ({ node, ...props }) => {
                        const { align, ...rest } = props;
                        return <TableCell align="left" {...rest} key={Math.random()}/>
                      },
                      }}
                    >
                      {message || ''}
                    </ReactMarkdown>
                  
                <Divider sx={{ mt: 2, width: '100%' }} />
              </>
            }
            {
              msgType == "html" && <HtmlRenderer escapedHtml={message} />

            }
          </>
        ) : (
          <Typography variant="body2" sx={{ wordBreak: 'break-word', flex: 1 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessage;