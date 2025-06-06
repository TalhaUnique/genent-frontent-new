"use client"
import React, { useState, useEffect } from 'react';
import { Button, Grid, useTheme, useMediaQuery, Typography } from '@mui/material';
import ChatScreen from '@/app/chat/ChatScreen';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';
import PatientInfo from '@/components/patient/PatientInfo';
import APIRepository from '@/utils/APIRepository';

export default function PatientDetailPage({ params }: { params: { patient_uuid: string } }) {
  const { patient_uuid } = React.use(params);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [patientDetails, setPatientDetails] = useState(null);
  // State to control the visibility of the patient info section
  const [showPatientInfo, setShowPatientInfo] = useState(!isMobile);
  
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await APIRepository.get(`/emr/patient?patientId=${patient_uuid}`);
        console.log('Patient details response:', response.data.data);
        setPatientDetails(response.data.data);
      } catch (error) {
        console.error('Failed to fetch patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patient_uuid]);

  const handleViewPatientClick = () => {
    setShowPatientInfo((prev) => !prev);
  };

  const handleClosePatientInfo = () => {
    setShowPatientInfo(false);
  };

  return (
    <Grid container spacing={0}>
      <Grid
        item
        size={isMobile ? 12 : 6}
        sx={{
          transition: 'all 0.3s ease',
          width: showPatientInfo ? isMobile ? '100%' : '50%' : '0%',
          overflow: 'auto',
        }}
      >
        {showPatientInfo && patientDetails && <PatientInfo patient={patientDetails} onClose={handleClosePatientInfo} />}
      </Grid>
      <Grid
        item
        size={showPatientInfo ? 6 : 12}
        sx={{
          transition: 'all 0.3s ease',
          width: showPatientInfo ? isMobile ? '0%' : '50%' : '100%',
          overflow: 'auto',
        }}
      >
        
          {!showPatientInfo && patientDetails && (
            <Button
              variant="text"
              color="primary"
              startIcon={<PersonOutlineOutlinedIcon />}
              onClick={handleViewPatientClick}
              sx={{ml: 2}}
            >
            {patientDetails['fname']} {patientDetails['lname']}              
          </Button>
          )}
          { !(isMobile && showPatientInfo) &&
            <>
            {patientDetails && <ChatScreen patient={patientDetails} />}
            </>
          }
          
      </Grid>
    </Grid>
  );
}
