import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Aside from "@/layout/dasboard/aside/aside";
import GlobalStyles from "@mui/material/GlobalStyles";
import DashboardHeader from "@/layout/dasboard/header";

export default function DashboardLayout(props) {
  return (
    <div id="dasboard-layout">
      <GlobalStyles
        styles={{
          "*": {
            padding: "0",
            margin: "0",
            boxSizing: "border-box",
          },
        }}
      />
      <Box>
        <Grid container sx={{ height: "100vh" }}>
          <Aside />

          <Grid xs={12} sm={12} md={9} lg={10}>
            <DashboardHeader />
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
