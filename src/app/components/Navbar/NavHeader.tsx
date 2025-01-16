import classNames from "classnames";
import { FaReact } from "react-icons/fa6";

const NavHeader = ({ expanded }: { expanded: boolean }) => {
  return (
    <div className="mb-12 flex flex-shrink-0 cursor-default items-center gap-2 overflow-hidden px-1 py-3 text-3xl text-inherit">
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
  );
};

export default NavHeader;
