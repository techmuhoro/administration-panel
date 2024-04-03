import { cookies } from "next/headers";

import MerchantsList from "@/components/merchants";
import http from "@/http";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";

const reqConfig = {
  method: "GET",
  url: "/merchants",
};

const mapToApiName = {
  "approved-merchants": "approved",
  "staging-merchants": "staging",
  "onboarding-merchants": "onboarding",
};

async function Merchants({ searchParams }) {
  const cookieStore = cookies();
  const countryOfMerchants =
    searchParams.ac || cookieStore.get("ac")?.value || "KE";

  let tblPayload = { data: [], designation: "" };
  let paginationData = {
    count: 0,
    currentPage: 0,
    totalPages: 0,
    rowsPerPage: 0,
  };
  let errorFeed = "";

  const searchQueryParams = {
    limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
    page: parseInt(searchParams?.page, 10) || 1,
    ms: mapToApiName[searchParams?.tab] || mapToApiName["staging-merchants"],
    country: countryOfMerchants,
  };
  const calcTotalPages = (perPageDataCount, dataCount) =>
    Math.ceil(dataCount / perPageDataCount);

  try {
    const merchantsResponse = await http({
      ...reqConfig,
      includeAuthorization: true,
      params: { ...searchQueryParams },
    }).then((res) => {
      return res.data;
    });

    const tabDataDesignation = Object.keys(mapToApiName).find(
      (tabname) => mapToApiName[tabname] === searchQueryParams.ms
    );
    tblPayload = {
      data: merchantsResponse?.data?.data,
      designation: tabDataDesignation,
    };

    // console.log({ tblPayload });

    const dataCount = parseInt(merchantsResponse?.data?.total) || 0;
    const perPageDataCount = parseInt(merchantsResponse?.data?.limit) || 0;

    paginationData = {
      count: dataCount,
      currentPage: merchantsResponse?.data?.current_page || 0,
      totalPages: calcTotalPages(perPageDataCount, dataCount),
      rowsPerPage: perPageDataCount,
    };
  } catch (error) {
    errorFeed =
      error?.httpMessage || "An error Occured while getting Merchants";
  }

  return (
    <MerchantsList
    tblPayload={tblPayload}
      errorFeed={errorFeed}
      paginationData={paginationData}
    />
  );
}

export default Merchants;
