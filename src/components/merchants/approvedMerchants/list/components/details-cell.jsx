import { usePathname, useRouter } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

function DetailsCell({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const merchantID = data?.id;

  return (
    // <PopoverMenuBtn
    //   renderMenu={<ActionsList merchantID={data?.id} />}
    //   buttonComponent={IconButton}
    // >
    //   <Typography />
    // </PopoverMenuBtn>
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
        onClick={() => router.push(`${pathname}/detail/${merchantID}`)}
      >
        open
      </Button>
    </Tooltip>
  );
}

export default DetailsCell;

// function ActionsList({ merchantID }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   return (
//     <MenuList>
//       <MenuItem onClick={() => router.push(`${pathname}/detail/${merchantID}`)}>
//         Detail
//       </MenuItem>
//     </MenuList>
//   );
// }
