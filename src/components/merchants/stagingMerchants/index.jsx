"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";

import Filters from "./list/components/filters";
import Export from "./list/components/export";
import ReusableTable from "@/atoms/reusable-table";
import { sampleMerchants } from "../temporarySampleData";
import { columns } from "./list/columns";
import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";
import {
  pluckProperties,
  convertStringSearchParamsToObj,
  createQS,
} from "@/lib/utils";

function StagingMerchants({ tblPayload, paginationData, tabId }) {
  const pathname = usePathname();
  const urlQuery = useSearchParams();

  const urlQueryStr = createQS(urlQuery); // Conditionally includes '?'
  const url = `${pathname}${urlQueryStr}`;

  useEffect(() => {
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
    } else if (tblPayload.designation === tabId) {
      sessionStorage.removeItem(storeName);
    }
  }, [url, urlQueryStr]);

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "end",
          mt: 1,
          mb: 1,
        }}
      >
        <Box>
          <Box component="span" sx={{ mr: 1, display: "inline-block" }}>
            <PopoverMenuBtn
              renderMenu={Filters}
              variant="outlined"
              text="Filter"
            />
          </Box>

          <Box component="span" sx={{ display: "inline-block" }}>
            <PopoverMenuBtn
              renderMenu={Export}
              variant="outlined"
              text="Export"
            />
          </Box>
        </Box>
      </Box>

      <ReusableTable
        data={tblPayload?.data}
        columns={columns}
        {...paginationData}
      />
    </>
  );
}

export default StagingMerchants;
