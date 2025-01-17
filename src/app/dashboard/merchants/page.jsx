import { cookies } from "next/headers";

import MerchantsList from "@/components/merchants";
import http, { Err } from "@/http";
import {
  DEFAULT_PAGINATION_DATA,
  DEFAULT_ROWS_PER_PAGE,
  MERCHANT_STATUS_API_NAME
} from "@/lib/constants";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";

const calcTotalPages = (perPageDataCount, dataCount) =>
  Math.ceil(dataCount / perPageDataCount);

async function Merchants({ searchParams }) {
  const cookieStore = cookies();
  const countryOfMerchants =
    searchParams.ac || cookieStore.get("ac")?.value || "KE";

  let tblPayload = { data: [], designation: "" }; // Format changed so data is designated for a specific tab
  let paginationData = DEFAULT_PAGINATION_DATA;
  let errorFeed = "";
  let DYNAMIC_ENDPOINT = "/merchants";

  const searchQueryParams = {
    limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
    page: parseInt(searchParams?.page, 10) || 1,
    ms:
      MERCHANT_STATUS_API_NAME[searchParams?.tab] ||
      MERCHANT_STATUS_API_NAME["staging-merchants"],
    country: countryOfMerchants
  };

  if (searchQueryParams.ms === MERCHANT_STATUS_API_NAME["staging-merchants"]) {
    DYNAMIC_ENDPOINT = "/merchants/staging";

    delete searchQueryParams.ms;
  }

  try {
    const merchantsResponse = await http({
      method: "GET",
      url: DYNAMIC_ENDPOINT,
      includeAuthorization: true,
      params: { ...searchQueryParams }
    }).then((res) => res.data);

    const tabDataDesignation = Object.keys(MERCHANT_STATUS_API_NAME).find(
      (tabname) => MERCHANT_STATUS_API_NAME[tabname] === searchQueryParams.ms
    );

    tblPayload = {
      data: merchantsResponse?.data?.data,
      designation: tabDataDesignation
    };

    const dataCount = parseInt(merchantsResponse?.data?.total, 10) || 0;
    const perPageDataCount =
      parseInt(merchantsResponse?.data?.limit, 10) || DEFAULT_ROWS_PER_PAGE;

    paginationData = {
      count: dataCount,
      currentPage: merchantsResponse?.data?.current_page || 0,
      totalPages: calcTotalPages(perPageDataCount, dataCount),
      rowsPerPage: perPageDataCount
    };
  } catch (error) {
    errorFeed =
      error instanceof Err
        ? error.httpMessage
        : "An error Occured while getting Merchants";
  }

  return (
    <DashboardContentWrapper>
      <MerchantsList
        tblPayload={tblPayload}
        errorFeed={errorFeed}
        paginationData={paginationData}
      />
    </DashboardContentWrapper>
  );
}

export default Merchants;

export const metadata = {
  title: "Merchants"
};
