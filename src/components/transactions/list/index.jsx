"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TransactionsFilter from "./filter";
import TransactionsExport from "./export";
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
  const [value, setValue] = useState("payin");
  const router = useRouter();

  useEffect(() => {
    //window.location.reload();
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.push(`transactions?${newValue}`);
  };

  return (
    <Box>
      <Typography component="h1" variant="h5">
        Transactions
      </Typography>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
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
