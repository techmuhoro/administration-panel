import { usePathname, useRouter } from "next/navigation";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";

function ActionsCell({ data }) {
  return (
    <PopoverMenuBtn
      renderMenu={<ActionsList merchantID={data?.id} />}
      buttonComponent={IconButton}
    >
      <MoreHorizIcon />
    </PopoverMenuBtn>
  );
}

export default ActionsCell;

function ActionsList({ merchantID }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <MenuList>
      <MenuItem onClick={() => router.push(`${pathname}/detail/${merchantID}`)}>
        Detail
      </MenuItem>
    </MenuList>
  );
}
