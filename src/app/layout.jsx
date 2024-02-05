import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Providers } from "@/lib/provider";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { StyledEngineProvider } from "@mui/material/styles";

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>{props.children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
