"use client";
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  tableCellClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface CustomTableProps {
  headers: { id: string; label: string }[];
  rows: any[];
  showActions?: boolean;
  actionItems?: React.FC;
  displayPagination?: boolean;
  page?: number;
  rowsPerPage?: number;
  count?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // Relay any other props to the table
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  rows,
  showActions = false,
  actionItems = null,
  displayPagination = false,
  page = 0,
  rowsPerPage = 5,
  count = rows.length,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  ...props
}) => {
  return (
    <TableContainer>
      <Table {...props}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <StyledTableCell key={header.id} sx={{ fontWeight: 'bold' }}>
                {header.id !== 'action' ? (
                  <TableSortLabel>{header.label}</TableSortLabel>
                ) : (
                  header.label
                )}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              {headers.map((header) => (
                <StyledTableCell key={header.id}>
                  {header.id === 'action' && showActions ? actionItems(row) : row[header.id]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {displayPagination && (
        <TablePagination
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10]}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
