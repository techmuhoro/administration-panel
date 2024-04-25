import PermissionsList from "@/components/uam/permissions/list";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { filterObject } from "@/lib/utils";
import {
  DEFAULT_ROWS_PER_PAGE,
  DEFAULT_PAGINATION_DATA,
} from "@/lib/constants";
import http from "@/http";

const reqConfig = {
  method: "GET",
  url: "/permissions",
};

const filtersWhiteList = ["name", "parentName", "slug", "group"];

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
    errorFeed =
      error?.httpMessage || "An error occured while getting permissions";
  }

  return (
    <DashboardContentWrapper>
      <PermissionsList
        tblData={tblData}
        paginationData={paginationData}
        errorFeed={errorFeed}
      />
    </DashboardContentWrapper>
  );
}
