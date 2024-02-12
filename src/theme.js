"use client"; //does not work on the server
import { Roboto, Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#124c9d", // bluish
    },
    secondary: {
      main: "#f68c1e",
    },
    border: {
      main: grey[300],
    },
    textAccent: {
      main: "#18181B",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },

    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
});

export default theme;
