"use client"
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import React, { useState, useEffect } from 'react';
import { Button, Grid, useTheme, useMediaQuery, Typography } from '@mui/material';
import ChatScreen from '@/app/chat/ChatScreen';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';
import PatientInfo from '@/components/patient/PatientInfo';
import APIRepository from '@/utils/APIRepository';
import { LoaderOverlay } from '@/components/common/LoaderOverlay';

export default function PatientDetailPage({ params }: any) {
  const { patient_uuid } = React.use(params) as any;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true)
  // State to control the visibility of the patient info section
  const [showPatientInfo, setShowPatientInfo] = useState(!isMobile);
  
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true)
        const response: any = await APIRepository.get(`/emr/patient?patientId=${patient_uuid}`);
        setPatientDetails(response.data.data);
        setLoading(false)
        
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
    <>
      {loading ? <LoaderOverlay message="Loading Patient Data..." open={true} /> :
      <Grid container spacing={0}>
        <Grid
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
      </Grid>}
    </>);
}
