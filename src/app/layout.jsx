import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "@/lib/provider";
import theme from "@/theme";
import { Suspense } from "react";

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body style={{ color: "#18181B" }}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Suspense>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Providers>{props.children}</Providers>
            </ThemeProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
