import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";

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
    <ul>
      <li>Hello 1</li>
      <li>Hello 2</li>
      <li>Hello 3</li>
    </ul>
  );
}
