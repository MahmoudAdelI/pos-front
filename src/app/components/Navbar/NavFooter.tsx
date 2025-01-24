import classNames from "classnames";
import Logout from "../logOutButton/LogoutButton";
import { User } from "./types";

const NavFooter = ({
  expanded,
  user,
}: {
  expanded: boolean;
  user: User | null;
}) => {
  return (
    <>
      <span className="mb-4 h-[1px] bg-navBorder"></span>
      <div className="flex cursor-default items-center gap-2">
        <div
          className={classNames({
            "grid flex-shrink-0 place-content-center rounded-full bg-highlight text-2xl font-semibold leading-none text-SecondaryTextColor transition-all duration-300":
              true,
            "h-12 w-12": expanded,
            "h-10 w-10": !expanded,
          })}
        >
          {user?.firstName[0]}
        </div>

        <div
          className={classNames({
            "text-nowrap transition-all duration-300": true,
            "opacity-100": expanded,
            "opacity-0": !expanded,
          })}
        >
          <div className="font-semibold text-SecondaryTextColor transition-all duration-300 hover:text-inherit">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-xs text-SecondaryTextColor">{user?.role}</div>
        </div>
        <div
          className={classNames({
            "text-nowrap transition-all duration-200": true,
            "opacity-100": expanded,
            "opacity-0": !expanded,
          })}
        >
          <span className="ml-6 text-2xl text-SecondaryTextColor transition-colors hover:text-inherit">
            <Logout />
          </span>
        </div>
      </div>
    </>
  );
};

export default NavFooter;
