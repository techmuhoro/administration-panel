import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import PopoverMenuBtn from "@/atoms/PopoverMenuBtn";

function ActionsCell({ rowData }) {
  return (
    <PopoverMenuBtn renderMenu={<ActionsList />} buttonComponent={IconButton}>
      <MoreHorizIcon />
    </PopoverMenuBtn>
  );
}

export default ActionsCell;

function ActionsList() {
  return (
    <MenuList>
      <MenuItem>Hello 1</MenuItem>
      <MenuItem>Hello 2</MenuItem>
      <MenuItem>Hello 3</MenuItem>
    </MenuList>
  );
}
