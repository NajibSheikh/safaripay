import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/md";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.MdDashboard />,
  },
  {
    title: "Partners",
    path: "/partners",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Create Partner",
        path: "/partners/createPartner",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Load Partners",
        path: "/partners/loadPartners",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Delete Partner",
        path: "/partners/deletePartner",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Permissions",
    path: "/permissions",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Load Permissions",
        path: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Add Permissions",
        path: "/overview/revenue",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Users",
    path: "/users",
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Add User",
        path: "/users/addUser",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Load Users",
        path: "/users/loadUsers",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
