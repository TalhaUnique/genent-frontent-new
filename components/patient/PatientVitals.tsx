"use client"
import React, {useEffect} from 'react';
import { Typography, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import APIRepository from '@/utils/APIRepository';

export default function PatientVitals({patient}: { patient?: { [key: string]: any } }) {
  useEffect(() => {    
    const fetchPatientDetails = async () => {
        try {
          const response = await APIRepository.get(`/emr/patient/vitals?patientId=${patient?.uuid}`);
          console.log('Patient vitals response:', response.data);
          // setPatientDetails(response.data.data);
        } catch (error) {
          console.error('Failed to fetch patient details:', error);
        }
      };
  
      fetchPatientDetails();
    }, [patient]);

  const margin = { right: 24 };

  // Example healthcare-related data
  const heartRateData = [72, 75, 78, 80, 76, 74, 73]; // Heart rate over time
  const heartRateLabels = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];

  const bloodPressureData = [
    { systolic: 120, diastolic: 80 },
    { systolic: 122, diastolic: 82 },
    { systolic: 118, diastolic: 78 },
    { systolic: 125, diastolic: 85 },
    { systolic: 121, diastolic: 79 },
    { systolic: 119, diastolic: 77 },
    { systolic: 123, diastolic: 81 },
  ]; // Blood pressure data
  const bloodPressureLabels = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];

  const glucoseData = [90, 95, 100, 110, 105, 98, 92]; // Glucose levels
  const glucoseLabels = ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'];

  return (
    <Stack>
      {/* Heart Rate Bar Chart */}
      <BarChart 
        xAxis={[
          {
            id: 'heartRateCategories',
            data: heartRateLabels,
          },
        ]}
        series={[
          {
            data: heartRateData,
            label: 'Heart Rate (bpm)',
          },
        ]}
        height={300}
      />

      {/* Blood Pressure Line Chart */}
      <LineChart
        xAxis={[{ scaleType: "point", data: bloodPressureLabels }]}
        series={[
          {
            data: bloodPressureData.map((bp) => bp.systolic),
            label: 'Systolic BP (mmHg)',
          },
          {
            data: bloodPressureData.map((bp) => bp.diastolic),
            label: 'Diastolic BP (mmHg)',
          },
        ]}
        height={300}
      />

      {/* Glucose Levels Area Chart */}
      <LineChart
        height={300}
        series={[
          {
            data: glucoseData,
            label: 'Glucose Levels (mg/dL)',
            area: true,
            showMark: false,
          },
        ]}
        xAxis={[{ scaleType: 'point', data: glucoseLabels }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: 'none',
          },
        }}
        margin={margin}
      />
    </Stack>
  );
}