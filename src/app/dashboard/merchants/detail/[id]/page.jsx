import MerchantsDetail from "@/components/merchants/detail";
import http from "@/http";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { getCacheBusinessTypes } from "@/lib/cached-util-apis";
import { cookies } from "next/headers";

export default async function Page({ params, searchParams }) {
  const { id: merchantId } = params || {};
  const cookieStore = cookies();

  const globalContry = searchParams.ac || cookieStore.get("ac")?.value || "KE";
  let merchantsDetail = null;
  let errorFeed = "";

  const requestParams = {
    country: globalContry,
    ms: searchParams.ms || "approved"
  };

  const utils = {
    businessTypes: await getCacheBusinessTypes()
  };

  try {
    const response = await http({
      method: "GET",
      url: `/merchants/${merchantId}`,
      includeAuthorization: true,
      params: requestParams
    }).then((res) => res.data);

    // set the merchant data
    merchantsDetail = response?.data;
  } catch (error) {
    console.log(error);
    errorFeed = error?.httpMessage || "Error could not fetch merchant details";
  }

  return (
    <DashboardContentWrapper breadcrumbOmit={["detail"]}>
      <MerchantsDetail
        data={merchantsDetail}
        errorFeed={errorFeed}
        utils={utils}
      />
    </DashboardContentWrapper>
  );
}
