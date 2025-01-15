"use client";
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
    <nav className="bg-navBackground border-navBorder sticky z-10 h-[100vh] flex-col border-r pl-4 pr-6 text-lg leading-none">
      <div className="mb-12 flex cursor-default items-center gap-2 py-3 text-inherit">
        <span className="text-Primary">
          <FaReact />
        </span>
        {expanded && <div>Logo</div>}
      </div>
      <button
        className="border-navBorder absolute -right-[17px] rounded-full border bg-inherit p-2 shadow-md"
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
          className="text-SecondaryTextColor hover:border-Primary hover:bg-highlight hover:text-PrimaryTextColor border-SecondaryTextColor group mb-2 flex w-full cursor-pointer items-center gap-2 rounded-md border-l p-2 transition duration-300"
        >
          <span className="group-hover:text-Icons">
            <item.icon />
          </span>
          {expanded && (
            <div className="mr-16">
              <Link href={item.href}>{item.label}</Link>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
