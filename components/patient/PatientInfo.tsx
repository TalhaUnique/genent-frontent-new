"use client"
import React, { useEffect, useState } from 'react';
import { Paper, Typography, IconButton, Stack, Box, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PatientCard from './PatientCard';
import PatientVitals from './PatientVitals';
import Allergies from './Allergies';
import PatientDetails from './PatientDetails';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Medications from './Medications';
import MedicalProblems from './MedicalProblems';
import Appointments from './Appointments';

const PatientInfoAccordion = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => {
  return (
    <Accordion
      sx={{
        mb: 1,
        boxShadow: 'none',
        '&.Mui-expanded': {
          boxShadow: 'none',
          mb: 1,
        },
        '&::before': {
          display: 'none',
        },
        borderRadius: '20px',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreOutlinedIcon />}
        aria-controls="panel-content"
        id="panel-header"
        sx={{
          border: t => `1px solid darkgray`,
          borderRadius: '20px',
          boxShadow: 'none',
          '&.Mui-expanded': {
            borderRadius: '20px 20px 0 0',
            minHeight: 'unset',
          },
        }}
      >
        <Stack direction={"row"} spacing={1}>
          {icon}
          <Typography component="span" sx={{ fontSize: '1rem' }}>
            {title}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderRadius: '0 0 20px 20px',
          border: t => `1px solid darkgray`,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

interface PatientInfoProps {
  onClose: () => void;
  patient: any
}

export default function PatientInfo({ onClose, patient }: PatientInfoProps) {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '85vh',
        opacity: 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <PatientCard patient={patient} />
        <Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mt: 2 }}>
        <Tab label="Details" />
        <Tab label="Vitals" />
        <Tab label="History" />
      </Tabs>
      {activeTab === 0 && (
        <Box sx={{ mt: 2 }}>
          <PatientDetails patient={patient} />
        </Box>
      )}
      {activeTab === 1 && (
        <Box sx={{ mt: 2 }}>
          <PatientVitals patient={patient}/>
        </Box>
      )}
      {activeTab === 2 && (
        <Stack sx={{ mt: 2 }}>
          <PatientInfoAccordion title="Allergies" icon={<CoronavirusOutlinedIcon />}>
            <Allergies allergies={patient.allergies} />
          </PatientInfoAccordion>
          <PatientInfoAccordion title="Medical Problems" icon={<HeartBrokenOutlinedIcon />}>
            <MedicalProblems medical_problems={patient.medical_problems} />
          </PatientInfoAccordion>
          <PatientInfoAccordion title="Medications" icon={<VaccinesOutlinedIcon />}>
            <Medications medications={patient.medications}/>
          </PatientInfoAccordion>
          {/* <PatientInfoAccordion title="Prescriptions" icon={<TextSnippetOutlinedIcon />}>
            <></>
          </PatientInfoAccordion> */}
          <PatientInfoAccordion title="Appointments" icon={<EventAvailableOutlinedIcon />}>
            <Appointments appointments={patient.appointments} />
          </PatientInfoAccordion>
        </Stack>
      )}
    </Paper>
  );
}
