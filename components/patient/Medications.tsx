"use client";
import * as React from 'react';
import CustomTable from '../common/CustomTable';


export default function Medications({medications}: {medications: any}) {
  return (
    <CustomTable headers={[{id: "title", label: "Name"}, {id: "begdate", label: "Start Date"}]} rows={medications} displayPagination />
  );
}