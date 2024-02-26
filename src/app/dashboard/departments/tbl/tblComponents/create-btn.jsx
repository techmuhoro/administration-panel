"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { usePathname, useSearchParams } from "next/navigation";

function CreateBtn() {
  const pathName = usePathname();
  const searchParams = useSearchParams().toString();
  const pageHref = `${pathName}${searchParams ? "?" + searchParams : ""}`;

  // console.log({ searchParams });

  // console.log("PathName + SearchParams:: ", pageHref);

  return (
    <Button
      startIcon={<AddIcon />}
      variant="contained"
      sx={{ textTransform: "capitalize", color: "#ffffff !important" }}
      component={Link}
      // href={{
      //   pathname: "departments/add",
      //   query: { prev: pageHref },
      // }}
      href={`/dashboard/departments/add${searchParams ? "?prev=" + encodeURIComponent(pageHref) : ""}`}
    >
      Create
    </Button>
  );
}

export default CreateBtn;
