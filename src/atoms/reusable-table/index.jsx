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

function getObjValueByPath(obj, path) {
  const keys = path.split(".");

  let value = obj;

  for (let key of keys) {
    if (value.hasOwnProperty(key)) {
      value = value[key];
    } else {
      return undefined;
    }
  }

  return value;
}

export default function ReusableTable({
  data,
  columns,
  count,
  currentPage,
  totalPages,
  rowsPerPage,
  paginate = true,
}) {
  // function to simplify the logic of display the cell content
  const getCellValue = ({ item, assessor, cell, index }) => {
    // support for auto incrementing column / serial
    if (assessor === "autoincrement()") {
      return index + 1;
    }

    // support for callback function
    if (cell && typeof cell === "function") {
      return cell({
        row: item,
        cell: getObjValueByPath(item, assessor),
      });
    }

    // the raw value
    return getObjValueByPath(item, assessor);
  };

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
          {data?.map((item, rowIndex) => (
            <StyledTableRow key={item.id}>
              {columns?.map(({ label, assessor, cell, visible }) => {
                if (visible === undefined || visible === true) {
                  return (
                    <StyledTableCell key={`${item.id}-${label}-${assessor}`}>
                      {getCellValue({
                        item,
                        cell,
                        assessor,
                        index: rowIndex,
                      })}
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
