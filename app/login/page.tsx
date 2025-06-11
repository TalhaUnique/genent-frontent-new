"use client";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import APIRepository from '@/utils/APIRepository';

export default function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('grant_type', 'password');
      formData.append('scope', '');

      const response: any = await APIRepository.post('/auth/access-token', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { access_token } = response.data;
      if (typeof window !== undefined){
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('isLoggedIn', 'true');
      }
      
      router.push('/patients');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response?.status === 400) {
        setUsernameError(true);
        setPasswordError(true);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={2}
        variant="outlined"
        sx={{
          width: isMobile ? '95%' : "50%",
          p: 4,
          borderRadius: 10,
        }}
      >
        <Stack direction="row" useFlexGap flexWrap="wrap">
          <Stack
            sx={{
              width: { xs: '100%', md: '50%', sm: '100%' },
              textAlign: { xs: 'center', md: 'flex-start' },
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <img
              src="/gennet.avif"
              alt="Logo"
              style={{ width: 125, marginLeft: -35 }}
            />
            <Typography variant="h5" sx={{ mb: 2 }}>
              Signin
            </Typography>
            <Typography variant="body1">
              Where AI and Healthcare Align.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Empowering Healthcare with Efficiency.
            </Typography>
          </Stack>
          <Stack direction="column" sx={{ width: { xs: '100%', sm: '100%', md: '50%' } }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                setUsernameError(false);
              }}
              error={usernameError}
              helperText={usernameError ? 'Invalid email address' : ''}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              sx={{ mb: { md: 5, xs: 2 } }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              error={passwordError}
              helperText={passwordError ? 'Invalid password' : ''}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined">Sign Up</Button>
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
