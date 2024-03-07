import { cache } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import http from "@/http";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import { columns } from "@/components/departments/tbl/columns";
import ReusableTable from "@/atoms/reusable-table";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import DepartmentsFilter from "@/components/departments/tbl/tblComponents/departments-filter";
import CreateBtn from "@/components/departments/tbl/tblComponents/create-btn";
import DepartmentsExport from "@/components/departments/tbl/tblComponents/departments-export";

const config = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
  method: "GET",
};

const getDepts = cache((url) =>
  http({ ...config, url, includeAuthorization: true })
);

async function Departments({ searchParams }) {
  let tblData = [];
  let paginationData = {};

  const searchQueryParams = {
    limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
    page: parseInt(searchParams?.page, 10) || 1,
    ...(searchParams?.deptName && { name: searchParams.deptName }),
  };

  try {
    const urlSearchQueryString = new URLSearchParams(
      searchQueryParams
    ).toString();
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}departments?${urlSearchQueryString}`;

    const deptsResponse = await getDepts(endpoint).then((res) => res.data);
    tblData = deptsResponse?.data?.data;

    paginationData = {
      count: deptsResponse?.data?.total || 0,
      currentPage: deptsResponse?.data?.current_page || 0,
      totalPages: deptsResponse?.data?.total || 0,
      rowsPerPage: deptsResponse?.data?.limit || 0,
    };
  } catch (err) {
    console.log("Error fetching departments");
    paginationData = {
      count: 0,
      currentPage: 0,
      totalPages: 0,
      rowsPerPage: 0,
    };
  }

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
      <ReusableTable data={tblData} columns={columns} {...paginationData} />
    </DashboardContentWrapper>
  );
}

export default Departments;
