import axios from "axios";
const logout = async () => {
  await axios.post("/api/auth/logout");
};
export default logout;
