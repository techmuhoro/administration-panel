// URL-> https://adm-dash-v2.ipayprojects.com/api/departments
// Requires Authentication

import { cache } from "react";
import { cookies } from "next/headers";
import axios from "axios";

import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";
import DepartmentsTbl from "./tbl/departments-tbl";
import { columns } from "./tbl/columns";

const config = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
  method: "GET",
};

const getDepts = cache(async (url) => await axios({ ...config, url }));
// const getDepts = cache(async (url) => {
//   await new Promise((resolve, reject) => {
//     setTimeout(async () => {
//       resolve("data");
//     }, 7000);
//   });

// const data = await axios({ ...config, url });

//   return "data";
// });

async function Departments({ searchParams }) {
  let tblData = [];
  let paginationData = {};

  const searchQueryParams = {
    limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
    page: parseInt(searchParams?.page, 10) || 1,
    ...(searchParams?.from && { from: searchParams.from }),
    ...(searchParams?.to && { to: searchParams.to }),
  };

  // let endpoint = "";

  try {
    const authTkn = cookies().get("token").value;
    config.headers = {
      Authorization: `Bearer ${authTkn}`,
    };

    const urlSearchQueryString = new URLSearchParams(
      searchQueryParams
    ).toString();
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}departments?${urlSearchQueryString}`;
    // const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`;

    const deptsResponse = await getDepts(endpoint).then((res) => res.data);
    tblData = deptsResponse?.data?.data;

    console.log(JSON.stringify(tblData, null, 2));

    paginationData = {
      count: deptsResponse?.data?.total || 0,
      currentPage: deptsResponse?.data?.current_page || 0,
      totalPages: deptsResponse?.data?.total || 0,
      rowsPerPage: deptsResponse?.data?.limit || 0,
    };
    console.log({ paginationData });
  } catch (err) {
    console.log("Error fetching departments");
    paginationData = {
      count: 0,
      currentPage: 0,
      totalPages: 0,
      rowsPerPage: 0,
    };
  }

  return (
    <>
      <DepartmentsTbl
        data={tblData}
        columnTraits={columns}
        paginationData={paginationData}
      />
    </>
  );
}

export default Departments;
