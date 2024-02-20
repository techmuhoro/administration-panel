"use client";

import RoleForm from "../form";

const data = {
  name: "DevOps Lead",
  department: "DevOps",
  description: "This as short message",
};
export default function RolesUpdate({ role, departments }) {
  function handleSubmit() {
    console.log("updating...");
  }

  return (
    <RoleForm
      handleSubmit={handleSubmit}
      data={role}
      departments={departments}
      isUpdate={true}
    />
  );
}
