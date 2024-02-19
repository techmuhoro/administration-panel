import { withAuth } from "@/app/auth/with-auth";

const Page = () => {
  withAuth();
  return "protected";
};

export default Page;
