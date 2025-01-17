"use client";
import Link from "next/link";
import { BsBuildingFill } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { IoCart, IoHomeSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "classnames";
import { useState } from "react";

const navItems = [
  { label: "Home", icon: IoHomeSharp, href: "/" },
  {
    label: "Companies",
    icon: BsBuildingFill,
    href: "/",
    haveSubMenue: true,
    subMenue: [
      { label: "Add new company", href: "/" },
      { label: "Delete company", href: "/" },
    ],
  },
  {
    label: "Clients",
    icon: FaUsers,
    href: "/",
    haveSubMenue: true,
    subMenue: [
      { label: "Add new client", href: "/" },
      { label: "Delete client", href: "/" },
    ],
  },
  { label: "Products", icon: IoCart, href: "/" },
  { label: "Users", icon: FaUsersCog, href: "/" },
];

const NavItems = ({ expanded }: { expanded: boolean }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="mb-2 flex w-full cursor-pointer flex-col rounded text-SecondaryTextColor transition-all duration-300"
        >
          <div
            className="group mb-2 flex gap-2 rounded border-l-2 border-transparent p-2 hover:border-Primary hover:bg-highlight hover:text-PrimaryTextColor"
            onClick={() => item.haveSubMenue && toggleSubmenu(item.label)}
          >
            <span className="flex-shrink-0 text-xl group-hover:text-Icons">
              <item.icon />
            </span>

            <div className="overflow-hidden">
              <Link href={item.href}>{item.label}</Link>
            </div>

            {item.haveSubMenue && expanded && (
              <span
                className={classNames(
                  "ml-auto transition-transform duration-300",
                  {
                    "rotate-180": openMenus[item.label],
                  },
                )}
              >
                <IoIosArrowDown />
              </span>
            )}
          </div>

          {item.subMenue && expanded && (
            <ul
              className={classNames({
                "transition-all duration-300": true,
                hidden: !openMenus[item.label],
              })}
            >
              {item.subMenue.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="rounded py-1 pl-7 text-base hover:bg-highlight hover:text-PrimaryTextColor"
                >
                  <Link href={subItem.href}>{subItem.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default NavItems;
