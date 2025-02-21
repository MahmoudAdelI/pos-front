import getToken from "@/app/auth/getToken";
import ThemeToggle from "@/app/ThemeToggle";
import Link from "next/link";
import Logout from "../logOutButton/LogoutButton";

const Appbar = async () => {
  const token = await getToken();
  return (
    <div className="flex items-center justify-end py-3">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {/* {token ? (
          <Logout />
        ) : (
          <Link className="p-2" href="/login">
            Log In
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Appbar;
