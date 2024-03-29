"use client";

import Box from "@mui/material/Box";

import Filters from "./list/components/filters";
import Export from "./list/components/export";
import ReusableTable from "@/atoms/reusable-table";
import { sampleMerchants } from "../temporarySampleData";
import { columns } from "./list/columns";

function StagingMerchants() {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "space-between",
          mt: 2,
          mb: 1,
        }}
      >
        {/* <Box>
          <CreateBtn />
        </Box> */}

        <Box>
          <Filters />
          {/* <Export /> */}
        </Box>
      </Box>

      <ReusableTable
        data={sampleMerchants}
        columns={columns}
        // {...paginationData}
      />
    </>
  );
}

export default StagingMerchants;
