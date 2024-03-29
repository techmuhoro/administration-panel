import Box from "@mui/material/Box";

import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";
import Filters from "./list/components/filters";
import Export from "./list/components/export";
import ReusableTable from "@/atoms/reusable-table";
import { columns } from "./list/columns";
import { sampleMerchants } from "../temporarySampleData";

function OnboardingMerchants() {
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
            <PopoverMenuBtn renderMenu={<Filters />}>Filter</PopoverMenuBtn>
          </Box>

          <Box component="span" sx={{ display: "inline-block" }}>
          <PopoverMenuBtn renderMenu={<Export />}>Export</PopoverMenuBtn>
            
          </Box>
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

export default OnboardingMerchants;
