import http from "@/http";
import { unstable_cache as cache } from "next/cache";

export const getCacheBusinessTypes = cache(
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
    revalidate: 30
  }
);

export const TEST = "test"; // TODO delete this line
