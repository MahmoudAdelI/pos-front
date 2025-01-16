import axios from "axios";
import { LoginForm } from "../login/login-form/types";

const login = async (data: LoginForm) => {
  await axios.post("/api/auth/login", data);
};
export default login;
