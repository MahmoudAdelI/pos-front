"use client";
import classNames from "classnames";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import NavFooter from "./NavFooter";
import NavHeader from "./NavHeader";
import NavItems from "./NavItems";
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  startTime: Date;
  endTime: Date;
  role: string;
};

const Navbar = ({ user }: { user: User }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <nav
      className={classNames({
        "fixed flex h-screen flex-col justify-between border-r border-navBorder bg-navBackground px-5 pb-8 text-xl leading-none transition-all duration-300":
          true,
        "w-64": expanded,
        "w-20": !expanded,
      })}
    >
      <button
        className="absolute -right-[17px] top-16 rounded-full border border-navBorder bg-inherit p-2 shadow-md transition-transform duration-300 hover:scale-110"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? (
          <MdOutlineKeyboardArrowLeft />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </button>
      <NavHeader expanded={expanded} />
      <div className="flex-1">
        <NavItems />
      </div>
      <NavFooter expanded={expanded} user={user} />
    </nav>
  );
};

export default Navbar;
