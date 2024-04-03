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
 * @param {Object} props.tblPayload - Payload Containing table Data
 * @param {string} props.errorFeed - Error message, if any, that occured while getting merchants
 * @param {Pagination} props.paginationData - Data to paginate in the table
 * @returns
 */
function Merchants({ tblPayload, errorFeed, paginationData }) {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const router = useRouter();
  const pathname = usePathname();
  const urlQuery = useSearchParams();
  const urlQueryStr = urlQuery.toString();
  const setAlertMessage = useNotifyAlertCtx();

  const url = useMemo(
    () => `${pathname}${urlQueryStr.length ? "?" + urlQueryStr : ""}`,
    [pathname, urlQueryStr]
  );

  useLayoutEffect(() => {
    const initialUrlQuery = new URLSearchParams(urlQueryStr);
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

  const createQS = useCallback(
    /**
     * Builds query string and returns it. A Question mark is prepended.
     * @param {string} [queryString] The URL query string to add new entry.
     * @param {Object[]} entries New entries to add to url Query string
     * @param {string} entries[].name The name of the query string field to add, i.e &__name__=_value_
     * @param {string} entries[].value The value for `name` in query string, i.e &_name_=__value__
     * @returns {string}
     */
    (queryString, entries = [{ name: "", value }]) => {
      try {
        const newUrlQuery = new URLSearchParams(queryString || undefined);
        entries.forEach((entry) => {
          const hasName = !!entry.name || entry.name === 0;
          const hasValue = !!entry.value || entry.value === 0;
          if (hasName && hasValue) {
            newUrlQuery.set(entry.name, entry.value);
          }
        });

        const newQueryStr = `${newUrlQuery?.toString()?.length ? "?" + newUrlQuery.toString() : ""}`;

        return newQueryStr;
      } catch (error) {
        return "";
      }
    },
    []
  );

  const handleTabChange = (event, newValue) => {
    const reinstateTabPagination = (function () {
      try {
        const savedTabPg = JSON.parse(
          sessionStorage.getItem(newValue + "-pagination") // Get pagination filters persisted for a specific Tab
        );
        return savedTabPg;
      } catch (error) {
        return null;
      }
    })();

    let qs = "";
    if (reinstateTabPagination) {
      const queryStrings = [
        { name: "tab", value: newValue }, // Necessary for changing tab
        {
          name: "page",
          value: reinstateTabPagination.page,
        },
        {
          name: "rows",
          value: reinstateTabPagination.rows,
        },
      ];
      qs = createQS(urlQueryStr, [...queryStrings]);
    } else {
      qs = createQS(undefined, [{ name: "tab", value: newValue }]);
    }

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
              tabId="staging-merchants" // used to remember pagiantion config tab
              tblPayload={tblPayload}
              paginationData={paginationData}
            />
          </TabPanel>
          <TabPanel value="onboarding-merchants">
            <OnboardingMerchants
              tabId="onboarding-merchants"
              tblPayload={tblPayload}
              paginationData={paginationData}
            />
          </TabPanel>
          <TabPanel value="approved-merchants">
            <ApprovedMerchants
              tabId="approved-merchants"
              tblPayload={tblPayload}
              paginationData={paginationData}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </DashboardContentWrapper>
  );
}

export default Merchants;
