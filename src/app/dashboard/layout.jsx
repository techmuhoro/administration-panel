import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Aside from "@/layout/dasboard/aside/aside";
import GlobalStyles from "@mui/material/GlobalStyles";
import DashboardHeader from "@/layout/dasboard/header";

export const metadata = {
  title: "Admin Panel",
  description: "eLipa / iPay Administration portal",
};

export default function DashboardLayout(props) {
  return (
    <>
      <GlobalStyles
        styles={{
          "*": {
            padding: "0",
            margin: "0",
            boxSizing: "border-box",
          },
        }}
      />

      <Grid
        container
        sx={{
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Aside />

        <Grid
          xs={12}
          sm={12}
          md={9}
          lg={10}
          sx={{ overflowY: "scroll", maxHeight: "100vh" }}
        >
          <DashboardHeader />
          {props.children}
        </Grid>
      </Grid>
    </>
  );
}
