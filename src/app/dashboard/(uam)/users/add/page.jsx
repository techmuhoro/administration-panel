import DashboardContentWrapper from "@/layout/dasboard/dashboard-content-wrapper";
import AddUser from "@/components/uam/users/add";
import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";

//get role
async function getRoleAndDepartment(url1, url2, token) {
  try {
    const responsePromise1 = fetch(url1, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const responsePromise2 = fetch(url2, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const [response1, response2] = await Promise.all([
      responsePromise1,
      responsePromise2,
    ]);

    const data = await response1.json();
    const derpermentData = await response2.json();

    return {
      data,
      derpermentData,
      error: !response1.ok || !response2.ok,
    };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}

const roleUrl = `${BASE_URL}roles`;
const departmentUrl = `${BASE_URL}departments`;
const authToken = cookies().get("token").value;

const { data, derpermentData } = await getRoleAndDepartment(
  roleUrl,
  departmentUrl,
  authToken
);

let roles = data?.data?.data || [];
let derperment = derpermentData?.data?.data || [];

export default async function Page() {
  return (
    <DashboardContentWrapper>
      <AddUser data={roles} derp={derperment} />
    </DashboardContentWrapper>
  );
}
