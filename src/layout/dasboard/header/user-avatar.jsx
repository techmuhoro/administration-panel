"use client";
import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";

import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import LoadingButton from "@/atoms/loading-button";

import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";

import { getLoginData } from "../../../lib/redux/auth2/otplogin-slice";
import { useSelector } from "react-redux";

export default function UserAvatar() {
  const setAlertMessage = useNotifyAlertCtx();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const anchorRef = useRef(null);

  const router = useRouter();
  const loginData = useSelector(getLoginData);

  const token = Cookies.get("token");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    let headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    setLoading(true);
    axios
      .post(`${BASE_URL}sign-out`, null, {
        headers: headers,
      })
      .then((response) => {
        setAlertMessage("Logged out successfully", {
          type: "success",
          openDuration: 3000,
        });
        setLoading(false);
        Cookies.remove("token");
        setTimeout(() => {
          router.push("/");
        }, 500);
      })
      .catch((error) => {
        let errorObject = error.response?.data?.error;
        console.log(error);
        let errorKey = ["message"];
        errorKey.forEach((key) => {
          if (errorObject?.hasOwnProperty(key)) {
            setAlertMessage(errorObject[key], {
              type: "error",
              openDuration: 3000,
            });
          }
        });
        setLoading(false);
      });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      columnGap={1}
      sx={{
        cursor: "pointer",
      }}
    >
      <div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ marginTop: "20px" }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={() => router.push("/dashboard/user-profile")}
                      //onClick={handleClose}
                    >
                      My profile
                    </MenuItem>

                    <MenuItem>
                      <LoadingButton onClick={handleLogout} loading={loading}>
                        {" "}
                        Log out
                      </LoadingButton>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <Typography>{loginData?.attributes?.name}</Typography>
      <Stack
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <PersonIcon />
        <ExpandMoreIcon fontSize="small" sx={{ ml: -1 }} />
      </Stack>
    </Stack>
  );
}
