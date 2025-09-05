"use client";
import * as React from 'react';
import CustomTable from '../common/CustomTable';


export default function Appointments({appointments}: {appointments: any}) {
  return (
    <CustomTable headers={[
        {id: "date", label: "Date"},
        {id: "pc_catname", label: "Category"},
        {id: "reason", label: "Reason"},
        {id: "sensitivity", label: "Sensitivity"},
    ]} rows={appointments} displayPagination />
  );
}