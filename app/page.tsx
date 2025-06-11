"use client"
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import React from 'react';
import { Typography, Box, Button, Stack, Container } from '@mui/material';
// import Link from 'next/link';

const Dashboard = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Typography variant="h3" gutterBottom>
      Healthcare Portal Dashboard
    </Typography>
    {/* <Typography variant="h6" sx={(theme) => ({
      color: theme.palette.text.secondary
    })} gutterBottom>
      Welcome to the healthcare web portal. Use the navigation below to access different sections.
    </Typography>
    <Box mt={4}>
      <Stack direction="row" spacing={2}>
        <Button component={Link} href="/chat" variant="contained" color="primary">
          Chat
        </Button>
        <Button component={Link} href="/patients" variant="outlined">
          Patient List
        </Button>
      </Stack>
    </Box> */}
  </Container>
);

export default Dashboard;