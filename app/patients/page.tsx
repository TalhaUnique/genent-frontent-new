"use client";
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import APIRepository from '@/utils/APIRepository';
import CustomTable from '@/components/common/CustomTable';
import { useRouter } from 'next/navigation';

const headCells = [
  { id: 'pid', label: 'ID' },
  { id: 'fname', label: 'First Name' },
  { id: 'lname', label: 'Last Name' },
  { id: 'DOB', label: 'Date of Birth' },
  { id: 'action', label: 'Action' },
];

const PatientsPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await APIRepository.get('/emr/patients');
        setPatients(response.data.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const paginatedRows = patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleActionClick = (patientId: string) => {
    localStorage.setItem("active_chat_patient", patientId)
    router.push(`/patient-detail/${patientId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom color='text.primary'>
        Patients
      </Typography>

      {/* Search bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" size="small" disabled={!search}>
          Search
        </Button>
        <Button variant="outlined" size="small" onClick={() => setSearch('')} disabled={!search}>
          Reset
        </Button>
      </Box>

      {/* Conditional Rendering: Table on desktop, List on mobile */}
      {isMobile ? (
        <Paper variant="outlined">
          <List disablePadding>
            {patients.map((row, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleActionClick(row.uuid)}>
                      <ChatIcon color="primary" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${row.fname} ${row.lname}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          ID: {row.pid}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          DOB: {row.DOB}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 2 }} variant="outlined">
          <CustomTable
            headers={headCells}
            rows={paginatedRows}
            showActions
            actionItems={(row) => (
              <ChatIcon
                color="primary"
                onClick={() => handleActionClick(row.uuid)}
                style={{ cursor: 'pointer' }}
              />
            )}
            displayPagination
            page={page}
            rowsPerPage={rowsPerPage}
            count={patients.length}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            size="small"
          />
        </Paper>
      )}
    </Container>
  );
};

export default PatientsPage;
