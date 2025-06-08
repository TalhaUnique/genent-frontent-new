"use client";
import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import PeopleIcon from '@mui/icons-material/People';

const BottomNav: React.FC = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // Route based on selected index
    switch (newValue) {
      case 0:
        router.push("/patients");
        break;
      case 1:
        const patientId = localStorage.getItem('active_chat_patient')
        console.log(!patientId)
        if(!patientId){
          router.push("/patients")
          break;
        }
        router.push(`/patient-detail/${patientId}`);
        break;
      case 2:
        router.push("/history");
        break;
    }
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: 1,
        borderColor: "divider",
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Patients" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
        <BottomNavigationAction label="Recent" icon={<HistoryIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
