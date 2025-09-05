"use client";
import * as React from 'react';
import CustomTable from '../common/CustomTable';


export default function MedicalProblems({medical_problems}: {medical_problems: any}) {
  return (
    <CustomTable headers={[{id: "title", label: "Name"}]} rows={medical_problems} displayPagination />
  );
}