"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginData } from "@/lib/redux/auth2/otplogin-slice";
import Cookies from "js-cookie";

export default function GlobalCountry() {
  const [country, setCountry] = useState("");
  const loginData = useSelector(getLoginData);
  const opCountries = loginData?.includes?.opCountries || [];
  const userCountry = loginData?.attributes?.country;

  // set the user country initial load
  // check the cookie first or default to the user login data
  useEffect(() => {
    let country = Cookies.get("global-country") || userCountry || "KE";

    setCountry(country);
  }, [userCountry]);

  const selectList = opCountries.map((country) => ({
    id: country?.id || "",
    label: country?.attributes?.iso || "",
  }));

  return (
    <>
      <select
        style={{ border: "none", background: "transparent" }}
        onChange={() => {}}
      >
        {selectList?.map((country) => (
          <option key={country.id}>{country.label}</option>
        ))}
      </select>
    </>
  );
}
