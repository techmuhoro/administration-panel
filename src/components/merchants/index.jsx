"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import StagingMerchants from "./stagingMerchants";
import OnboardingMerchants from "./onboardingMerchants";
import ApprovedMerchants from "./approvedMerchants";
import { useNotifyAlertCtx } from "../notify-alert/notify-alert-context";
import { createQS } from "@/lib/utils";

const tabNames = [
  "staging-merchants",
  "onboarding-merchants",
  "approved-merchants",
];
/**
 * @typedef {Object} Pagination
 * @property {number} count
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} rowsPerPage
 */

/**
 *
 * @param {Object} props
 * @param {Object} props.tblPayload - Payload Containing table Data
 * @param {string} props.errorFeed - Error message, if any, that occured while getting merchants
 * @param {Pagination} props.paginationData - Pagination config to paginate table
 */
function Merchants({ tblPayload, errorFeed, paginationData }) {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = useSearchParams();
  const setAlertMessage = useNotifyAlertCtx();

  const urlQueryStr = createQS(urlQuery); // Conditionally includes '?'
  const url = `${pathname}${urlQueryStr}`;

  useLayoutEffect(() => {
    const initialUrlQuery = new URLSearchParams(urlQueryStr);
    const urlTab = String(initialUrlQuery.get("tab")).toLowerCase();
    const changedTabIdx = tabNames.indexOf(urlTab);

    const validTab =
      changedTabIdx !== -1 ? tabNames[changedTabIdx] : tabNames[0];

    setActiveTab(validTab);
  }, [url, urlQueryStr, tabNames]);
  useEffect(() => {
    if (!!errorFeed) {
      setAlertMessage(errorFeed, { type: "error", openDuration: 4000 });
    }
  }, [errorFeed]);

  const handleTabChange = useCallback(
    (event, activeTabName) => {
      const restoreTabPgConfig = (function () {
        try {
          const savedTabPg = JSON.parse(
            sessionStorage.getItem(activeTabName + "-pagination") // Get tbl pagination config for a specific Tab
          );
          return savedTabPg;
        } catch (error) {
          return null;
        }
      })();

      let qs = "";
      if (restoreTabPgConfig) {
        const queryStrings = [
          { name: "tab", value: activeTabName }, // Necessary for changing tab
          {
            name: "page",
            value: restoreTabPgConfig.page,
          },
          {
            name: "rows",
            value: restoreTabPgConfig.rows,
          },
        ];
        qs = createQS(undefined, [...queryStrings]);
      } else {
        qs = createQS(undefined, [{ name: "tab", value: activeTabName }]);
      }

      const newUrl = pathname + qs;

      router.push(newUrl);
    },
    [router]
  );

  return (
    <>
      <Typography variant="h5">Merchants</Typography>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="merchant listing tabs"
            >
              <Tab label="Staging" value={tabNames[0]} />
              <Tab label="Onboarding" value={tabNames[1]} />
              <Tab label="Approved" value={tabNames[2]} />
            </TabList>
          </Box>

          <TabPanel value={tabNames[0]}>
            <StagingMerchants
              tabId={tabNames[0]} // used to remember tbl pagination config
              tblPayload={tblPayload}
              paginationData={paginationData}
            />
          </TabPanel>
          <TabPanel value={tabNames[1]}>
            <OnboardingMerchants
              tabId={tabNames[1]}
              tblPayload={tblPayload}
              paginationData={paginationData}
            />
          </TabPanel>
          <TabPanel value={tabNames[2]}>
            <ApprovedMerchants
              tabId={tabNames[2]}
              tblPayload={tblPayload}
              paginationData={paginationData}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default Merchants;
