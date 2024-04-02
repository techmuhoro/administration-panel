"use client";

import Box from "@mui/material/Box";

import Filters from "./list/components/filters";
import Export from "./list/components/export";
import ReusableTable from "@/atoms/reusable-table";
import { sampleMerchants } from "../temporarySampleData";
import { columns } from "./list/columns";
import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";

function StagingMerchants({ tblData, paginationData }) {
  console.log({ StagingMerchants: tblData });
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "end",
          mt: 2,
          mb: 1,
        }}
      >
        <Box>
          <Box component="span" sx={{ mr: 1, display: "inline-block" }}>
            <PopoverMenuBtn renderMenu="Filter coming soon" variant="outlined">
              Filter
            </PopoverMenuBtn>
          </Box>

          <Box component="span" sx={{ display: "inline-block" }}>
            <PopoverMenuBtn renderMenu="Exports coming soon" variant="outlined">
              Export
            </PopoverMenuBtn>
          </Box>
        </Box>
      </Box>

      <ReusableTable data={tblData} columns={columns} {...paginationData} />
    </>
  );
}

export default StagingMerchants;
