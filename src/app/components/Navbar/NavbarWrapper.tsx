import getToken from "@/app/auth/getToken";
import axios from "axios";
import Navbar from "./Navbar";

const NavbarWrapper = async () => {
  const token = await getToken();
  const user = await axios.get("http://localhost:5091/api/Users/current", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return <Navbar user={user.data} />;
};

export default NavbarWrapper;
