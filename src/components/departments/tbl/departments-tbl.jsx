import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ReusableTable from "@/atoms/reusable-table";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import DepartmentsFilter from "./tblComponents/departments-filter";
import CreateBtn from "./tblComponents/create-btn";
import DepartmentsExport from "./tblComponents/departments-export";

function DepartmentsTbl({ data, columnTraits, paginationData }) {
  return (
    <DashboardContentWrapper>
      <Typography component="h1" variant="h5">
        Departments
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "space-between",
          mt: 2,
          mb: 1,
        }}
      >
        <Box>
          <CreateBtn />
        </Box>

        <Box>
          <DepartmentsFilter />
          <DepartmentsExport />
        </Box>
      </Box>
      <ReusableTable data={data} columns={columnTraits} {...paginationData} />
    </DashboardContentWrapper>
  );
}

export default DepartmentsTbl;
