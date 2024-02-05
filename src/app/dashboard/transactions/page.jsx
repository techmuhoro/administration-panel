import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import ReusableTable from "@/atoms/reusable-table";

export default function Page() {
  return (
    <DashboardContentWrapper>
      <p>Hello from Transactions</p>

      <ReusableTable />
    </DashboardContentWrapper>
  );
}
