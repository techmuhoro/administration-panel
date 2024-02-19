//with-auth.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const withAuth = () => {
  const cookiesList = cookies();
  const hasCookie = cookiesList.has("iPayAdmin");
  if (hasCookie) {
    redirect("/");
  }
};
