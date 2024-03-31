import { cache } from "react";

import http from "@/http";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import DepartmentsList from "@/components/departments";
import { columns } from "@/components/departments/list/columns";

const config = {
  url: "/departments",
  method: "GET",
};

const getDepts = cache((url) =>
  http({ ...config, url, includeAuthorization: true })
);

async function Departments({ searchParams }) {
  let tblData = [];
  let paginationData = {};
  let errorFeed = { error: false, msg: "" };

  const searchQueryParams = {
    limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
    page: parseInt(searchParams?.page, 10) || 1,
    ...(searchParams?.deptName && { name: searchParams.deptName }),
  };

  try {
    const urlSearchQueryString = new URLSearchParams(
      searchQueryParams
    ).toString();
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}departments?${urlSearchQueryString}`;

    const deptsResponse = await getDepts(endpoint).then((res) => res?.data);
    tblData = deptsResponse?.data?.data;

    paginationData = {
      count: deptsResponse?.data?.total || 0,
      currentPage: deptsResponse?.data?.current_page || 0,
      totalPages: deptsResponse?.data?.total || 0,
      rowsPerPage: deptsResponse?.data?.limit || 0,
    };
  } catch (err) {
    const errorMsg =
      err.httpMessage || "An error occured while retrieving departments";

    errorFeed = { error: true, msg: errorMsg };

    paginationData = {
      count: 0,
      currentPage: 0,
      totalPages: 0,
      rowsPerPage: 0,
    };
  }

  return (
    <DepartmentsList
      columnTraits={columns}
      tblData={tblData}
      errorFeed={errorFeed}
      paginationData={paginationData}
    />
  );
}

export default Departments;
