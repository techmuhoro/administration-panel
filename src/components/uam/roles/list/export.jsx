"use client";

import ExportButton from "@/atoms/export-button";

export default function RolesExport() {
  const handleExport = (type) => {
    if (type === "pdf") {
      alert("To export in pdf");
      return;
    }
    if (type === "csv") {
      alert("To export in csv");
      return;
    }

    if (type === "xlsx") {
      alert("To export in excel");
      return;
    }
  };

  return <ExportButton handleExport={handleExport} />;
}
