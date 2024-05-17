import MerchantsDetail from "@/components/merchants/detail";
import http from "@/http";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import {
  getCachedBusinessTypes,
  getCachedBusinessOwnerTypes,
  getCachedCountries,
  getCachedIndustries,
  getCachedCountryCurrencies
} from "@/lib/cached-util-apis";

export default async function Page({ params, searchParams }) {
  const { id: merchantId } = params || {};
  const { ms: merchantStatus } = searchParams || {};

  let merchantsDetail = null;
  let errorFeed = "";

  const utils = {
    businessTypes: await getCachedBusinessTypes(),
    countries: await getCachedCountries(),
    countryCurrencies: await getCachedCountryCurrencies(),
    industries: await getCachedIndustries(), // categories and sub categories
    shareHolderTypes: await getCachedBusinessOwnerTypes()
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
