"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

import ExportButton from "@/atoms/export-button";

const authTkn = Cookies.get("token");
const config = {
  url: `${process.env.NEXT_PUBLIC_API_BASE_URL}audit/export`,
  method: "GET",
  headers: {
    Authorization: `Bearer ${authTkn}`,
  },
};

export default function AuditsExport() {
  console.log({ config });
  async function handleExport({ from, to, format }) {
    // console.log("Handle Export called with these values: ", {
    //   from,
    //   to,
    //   format,
    // });
    config.params = { from, to, format };
    config.responseType = "blob";
    try {
      const response = await axios(config);

      const url = window.URL.createObjectURL(new Blob([response.data]));

      return [format, url];
    } catch (error) {
      console.log("Handle Export func Encountered an Error!");
      throw new Error(error);
    }
  }

  return <ExportButton handleExport={handleExport} />;
}
