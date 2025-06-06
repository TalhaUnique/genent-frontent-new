"use client";
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

export default function PatientDetails({ patient }: { patient: { [key: string]: any } }) {

  const relevantFields = [
    { label: 'First Name', value: patient.fname },
    { label: 'Last Name', value: patient.lname },
    { label: 'Middle Name', value: patient.mname },
    { label: 'Date of Birth', value: patient.DOB },
    { label: 'Sex', value: patient.sex },
    { label: 'Phone Contact', value: patient.phone_contact },
    { label: 'Email', value: patient.email },
    { label: 'Street Address', value: patient.street },
    { label: 'City', value: patient.city },
    { label: 'State', value: patient.state },
    { label: 'Postal Code', value: patient.postal_code },
    { label: 'Country', value: patient.country_code },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Patient Details
      </Typography>
      <Grid container spacing={2}>
        {relevantFields.map((field, index) => (
          <Grid item size={{xs: 12, md:6}} key={index}>
            <Typography variant="body2" color="text.secondary">
              {field.label}:
            </Typography>
            <Typography variant="body1">{field.value || 'N/A'}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
