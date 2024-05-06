"use client";
import { useEffect } from "react";
import Link from "next/link";
import ReusableTable from "@/atoms/reusable-table";
import Typography from "@mui/material/Typography";
import { Box, Stack, Button } from "@mui/material";
import { columns } from "./columns";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import AddNew from "@/atoms/button/add-new";
import UserFilter from "./filter";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

export default function UsersList({ tblData, paginationData, errorFeed }) {
  const setAlertMessage = useNotifyAlertCtx();

  useEffect(() => {
    if (!!errorFeed) {
      setAlertMessage(errorFeed, { type: "error", openDuration: 4000 });
    }
  }, [errorFeed, setAlertMessage]);

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Users
      </Typography>
      <StyledContentWrapper sx={{ p: 3 }}>
        {/** Actions buttons */}
        <Stack direction={"row"} mb={1}>
          <Link href={"/dashboard/users/add"}>
            <AddNew text={"add user"} />
          </Link>

          <Stack direction="row" sx={{ ml: "auto" }} columnGap={1}>
            <UserFilter />
          </Stack>
        </Stack>

        {/** Actions buttons */}
        <ReusableTable
          columns={columns}
          data={tblData}
          count={paginationData.count}
          currentPage={paginationData.currentPage}
          rowsPerPage={paginationData.rowsPerPage}
          totalPages={paginationData.totalPages}
        />
      </StyledContentWrapper>
    </Box>
  );
}
