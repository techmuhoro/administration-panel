"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import { MERCHANT_STATUS_API_NAME } from "@/lib/constants";

function DetailsCell({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const merchantID = data?.id;
  const currentTab = searchParams.get("tab") || "";

  // * Merchant status
  const merchantStatus =
    MERCHANT_STATUS_API_NAME[currentTab] ||
    MERCHANT_STATUS_API_NAME["staging-merchants"];

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
        onClick={() => {
          router.push(`${pathname}/detail/${merchantID}?ms=${merchantStatus}`);
        }}
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
