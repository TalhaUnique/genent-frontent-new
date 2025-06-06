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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import APIRepository from '@/utils/APIRepository';
import CustomTable from '@/components/common/CustomTable';
import { useRouter } from 'next/navigation';

const headCells = [
  { id: 'pid', label: "ID"},
  { id: 'fname', label: 'First Name' },
  { id: 'lname', label: 'Last Name' },
  { id: 'DOB', label: 'Date of Birth' },
  { id: 'action', label: 'Action' },
];

const PatientsPage = () => {
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await APIRepository.get('/emr/patients');
        console.log('Patients response:', response.data);
        setPatients(response.data.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const paginatedRows = patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleActionClick = (patientId: number) => {
    router.push(`/patient-detail/${patientId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Patient List
      </Typography>
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
        <Button
          variant="contained"
          size="small"
          onClick={() => {/* Optionally trigger search logic here */}}
          disabled={!search}
          sx={{ padding: 1, borderRadius: 2 }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSearch('')}
          disabled={!search}
          sx={{ padding: 1, borderRadius: 2 }}
        >
          Reset
        </Button>
      </Box>
      <Paper sx={{ borderRadius: 2 }} variant="outlined">
        <CustomTable
          headers={headCells}
          rows={paginatedRows}
          showActions
          actionItems={(row) => (
            <ChatIcon
              color="primary"
              onClick={() => handleActionClick(row.uuid)} // Pass the patient ID dynamically from row data
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
    </Container>
  );
};

export default PatientsPage;
