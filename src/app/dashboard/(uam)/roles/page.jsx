import RolesList from "@/components/uam/roles/list";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import {
  DEFAULT_PAGINATION_DATA,
  DEFAULT_ROWS_PER_PAGE,
} from "@/lib/constants";
import { convertToNumber, filterObject } from "@/lib/utils";
import http from "@/http";

const reqConfig = {
  method: "GET",
  url: "/roles",
};

const filtersWhiteList = ["role", "department", "description", "createdBy"];

export default async function Page({ searchParams }) {
  const { page, rows, ...filters } = searchParams;

  let tblData = [];
  let paginationData = DEFAULT_PAGINATION_DATA;
  let errorFeed = "";

  const applicableFilters = filterObject(filters, filtersWhiteList);

  let urlQuery = {
    ...applicableFilters,
    page: parseInt(searchParams?.page, 10) || 1,
    limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
  };

  try {
    const response = await http({
      ...reqConfig,
      includeAuthorization: true,
      params: {
        ...urlQuery,
      },
    }).then((res) => res.data);

    tblData = response?.data?.data || [];

    const count = parseInt(response?.data?.total, 10) || 0;
    const rowsPerPage = response?.data?.limit || DEFAULT_ROWS_PER_PAGE;

    paginationData = {
      count,
      rowsPerPage,
      currentPage: response?.data?.current_page || 0,
      totalPages: Math.ceil(count / rowsPerPage) || 0,
    };
  } catch (error) {
    errorFeed = error?.httpMessage || "An error occured while getting roles";
  }

  return (
    <DashboardContentWrapper breadcrumbOmit={["uam"]}>
      <RolesList
        tblData={tblData}
        paginationData={paginationData}
        errorFeed={errorFeed}
      />
    </DashboardContentWrapper>
  );
}
