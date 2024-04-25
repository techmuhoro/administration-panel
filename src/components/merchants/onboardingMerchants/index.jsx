import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";

import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";
import Filters from "./list/components/filters";
import Export from "./list/components/export";
import ReusableTable from "@/atoms/reusable-table";
import { columns } from "./list/columns";
import { sampleMerchants } from "../temporarySampleData";
import {
  convertStringSearchParamsToObj,
  createQS,
  pluckProperties,
} from "@/lib/utils";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";

function OnboardingMerchants({ tblPayload, paginationData, tabId }) {
  const pathname = usePathname();
  const urlQuery = useSearchParams();

  const urlQueryStr = createQS(urlQuery); // Conditionally includes '?'
  const url = `${pathname}${urlQueryStr}`;

  useEffect(() => {
    // Only run operations on specific tab
    if (tblPayload.designation !== tabId) return;

    const urlQueryObj = convertStringSearchParamsToObj(urlQueryStr);
    const tblPgConfig = pluckProperties(["rows", "page"], urlQueryObj);

    const storeName = tabId + "-pagination"; // Name convention
    if (tblPgConfig.rows >= 0 || tblPgConfig.page >= 0) {
      try {
        let stgPagination = JSON.parse(sessionStorage.getItem(storeName));
        if (
          typeof stgPagination !== "object" &&
          typeof stgPagination !== "undefined" // Will allow undefined
        )
          throw new Error("Unusable store");

        stgPagination = {
          ...(stgPagination || null),
          ...(tblPgConfig.rows >= 0 && { rows: tblPgConfig.rows }),
          ...(tblPgConfig.page >= 0 && { page: tblPgConfig.page }),
        };

        sessionStorage.setItem(storeName, JSON.stringify(stgPagination));
      } catch (error) {
        console.warn("skipping persisting pagination config: ", error?.message);
      }
    } else {
      sessionStorage.removeItem(storeName);
    }
  }, [url, urlQueryStr]);

  return (
    <StyledContentWrapper sx={{ px: 4, py: 2 }}>
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
            <PopoverMenuBtn renderMenu={<Filters />} variant="outlined">
              Filter
            </PopoverMenuBtn>
          </Box>

          <Box component="span" sx={{ display: "inline-block" }}>
            <PopoverMenuBtn renderMenu={<Export />} variant="outlined">
              Export
            </PopoverMenuBtn>
          </Box>
        </Box>
      </Box>

      <ReusableTable
        data={tblPayload?.data}
        columns={columns}
        {...paginationData}
      />
    </StyledContentWrapper>
  );
}

export default OnboardingMerchants;
