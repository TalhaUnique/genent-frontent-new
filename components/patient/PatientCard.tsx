"use client"
import React from 'react';
import { Box, Stack, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { calculateAge } from '@/utils/dateUtils';

export default function PatientCard({ patient }: { patient?: { fname: string; lname: string; pid: string; DOB: string; condition: string } }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const getInitials = (fname: string, lname: string) => {
    return `${fname?.[0] || ''}${lname?.[0] || ''}`.toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ['purple', 'blue', 'green', 'orange', 'red', 'teal'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box>
          <Avatar sx={{ bgcolor: getRandomColor(), height: 70, width: 70 }}>
            {patient?.fname && patient?.lname ? getInitials(patient.fname, patient.lname) : 'N/A'}
          </Avatar>
        </Box>
        <Box>
          <Typography variant="h6">
            {patient?.fname} {patient?.lname} ({patient?.pid})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {patient?.DOB ? calculateAge(patient.DOB) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            DOB: {patient?.DOB}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
