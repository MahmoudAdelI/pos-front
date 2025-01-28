"use client";
import Link from "next/link";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { IoCart, IoHomeSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import classNames from "classnames";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", icon: IoHomeSharp, href: "/" },

  {
    label: "Products",
    icon: IoCart,
    href: "/products",
    haveSubMenue: true,
    subMenue: [
      { label: "Add new product", href: "/products/add-product" },
      { label: "Delete product", href: "/products/delete-product" },
    ],
  },
  { label: "Configurations", icon: MdEdit, href: "/configurations" },
  { label: "Employees", icon: FaUsersCog, href: "/employees" },
];

const NavItems = ({ expanded }: { expanded: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
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
          className="group mb-2 flex w-full cursor-pointer flex-col rounded text-SecondaryTextColor transition-all duration-300"
        >
          <div
            className="mb-2 flex gap-2 overflow-hidden rounded border-l-2 border-transparent p-2 hover:border-Primary hover:bg-highlight hover:text-PrimaryTextColor"
            onClick={() => item.haveSubMenue && toggleSubmenu(item.label)}
          >
            <div
              className="flex flex-1 gap-2"
              onClick={() => {
                if (pathname !== item.href) {
                  router.push(item.href);
                }
              }}
            >
              <span className="flex-shrink-0 text-xl group-hover:text-Icons">
                <item.icon />
              </span>

              <h2>{item.label}</h2>
            </div>

            {item.haveSubMenue && expanded && (
              <span
                className={classNames("ml-auto transition-all duration-200", {
                  "rotate-180": openMenus[item.label],
                })}
              >
                <IoIosArrowDown />
              </span>
            )}
          </div>

          {item.subMenue && expanded && (
            <ul
              className={classNames({
                "overflow-hidden transition-all duration-200": true,
                "h-full opacity-100": openMenus[item.label],
                "h-0 opacity-0": !openMenus[item.label],
              })}
            >
              {item.subMenue.map((subItem, subIndex) => (
                <li
                  key={subIndex}
                  className="rounded py-1 pl-10 text-base hover:bg-highlight hover:text-PrimaryTextColor"
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
