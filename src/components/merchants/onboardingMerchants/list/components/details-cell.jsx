import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

function DetailsCell({ rowData }) {
  return (
    <Tooltip
      title={<Typography variant="caption">Open merchant details</Typography>}
      arrow
      placement="top-start"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -8],
              },
            },
          ],
        },
      }}
    >
      <Button
        variant="text"
        startIcon={<InfoIcon />}
        size="small"
      >
        open
      </Button>
    </Tooltip>
  );
}

export default DetailsCell;

// function ActionsList() {
//   return (
//     <MenuList>
//       <MenuItem>Hello 1</MenuItem>
//       <MenuItem>Hello 2</MenuItem>
//       <MenuItem>Hello 3</MenuItem>
//     </MenuList>
//   );
// }
