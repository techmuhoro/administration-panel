"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import StagingMerchants from "./stagingMerchants";
import OnboardingMerchants from "./onboardingMerchants";
import ApprovedMerchants from "./approvedMerchants";
import { useNotifyAlertCtx } from "../notify-alert/notify-alert-context";

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
 * @param {Object} props.tblData - Data to display in table
 * @param {string} props.errorFeed - Error message, if any, that occured while getting merchants
 * @param {Pagination} props.paginationData - Data to paginate in the table
 * @returns
 */
function Merchants({ tblData, errorFeed, paginationData }) {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = useSearchParams();
  const setAlertMessage = useNotifyAlertCtx();

  const url = useMemo(
    () =>
      `${pathname}${urlQuery.toString().length ? "?" + urlQuery.toString() : ""}`,
    [pathname, urlQuery.toString]
  );

  useLayoutEffect(() => {
    const initialUrlQuery = new URLSearchParams(urlQuery.toString());
    const urlTab = String(initialUrlQuery.get("tab")).toLowerCase();
    const changedTabIdx = tabNames.indexOf(urlTab);

    const validTab =
      changedTabIdx !== -1 ? tabNames[changedTabIdx] : tabNames[0];

    setActiveTab(validTab);
  }, [url]);
  useEffect(() => {
    if (!!errorFeed) {
      setAlertMessage(errorFeed, { type: "error", openDuration: 4000 });
    }
  }, [errorFeed]);

  /** Return Query string with new entry added to existing. Includes Question mark */
  const createQS = useCallback(
    (name, value) => {
      const newUrlQuery = new URLSearchParams(urlQuery.toString());
      newUrlQuery.set(name, value);

      const newQueryStr = `${newUrlQuery?.toString()?.length ? "?" + newUrlQuery.toString() : ""}`;

      return newQueryStr;
    },
    [urlQuery]
  );

  const handleTabChange = (event, newValue) => {
    const qs = createQS("tab", newValue);
    const newUrl = pathname + qs;

    router.push(newUrl);
  };

  return (
    <DashboardContentWrapper>
      <Typography variant="h5">Merchantssss...</Typography>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="merchant listing tabs"
            >
              <Tab label="Staging" value="staging-merchants" />
              <Tab label="Onboarding" value="onboarding-merchants" />
              <Tab label="Approved" value="approved-merchants" />
            </TabList>
          </Box>

          <TabPanel value="staging-merchants">
            <StagingMerchants
              tblData={tblData}
              paginationData={paginationData}
            />
          </TabPanel>
          <TabPanel value="onboarding-merchants">
            <OnboardingMerchants
              tblData={tblData}
              paginationData={paginationData}
            />
          </TabPanel>
          <TabPanel value="approved-merchants">
            <ApprovedMerchants
              tblData={tblData}
              paginationData={paginationData}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </DashboardContentWrapper>
  );
}

export default Merchants;
