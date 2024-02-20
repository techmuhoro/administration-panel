import axios from "axios";
import { cookies } from "next/headers";
import UAParser from "ua-parser-js";

import AuditTrailTbl from "./audit-trail-tbl";
import { sampleData } from "./sample-data";
import { columns } from "./tbl-traits/columns";
import { DEFAULT_ROWS_PER_PAGE } from "@/lib/constants";

const authTkn = cookies().get("token").value;
const config = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}audit/logs`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${authTkn}`,
  },
};

export default async function AuditTrail({ searchParams }) {
  let tblData = [];
  let paginationData = {};

  try {
    config.params = {
      limit: parseInt(searchParams?.rows, 10) || DEFAULT_ROWS_PER_PAGE,
      page: parseInt(searchParams?.page, 10) || 1,
    };
    const dataResponse = await axios(config).then((res) => res.data);

    const auditInfoResults = dataResponse.data.data;
    paginationData = {
      count: dataResponse.data.total,
      currentPage: dataResponse.data.current_page,
      totalPages: dataResponse.data.total,
      rowsPerPage: dataResponse.data.limit,
    };

    tblData = auditInfoResults.reduce((accm, currentVal) => {
      const uaStr = currentVal.attributes.userAgent;
      const parsedResults = new UAParser(uaStr).getResult();
      const newValue = {
        ...currentVal.attributes,
        userAgent: {
          uaStr: parsedResults.ua,
          browser:
            parsedResults.browser.name + " V" + parsedResults.browser.version,
          os: parsedResults.os.name + " " + parsedResults.os.version,
        },
      };

      accm.push(newValue);

      return accm;
    }, []);
  } catch (err) {
    console.log(err);
    tblData = [];
    paginationData = {
      count: 0,
      currentPage: 0,
      totalPages: 0,
      rowsPerPage: 0,
    };
  }

  return (
    <AuditTrailTbl
      data={tblData}
      columnTraits={columns}
      paginationData={paginationData}
    />
  );
}
