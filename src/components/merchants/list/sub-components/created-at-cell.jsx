import { format } from "date-fns";
import Box from "@mui/material/Box";

function CreatedAtCell({ rowData }) {
  const date = rowData?.attributes?.createdAt || null;
  const dateObj = new Date(date);

  return (
    <>
      <Box component="span" sx={{ typography: "body2", display: "block" }}>
        {format(dateObj, "MMM do yyyy")}
      </Box>
      <Box
        component="span"
        sx={{ typography: "caption", display: "block", fontStyle: "italic" }}
      >
        {format(dateObj, "hh:mm bb")}
      </Box>
    </>
  );
}

export default CreatedAtCell;
