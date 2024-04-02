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
  let tblData = [];
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
    ...(searchParams?.ac && { country: searchParams.ac }),
    ...(searchParams?.tab && { ms: mapToApiName[searchParams.tab] }),
  };

  try {
    const merchantsResponse = await http({
      ...reqConfig,
      includeAuthorization: true,
      params: { ...searchQueryParams },
    }).then((res) => {
      return res.data;
    });

    tblData = merchantsResponse?.data?.data;
    paginationData = {
      count: merchantsResponse?.data?.total || 0,
      currentPage: merchantsResponse?.data?.current_page || 0,
      totalPages: merchantsResponse?.data?.total || 0,
      rowsPerPage: merchantsResponse?.data?.limit || 0,
    };
  } catch (error) {
    errorFeed =
      error?.httpMessage || "An error Occured while getting Merchants";
  }

  return (
    <MerchantsList
      tblData={tblData}
      errorFeed={errorFeed}
      paginationData={paginationData}
    />
  );
}

export default Merchants;
