import { handleFetchData } from "@/apis";
import AuditTrailTbl from "./audit-trail-tbl";
import { sampleData } from "./sample-data";
import { columns } from "./tbl-traits/columns";

export default async function AuditTrail() {
  let data = [];
  try {
    data = await handleFetchData("admin/audit/logs");
    console.log("Data retrieved successfully!");
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    data = [];
  }

  return (
    <>
      <AuditTrailTbl data={sampleData} columnTraits={columns} />
    </>
  );
}
