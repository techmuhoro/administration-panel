import MerchantsDetail from "@/components/merchants/detail";
import http from "@/http";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import { getCacheBusinessTypes } from "@/lib/cached-util-apis";

export default async function Page({ params, searchParams }) {
  const { id: merchantId } = params || {};
  const { ms: merchantStatus } = searchParams || {};
  // const cookieStore = cookies();

  // const globalContry = searchParams.ac || cookieStore.get("ac")?.value || "KE";
  let merchantsDetail = null;
  let errorFeed = "";

  // const requestParams = {
  //   country: globalContry,
  //   ms: searchParams.ms || "approved"
  // };

  const utils = {
    businessTypes: await getCacheBusinessTypes()
  };

  try {
    const url =
      merchantStatus === "staging"
        ? `/merchants/staging/${merchantId}`
        : `/merchants/${merchantId}`;

    const response = await http({ url, includeAuthorization: true }).then(
      (res) => res.data
    );

    // set the merchant data
    merchantsDetail = response?.data;
  } catch (error) {
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
