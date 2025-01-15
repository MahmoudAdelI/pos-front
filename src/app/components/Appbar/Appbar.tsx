import getToken from "@/app/auth/getToken";
import ThemeToggle from "@/app/ThemeToggle";
import Link from "next/link";
import LogOut from "../logOutButton/LogOutButton";

const Appbar = async () => {
  const token = await getToken();
  return (
    <div className="mx-auto flex items-center justify-end px-14 py-3">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {token ? (
          <LogOut />
        ) : (
          <Link className="p3" href="/login">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Appbar;
