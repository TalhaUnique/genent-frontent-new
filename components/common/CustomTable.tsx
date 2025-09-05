"use client";
import React, {useState} from 'react';
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
  // onPageChange?: (event: unknown, newPage: number) => void;
  // onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // Relay any other props to the table
}

const CustomTable: React.FC<CustomTableProps> = ({
  headers,
  rows,
  showActions = false,
  actionItems,
  displayPagination = false,
  // page = 0,
  // rowsPerPage = 5,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  ...props
}) => {


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          {paginatedRows && paginatedRows.map((row, index) => (
            <StyledTableRow key={index}>
              {headers.map((header) => (
                <StyledTableCell key={header.id}>
                  {header.id === 'action' && showActions ? actionItems ? actionItems(row) : null : row[header.id]}
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
          page={page}
          rowsPerPage={rowsPerPage}
          count={rows.length}
          rowsPerPageOptions={[5, 10]}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
