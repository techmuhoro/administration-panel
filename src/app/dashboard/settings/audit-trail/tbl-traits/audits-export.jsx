"use client";

import axios from "axios";
import Cookies from "js-cookie";

import ExportButton from "./export-btn";

const authTkn = Cookies.get("token");
const config = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}audit/export`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${authTkn}`,
  },
};

function AuditsExport() {
  async function handleExport({ from, to, format }) {
    config.params = { from, to, format };
    config.responseType = "blob";
    try {
      const response = await axios(config);

      const url = window.URL.createObjectURL(new Blob([response.data]));

      return [format, url];
    } catch (error) {
      throw new Error(error);
    }
  }

  return <ExportButton handleExport={handleExport} />;
}

export default AuditsExport;
