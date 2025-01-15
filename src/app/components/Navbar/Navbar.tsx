"use client";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { BsBuildingFill } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import { IoCart, IoHomeSharp } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const navItems = [
  { label: "Home", icon: IoHomeSharp, href: "/" },
  { label: "Companies", icon: BsBuildingFill, href: "/" },
  { label: "Clients", icon: FaUsers, href: "/" },
  { label: "Products", icon: IoCart, href: "/" },
  { label: "Users", icon: FaUsersCog, href: "/" },
];

const Navbar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <nav
      className={classNames({
        "sticky z-10 h-screen flex-col border-r border-navBorder bg-navBackground pl-4 pr-6 text-lg leading-none transition-all duration-300":
          true,
        "w-64": expanded,
        "w-20": !expanded,
      })}
    >
      <div className="mb-12 flex flex-shrink-0 cursor-default items-center gap-2 overflow-hidden py-3 text-3xl text-inherit">
        <span className="flex-shrink-0 text-Primary">
          <FaReact />
        </span>
        <h1
          className={classNames({
            "font-bold transition-opacity duration-300": true,
            "opacity-100": expanded,
            "opacity-0": !expanded,
          })}
        >
          Logo
        </h1>
      </div>
      <button
        className="absolute -right-[17px] rounded-full border border-navBorder bg-inherit p-2 shadow-md transition-transform duration-300 hover:scale-110"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? (
          <MdOutlineKeyboardArrowLeft />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </button>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="group mb-2 flex w-full cursor-pointer items-center gap-2 rounded border-l-2 border-SecondaryTextColor p-2 text-SecondaryTextColor transition-all duration-300 hover:border-Primary hover:bg-highlight hover:text-PrimaryTextColor"
        >
          <span className="flex-shrink-0 text-xl group-hover:text-Icons">
            <item.icon />
          </span>
          <div className="overflow-hidden">
            <Link href={item.href}>{item.label}</Link>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
