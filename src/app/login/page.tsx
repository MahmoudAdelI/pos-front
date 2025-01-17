// import { redirect } from "next/navigation";
// import getToken from "../auth/getToken";
import LoginForm from "./login-form/LoginForm";
const Login = async () => {
  // const token = await getToken();
  // if (token) return redirect("/");
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center gap-10 p-4">
      <div className="flex w-full justify-center">
        <LoginForm />
      </div>

      <div className="hidden w-full motion-translate-x-in-50 motion-opacity-in-0 sm:block">
        <img src="/Login.png" alt="Login Image" />
      </div>
    </div>
  );
};

export default Login;
