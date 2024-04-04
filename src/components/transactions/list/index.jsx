"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { columns } from "./columns";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PayinTable from "../transactiontable/payin";
import BillingTable from "../transactiontable/billing";
import SettlementTable from "../transactiontable/settlement";
import PayOut from "../transactiontable/payout";

export default function TransactionsList({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  const [tab, setTap] = useState();
  const router = useRouter();

  console.log(router, "router");
  useEffect(() => {
    setTap("payin");
    //window.location.reload();
  }, [tab]);

  const handleChange = (event, newValue) => {
    setTap(newValue);
    router.push(`transactions?tab=${newValue}`);
  };

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Transactions
      </Typography>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="PayIn" value="payin" />
              <Tab label="PayOut" value="payout" />
              <Tab label="Billing" value="billing" />
              <Tab label="Settlement" value="settlement" />
            </TabList>
          </Box>
          <TabPanel value="payin">
            <PayinTable
              columns={columns}
              data={data}
              count={count}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
            />
          </TabPanel>
          <TabPanel value="payout">
            <PayOut
              columns={columns}
              data={data}
              count={count}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
            />
          </TabPanel>
          <TabPanel value="billing">
            <BillingTable
              columns={columns}
              data={data}
              count={count}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
            />
          </TabPanel>
          <TabPanel value="settlement">
            <SettlementTable
              columns={columns}
              data={data}
              count={count}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              totalPages={totalPages}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
