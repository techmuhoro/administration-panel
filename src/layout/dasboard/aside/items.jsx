"use client";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from '@mui/icons-material/Apartment';

export const asideMenuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    to: "/dashboard",
  },

  {
    key: "transactions",
    label: "Transactions",
    icon: <CompareArrowsIcon fontSize="small" />,
    to: "/dashboard/transactions",
  },
  {
    key: "departments",
    label: "Departments",
    icon: <ApartmentIcon fontSize="small" />,
    to: "/dashboard/departments",
  },
  {
    key: "merchants",
    label: "Merchants",
    icon: <LocalMallIcon fontSize="small" />,
    to: "/dashboard/merchants",
  },
  {
    key: "settlements",
    label: "Settlements",
    icon: <PaymentsIcon fontSize="small" />,
    to: "/dashboard/settlements",
  },

  {
    key: "card-review",
    label: "Card Review",
    icon: <CreditCardIcon fontSize="small" />,
    to: "/dashboard/card-review",
  },

  {
    key: "pdqs",
    label: "PDQs",
    icon: <PhonelinkRingIcon fontSize="small" />,
    to: "/dashboard/pdqs",
  },

  {
    key: "reports",
    label: "Reports",
    icon: <AutoGraphIcon fontSize="small" />,
    to: "/dashboard/reports",
  },

  {
    key: "access-control",
    label: "Access control",
    icon: <GroupIcon fontSize="small" />,

    links: [
      {
        key: "access-control-users",
        label: "User",
        to: "/dashboard/users",
        active: (pathname) => pathname.startsWith("/dashboard/users"),
      },
      {
        key: "access-control-roles",
        label: "Roles",
        to: "/dashboard/roles",
        active: (pathname) => pathname.startsWith("/dashboard/roles"),
      },
      {
        key: "access-control-permissions",
        label: "Permission",
        to: "/dashboard/permissions",
        active: (pathname) => pathname.startsWith("/dashboard/permissions"),
      },
      {
        key: "access-control-audit-trail",
        label: "Audit Trail",
        to: "/dashboard/settings/audit-trail",
      },
    ],
  },
];
