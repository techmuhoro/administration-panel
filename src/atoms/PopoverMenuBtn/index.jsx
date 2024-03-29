"use client";

import {
  isValidElement,
  useCallback,
  useState,
  useRef,
  createElement,
} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";

/**
 * @typedef {import("react").JSX.Element} ReactElement
 * @typedef {import("@mui/material").ButtonProps} MuiBtnProps
 */

/**
 * renderMenu function.
 * @callback RenderMenuFn
 * @param {Object} props
 * @param {function} props.closeMenu - When called closes menu.
 * @param {boolean} props.menuOpen - Conveys opened status of the menu.
 * @returns {ReactElement}
 */

/**
 * @typedef {object} BtnProps
 * @property {string} [title] - Title to show on floating menu
 * @property {string} [text] - Text to dispaly in the button
 * @property {(RenderMenuFn | ReactElement)} renderMenu - The content to show on the floating Menu.
 *
 * If a function is given, __object__ with _`closeMenu`_ and _`menuOpen`_ properties is passed as argument.
 * @property {ReactElement} [icon] - Icon to show on the button
 * @property {function} [onClose] - Function called when menu closes
 *
 * @typedef {MuiBtnProps & BtnProps} PopoverMenuBtnProps
 */

/**
 * Renders Button with a controlled a floating menu
 * @param {PopoverMenuBtnProps} props
 * @returns {ReactElement}
 */
const PopoverMenuBtn = (props) => {
  const {
    text,
    renderMenu,
    title,
    onClose,
    children,
    icon: Icon,
    ...rest
  } = props;

  const [menuParent, setMenuParent] = useState(null);
  const btnRef = useRef(null);
  const menuOpen = Boolean(menuParent);
  const ariaDesc = "open-popup-menu";

  const handleTriggerMenu = useCallback(() => {
    if (btnRef.current) {
      setMenuParent(btnRef.current);
    }
  }, [setMenuParent]);
  const handleClose = useCallback(() => {
    setMenuParent(null);
    if (typeof onClose === "function") onClose();
  }, [setMenuParent]);

  return (
    <>
      <Button
        ref={btnRef}
        aria-describedby={ariaDesc}
        variant="contained"
        onClick={handleTriggerMenu}
        {...(Icon && isValidElement(Icon)
          ? { startIcon: Icon }
          : typeof Icon === "function"
            ? {
                startIcon: createElement(Icon),
                sx: { "& .MuiButton-startIcon": { marginLeft: 0 } },
              }
            : null)}
        size="small"
        {...rest}
      >
        {text || children}
      </Button>

      <Popover
        id={ariaDesc}
        open={menuOpen}
        anchorEl={menuParent}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{ paper: { sx: { padding: "10px" } } }}
      >
        {title ? (
          <>
            <Typography
              variant="h5"
              sx={{
                color: "primary",
                textAlign: "left",
                textTransform: "capitalize",
              }}
            >
              {title}
            </Typography>
            <Divider sx={{ width: "100%", my: 2 }} />
          </>
        ) : null}
        {isValidElement(renderMenu)
          ? renderMenu
          : typeof renderMenu === "function" /* A class/function component */ ||
              (renderMenu &&
                typeof renderMenu === "string") /* Will render as node */
            ? createElement(renderMenu, { closeMenu: handleClose, menuOpen })
            : // eslint-disable-next-line func-names
              (function () {
                throw new Error(
                  `'renderMenu' prop on PopoverMenuBtn requires a component, function or string passed to it. Instead it is '${typeof renderMenu}'`
                );
              })()}
      </Popover>
    </>
  );
};

export default PopoverMenuBtn;
