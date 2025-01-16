import Link from "next/link";
import { BsBuildingFill } from "react-icons/bs";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { IoCart, IoHomeSharp } from "react-icons/io5";

const NavItems = () => {
  const navItems = [
    { label: "Home", icon: IoHomeSharp, href: "/" },
    { label: "Companies", icon: BsBuildingFill, href: "/" },
    { label: "Clients", icon: FaUsers, href: "/" },
    { label: "Products", icon: IoCart, href: "/" },
    { label: "Users", icon: FaUsersCog, href: "/" },
  ];
  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          className="group mb-2 flex w-full cursor-pointer items-center gap-3 rounded border-l-2 border-transparent p-2 text-SecondaryTextColor transition-all duration-300 hover:border-Primary hover:bg-highlight hover:text-PrimaryTextColor"
        >
          <span className="flex-shrink-0 text-xl group-hover:text-Icons">
            <item.icon />
          </span>
          <div className="overflow-hidden">
            <Link href={item.href}>{item.label}</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default NavItems;
