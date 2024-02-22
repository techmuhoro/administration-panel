// "use client";

import { Box, Typography } from "@mui/material";

function UserAgentCell({ data }) {
  const browser = data.cell?.browser;
  const os = data.cell?.os;
  const uaString = data.cell?.uaStr;

  // console.log({ "cell-Data": data });
  return (
    <Box>
      {browser && (
        <Typography variant="body2">
          <Typography variant="caption" sx={{ marginRight: "4px" }}>
            Browser:
          </Typography>
          {browser}
        </Typography>
      )}
      {os && (
        <Typography variant="body2">
          <Typography variant="caption" sx={{ marginRight: "4px" }}>
            OS:
          </Typography>
          {os}
        </Typography>
      )}
      {!os && !browser && <Typography variant="caption">{uaString}</Typography>}
    </Box>
  );
}

export default UserAgentCell;
