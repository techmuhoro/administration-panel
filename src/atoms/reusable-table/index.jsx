"use client";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TablePagination from "./pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F6F6F6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "5px !important",
}));

export default function ReusableTable({
  data,
  columns,
  count,
  currentPage,
  totalPages,
  rowsPerPage,
  paginate = true,
}) {
  return (
    <TableContainer component={StyledContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {columns?.map(({ label, assessor, visible }) => {
              if (visible === undefined || visible === true) {
                return (
                  <StyledTableCell key={`${label}-${assessor}`}>
                    {label}
                  </StyledTableCell>
                );
              }
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <StyledTableRow key={item.id}>
              {columns?.map(({ label, assessor, cell, visible }) => {
                if (visible === undefined || visible === true) {
                  return (
                    <StyledTableCell key={`${item.id}-${label}-${assessor}`}>
                      {cell && typeof cell === "function"
                        ? cell({
                            row: item,
                            cell: item[assessor],
                          })
                        : item[assessor]}
                    </StyledTableCell>
                  );
                }
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={count}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
      />
    </TableContainer>
  );
}
