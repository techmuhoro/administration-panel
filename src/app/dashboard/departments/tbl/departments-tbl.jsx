import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ReusableTable from "@/atoms/reusable-table";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";

function DepartmentsTbl({ data, columnTraits, paginationData }) {
  return (
    <DashboardContentWrapper>
      <Typography component="h1" variant="h5">
        Departments
      </Typography>
      <Stack direction="row" justifyContent="flex-end" columnGap={1} mb={1}>
        {/* <AuditsFilter /> */}
        {/* <AuditsExport /> */}
      </Stack>
      <ReusableTable data={data} columns={columnTraits} {...paginationData} />
    </DashboardContentWrapper>
  );
}

export default DepartmentsTbl;
