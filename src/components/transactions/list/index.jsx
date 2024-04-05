"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { columns } from "./columns";
import Tab from "@mui/material/Tab";
import StyledContentWrapper from "@/atoms/wrappers/styled-content-wrapper";
import {
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PayinTable from "../transactiontable/payin";
import BillingTable from "../transactiontable/billing";
import SettlementTable from "../transactiontable/settlement";
import PayOut from "../transactiontable/payout";

import { getLoginData } from "@/lib/redux/auth2/otplogin-slice";
import { useSelector } from "react-redux";

export default function TransactionsList({
  data,
  count,
  currentPage,
  rowsPerPage,
  totalPages,
}) {
  const [tab, setTap] = useState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTabs = searchParams.get("tab");

  const loginData = useSelector(getLoginData);
  let Contries = loginData?.includes?.opCountries;

  let operationContries = Contries?.filter(
    (item) => item.attributes.opStatus === 1
  );

  let allContries = operationContries?.map((item) => ({
    label: item.attributes.name,
    value: item.attributes.iso,
  }));

  useEffect(() => {
    setTap(activeTabs);
  });

  const handleChange = (event, newValue) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("tab", newValue);
    queryParams.set("op", newValue);
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  };

  const [formData, setFormData] = useState({
    marchantID: "",
    country: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(
      `transactions?tab=${"pay-in"}&op=pay-in&country=${formData.country}&vid=${formData.marchantID}`
    );
  };

  console.log(formData, "formdat");
  return (
    <Box>
      <Typography component="h1" variant="h5">
        Transactions
      </Typography>

      {activeTabs == null ? (
        <StyledContentWrapper p={3}>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Box>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={6}>
                    <TextField
                      required
                      onChange={handleFormChange}
                      name="marchantID"
                      label="MarchantID/VID"
                      value={formData.marchantID}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      required
                      label="Select country"
                      size="medium"
                      name="country"
                      value={formData.country}
                      style={{ width: "235px", height: "40px" }}
                      onChange={handleFormChange}
                    >
                      {allContries.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
              </Box>

              <Button
                type="submit"
                style={{ width: "235px", height: "40px", marginTop: "20px" }}
                variant="outlined"
              >
                Apply
              </Button>
            </FormControl>
          </form>
        </StyledContentWrapper>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="PayIn" value="pay-in" />
                <Tab label="PayOut" value="pay-out" />
                <Tab label="Billing" value="billing" />
                <Tab label="Settlement" value="settlement" />
              </TabList>
            </Box>
            <TabPanel value="pay-in">
              <PayinTable
                columns={columns}
                data={data}
                count={count}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                totalPages={totalPages}
              />
            </TabPanel>
            <TabPanel value="pay-out">
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
      )}
    </Box>
  );
}
