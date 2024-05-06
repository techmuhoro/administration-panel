import MerchantsDetail from "@/components/merchants/detail";
import http from "@/http";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { cookies } from "next/headers";

export default async function Page({ params, searchParams }) {
  const { id: merchantId } = params || {};
  const cookieStore = cookies();

  const globalContry = searchParams.ac || cookieStore.get("ac")?.value || "KE";
  let merchantsDetail = null;
  let errorFeed = "";

  const requestParams = {
    country: globalContry,
    ms: searchParams.ms || "approved",
  };

  try {
    const response = await http({
      method: "GET",
      url: `/merchants/${merchantId}`,
      includeAuthorization: true,
      params: requestParams,
    }).then((res) => res.data);

    // set the merchant data
    merchantsDetail = response?.data;
  } catch (error) {
    errorFeed = error?.httpMessage || "Error could not fetch merchant details";
  }

  return (
    <DashboardContentWrapper breadcrumbOmit={["detail"]}>
      <MerchantsDetail data={merchantsDetail} errorFeed={errorFeed} />
    </DashboardContentWrapper>
  );
}
