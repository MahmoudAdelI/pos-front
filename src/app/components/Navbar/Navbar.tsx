"use client";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import NavFooter from "./NavFooter";
import NavHeader from "./NavHeader";
import NavItems from "./NavItems";
import { User, userSchema } from "./types";

const Navbar = ({ token }: { token: string }) => {
  const [expanded, setExpanded] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/login") return;
    const fetchUser = async (token: string) => {
      try {
        const res = await fetch("http://localhost:5091/api/Users/current", {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const _user = userSchema.safeParse(data);
        if (!_user.success) {
          router.push("/login");
          return;
        }
        setUser(_user.data);
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    };
    fetchUser(token);
  }, [token]);

  if (pathname === "/login") return null;
  if (!user) return null;
  return (
    <nav
      className={classNames({
        "sticky top-0 flex h-screen flex-col justify-between border-r border-navBorder bg-navBackground px-5 pb-8 text-xl leading-none transition-all duration-300":
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
        <NavItems expanded={expanded} />
      </div>
      <NavFooter expanded={expanded} user={user} />
    </nav>
  );
};

export default Navbar;
