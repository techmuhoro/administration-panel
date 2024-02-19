import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import UsersList from "@/components/uam/users";

let data = [
  {
    fullname: "Velvet Djekovic",
    email: "albertndege2@gmail.com",
    role: "Admin",
    details: "2210",
    status: "pending2",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
  {
    fullname: "Desdemona Braikenridge",
    email: "jamespickford",
    role: "Admin",
    details: "2210",
    status: "pending",
  },
];

export default async function Page({ searchParams }) {
  return (
    <DashboardContentWrapper breadcrumbOmit={["uam"]}>
      <UsersList data={data} />
    </DashboardContentWrapper>
  );
}
