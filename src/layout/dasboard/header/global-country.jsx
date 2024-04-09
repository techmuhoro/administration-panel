"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginData } from "@/lib/redux/auth2/otplogin-slice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function GlobalCountry() {
  const [country, setCountry] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const loginData = useSelector(getLoginData);
  const opCountries = loginData?.includes?.opCountries || [];
  const userCountry = loginData?.attributes?.country; // country assigned at registration

  //[Temp] isClient is used to remove hydration error
  useEffect(() => {
    setIsClient(true);
  }, []);

  // set the user country on initial load
  // check the cookie first or default to the user login data
  useEffect(() => {
    let defaultCountry = Cookies.get("global-country") || userCountry || "KE";

    setCountry(defaultCountry);
  }, [userCountry]);

  // persist the country to cookie on change
  useEffect(() => {
    if (country) {
      Cookies.set("global-country", country);
      router.refresh();
      console.log("Refreshing");
    }
  }, [country, router]);

  const selectList = opCountries.map((country) => ({
    id: country?.id || "",
    label: country?.attributes?.iso || "",
  }));

  return (
    <>
      {isClient && (
        <select
          style={{ border: "none", background: "transparent" }}
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {selectList?.map((country) => (
            <option key={country.id} value={country.label}>
              {country.label}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
