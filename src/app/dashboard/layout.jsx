import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Aside from "@/layout/dasboard/aside";
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
          <Grid
            sm={0}
            md={4}
            lg={2}
            sx={{
              borderRight: `1px solid gray`,
              px: 2,
            }}
          >
            <Aside />
          </Grid>

          <Grid sm={12} md={8} lg={10}>
            <DashboardHeader />
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
