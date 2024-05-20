import http from "@/http";
import { unstable_cache as cache } from "next/cache";

export const getCachedBusinessTypes = cache(
  async () => {
    try {
      const response = await http({
        url: `/utils/business-type`,
        includeAuthorization: true
      }).then((res) => res.data);

      return Array.isArray(response?.data) ? response?.data : [];
    } catch (error) {
      return [];
    }
  },
  "util-business-types",
  {
    revalidate: 3 * 60 // 3 MINUTES
  }
);

export const getCachedIndustries = cache(
  async () => {
    try {
      const response = await http({
        url: `/utils/business-industries`,
        includeAuthorization: true
      }).then((res) => res.data);

      return Array.isArray(response?.data?.message)
        ? response?.data?.message
        : [];
    } catch (error) {
      return [];
    }
  },
  "util-industries",
  {
    revalidate: 3 * 60
  }
);

export const getCachedCountries = cache(
  async () => {
    try {
      const response = await http({
        url: `/utils/countries`,
        includeAuthorization: true
      }).then((res) => res.data);

      return Array.isArray(response?.data) ? response?.data : [];
    } catch (error) {
      return [];
    }
  },
  "util-countries",
  {
    revalidate: 3 * 60 // After 3 minutes day
  }
);

export const getCachedCountryCurrencies = cache(
  async () => {
    try {
      const response = await http({
        url: `/utils/currencies`,
        includeAuthorization: true,
        params: {
          op: "country"
        }
      }).then((res) => res.data);

      return Array.isArray(response?.data) ? response?.data : [];
    } catch (error) {
      return [];
    }
  },
  "util-country-currencies",
  {
    revalidate: 3 // 3 minutes
  }
);

export const getCachedBusinessOwnerTypes = cache(
  async () => {
    try {
      const response = await http({
        url: `/utils/business-owner`,
        includeAuthorization: true
      }).then((res) => res.data);

      return Array.isArray(response?.data) ? response?.data : [];
    } catch (error) {
      return [];
    }
  },
  "util-business-owner-types",
  {
    revalidate: 3 * 60
  }
);
