"use client";
import { useEffect } from "react";
import Link from "next/link";
import ReusableTable from "@/atoms/reusable-table";
import { Box, Stack, Button } from "@mui/material";
import { columns } from "../list/columns";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import AddNew from "@/atoms/button/add-new";
import UserFilter from "./filter";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

export default function UsersList({
  errorDetails,
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  const setAlertMessage = useNotifyAlertCtx();

  useEffect(() => {
    if (errorDetails && errorDetails.error) {
      setAlertMessage(errorDetails.errorMessage, {
        type: "error",
        closeOnClickAway: true,
        openDuration: 4000,
      });
    }
  }, [errorDetails, setAlertMessage]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid #e5e7eb",
          px: 3,
          py: 3,
        }}
      >
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
        <StyledContentWrapper sx={{ p: 3 }}>
          <ReusableTable
            columns={columns}
            data={data}
            count={count}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
          />
        </StyledContentWrapper>
      </Box>
    </Box>
  );
}
