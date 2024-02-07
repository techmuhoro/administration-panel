import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import IpayLogo from "@/assets/ipay-logo.png";
import Stack from "@mui/material/Stack";
import { asideMenuItems } from "./items";
import MenuItem from "./menu-item";
import DropdownMenuItem from "./dropdown-menu-item";

export default function Aside() {
  return (
    <Box sx={{ height: "100%" }}>
      {/**Aside header */}
      <Box
        component={"header"}
        sx={{
          height: "20%",
          // border: "1px solid red",
          mb: 4,
        }}
      >
        <Stack
          sx={{ height: "100%" }}
          alignItems={"center"}
          justifyContent="center"
          rowGap={1}
        >
          <Box
            sx={{
              width: "50%",
              height: "50%",
              position: "relative",
            }}
          >
            <Image src={IpayLogo} fill alt="Logo" />
          </Box>

          <Typography
            component={"h1"}
            sx={{ fontWeight: "500", fontSize: "1.2rem" }}
          >
            Administration
          </Typography>
        </Stack>
      </Box>

      {/** Menu items */}
      <Stack rowGap={1.5} sx={{}}>
        {asideMenuItems.map((item) =>
          item.links ? (
            <DropdownMenuItem key={item.key} menuItem={item} />
          ) : (
            <MenuItem key={item.key} menuItem={item} />
          )
        )}
      </Stack>
    </Box>
  );
}
