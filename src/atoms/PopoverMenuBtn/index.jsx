"use client";

import {
  isValidElement,
  useCallback,
  useState,
  useRef,
  createElement,
  cloneElement,
  createRef,
  Children,
  memo,
  useEffect,
} from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";

/**
 * @typedef {import("react").JSX.Element} JSXElement
 * @typedef {import("react").JSX.IntrinsicElements} JSXIntrinsicElements
 * @typedef {import("react").ComponentType} ReactComponent
 * @typedef {import("@mui/material").ButtonProps} MuiBtnProps
 */

/**
 * renderMenu function.
 * @callback RenderMenuFn
 * @param {Object} props
 * @param {function} props.closeMenu - When called closes menu.
 * @param {boolean} props.menuOpen - Conveys opened status of the menu.
 * @returns {JSXElement}
 */

/**
 * @typedef {object} BtnProps
 * @property {string} [title] - Title to show on floating menu
 * @property {string} [text] - Text to dispaly in the button
 * @property {(RenderMenuFn | JSXElement | string)} renderMenu - The content to show on the floating Menu.
 *
 * If a function is given, __object__ with _`closeMenu`_ and _`menuOpen`_ properties is passed as argument.
 * @property {JSXElement} [icon] - Icon to show on the button
 * @property {function} [onClose] - Function called when menu closes
 * @property {(JSXIntrinsicElements|JSXElement|ReactComponent)} [buttonComponent] - React Component to hook as button control for the floating menu. **Note**: Should be able to hold/handle `ref`.
 *
 * @typedef {MuiBtnProps & BtnProps} PopoverMenuBtnProps
 */

/**
 * Renders Button with a controlled a floating menu
 * @param {PopoverMenuBtnProps} props
 * @returns {JSXElement}
 */
function PopoverMenuBtn(props) {
  const {
    text,
    renderMenu,
    title,
    onClose,
    buttonComponent,
    children,
    icon: Icon,
    ...rest
  } = props;

  // `renderMenu` can be Component or function or string
  if (
    !isValidElement(renderMenu) &&
    typeof renderMenu !== "function" &&
    (typeof renderMenu !== "string" ||
      (typeof renderMenu === "string" && renderMenu.length <= 0))
  ) {
    throw new Error(
      `'renderMenu' prop on PopoverMenuBtn requires a component, function or string(non-empty) passed to it. Instead it is '${typeof renderMenu === "string" ? "empty string" : typeof renderMenu}'`
    );
  }

  const [menuParent, setMenuParent] = useState(null);
  const btnRef = useRef(null); // for FN cmp
  const _btnRef = createRef(null); // for class cmp
  const menuOpen = Boolean(menuParent);
  const ariaDesc = "open-popup-menu";

  const handleTriggerMenu = useCallback(() => {
    if (btnRef.current) {
      setMenuParent(btnRef.current);
    } else if (_btnRef.current) {
      setMenuParent(_btnRef.current);
    }
  }, [setMenuParent]);
  const handleClose = useCallback(() => {
    setMenuParent(null);
    if (typeof onClose === "function") onClose();
  }, [setMenuParent]);

  // Below Logic prevents Floating Menu component from always being recreated from scratch when re-render occurs on parent
  // It may be holding state that will be reset when recreated
  const [renderMenuComponent, setRenderMenuComponent] = useState(null);
  useEffect(() => {
    const reactNode = isValidElement(renderMenu)
      ? renderMenu
      : typeof renderMenu === "function" /* A class/function component */
        ? createElement(renderMenu, {
            closeMenu: handleClose,
            menuOpen,
          })
        : typeof renderMenu === "string" &&
            renderMenu.length > 0 /* Will render as node */
          ? renderMenu
          : null;

    setRenderMenuComponent(reactNode);
  }, [
    handleClose,
    setRenderMenuComponent,
    menuOpen,
    JSON.stringify(renderMenu),
  ]);

  let BtnElement = null;
  const elementProps = {
    "aria-describedby": ariaDesc,
    ...rest,
    onClick: handleTriggerMenu,
  };
  if (buttonComponent) {
    BtnElement = isValidElement(buttonComponent)
      ? (function () {
          const childrenToDisplay =
            text || buttonComponent?.props?.children || children;

          return cloneElement(
            buttonComponent,
            { ...elementProps, ref: btnRef },
            Children.map(childrenToDisplay, (child) => child)
          );
        })()
      : createElement(
          buttonComponent,
          {
            ...elementProps,
            ref: buttonComponent?.prototype?.isReactComponent
              ? _btnRef
              : btnRef,
          },
          text || Children.map(children, (child) => child)
        );
  } else {
    // Use MUI button as `BtnElement`
    const MuiBtnProps = {
      variant: "contained",
      ...(Icon && isValidElement(Icon)
        ? { startIcon: Icon }
        : typeof Icon === "function"
          ? {
              startIcon: createElement(Icon),
              sx: { "& .MuiButton-startIcon": { marginLeft: 0 } },
            }
          : null),
      size: "small",
    };

    BtnElement = createElement(
      Button,
      {
        ...MuiBtnProps,
        ...elementProps,
        ref: btnRef,
      },
      text || Children.map(children, (child) => child)
    );
  }

  return (
    <>
      {BtnElement}

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
              variant="h6"
              sx={{
                color: "primary.main",
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: "0.875rem",
              }}
            >
              {title}
            </Typography>
            <Divider sx={{ width: "100%", mt: 1, mb: 2 }} />
          </>
        ) : null}
        {renderMenuComponent}
      </Popover>
    </>
  );
}

export default memo(PopoverMenuBtn);
