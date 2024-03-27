import MerchantsDetail from "@/components/merchants/detail";
import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";

export default function Page({ params }) {
  const { id: merchantId } = params || {};

  return (
    <DashboardContentWrapper breadcrumbOmit={["detail"]}>
      <MerchantsDetail />
    </DashboardContentWrapper>
  );
}
