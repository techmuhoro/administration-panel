"use client";

import { useEffect } from "react";
import ReusableTable from "@/atoms/reusable-table";
import RolesFilter from "./filter";
import RolesExport from "./export";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import AddIcon from "@mui/icons-material/Add";

import { columns } from "./columns";

import { styled } from "@mui/material/styles";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

export default function RolesList({ tblData, paginationData, errorFeed }) {
  const setAlertMessage = useNotifyAlertCtx();

  useEffect(() => {
    if (!!errorFeed) {
      setAlertMessage(errorFeed, { type: "error", openDuration: 4000 });
    }
  }, [errorFeed, setAlertMessage]);

  return (
    <Box>
      <Typography component="h1" variant="h5" mb={1}>
        Roles
      </Typography>

      <StyledContentWrapper
        sx={{
          px: 3,
          py: 3,
        }}
      >
        {/** Actions buttons */}
        <Stack direction={"row"} mb={1}>
          <Link href={"/dashboard/roles/add"}>
            <Button startIcon={<AddIcon />} variant="contained">
              New
            </Button>
          </Link>

          <Stack direction="row" sx={{ ml: "auto" }} columnGap={1}>
            <RolesFilter />
          </Stack>
        </Stack>

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
