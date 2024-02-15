"use client";

import RoleForm from "../form";

export default function RolesAdd() {
  function handleSubmit() {
    console.log("submiting...");
  }
  return <RoleForm handleSubmit={handleSubmit} data={null} isUpdate={false} />;
}
