"use client";
import * as React from 'react';
import CustomTable from '../common/CustomTable';


export default function Allergies({allergies}: {allergies: any}) {
  return (
    <CustomTable headers={[{id: "title", label: "Name"}]} rows={allergies} displayPagination />
  );
}