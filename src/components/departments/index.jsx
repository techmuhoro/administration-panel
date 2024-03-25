"use client";

import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ReusableTable from "@/atoms/reusable-table";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import DepartmentsFilter from "./list/components/departments-filter";
import CreateBtn from "./list/components/create-btn";
import DepartmentsExport from "./list/components/departments-export";
import { useNotifyAlertCtx } from "../notify-alert/notify-alert-context";

function Departments({ columnTraits, tblData, errorFeed, paginationData }) {
  const setAlertMessage = useNotifyAlertCtx();

  useEffect(() => {
    if (errorFeed.error) {
      const msg = errorFeed.msg || "An error occured";
      setAlertMessage(msg, { type: "error", openDuration: 4000 });
    }
  }, [errorFeed]);

  return (
    <DashboardContentWrapper>
      <Box>
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
            <DepartmentsFilter error={errorFeed} />
            <DepartmentsExport />
          </Box>
        </Box>
        <ReusableTable
          data={tblData}
          columns={columnTraits}
          {...paginationData}
        />
      </Box>
    </DashboardContentWrapper>
  );
}

export default Departments;
