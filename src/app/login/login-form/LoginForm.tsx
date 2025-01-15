"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { TbLockPassword, TbUser } from "react-icons/tb";
import FormInput from "./FormInput";
import "./LoginForm.css";
import { LoginFormSchema, LoginForm as LoginFormType } from "./types";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const [authError, setAuthError] = useState<boolean | string>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setPending(true);
      await axios.post("/api/auth/login", data);
      router.push("/");
      router.refresh();
    } catch (error) {
      setPending(false);
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage =
          error.response.data.error || "An unexpected error occurred";
        setAuthError(errorMessage);
        reset();
      }
    }
  });

  return (
    <div className="h-auto w-full lg:max-w-[28rem]">
      {authError && (
        <div className="motion-preset-fade-lg mb-4 flex w-full items-start gap-3 rounded-md bg-red-100 p-3">
          <span className="text-xl text-Alert">
            <MdErrorOutline />
          </span>
          <div>
            <h6 className="font-semibold text-Alert">Error</h6>
            {authError}
          </div>
        </div>
      )}
      <form onSubmit={onSubmit} className="form">
        <h1 className="text-3xl font-bold">Sign In</h1>

        <FormInput
          Icon={TbUser}
          placeholder="Username"
          error={errors.username?.message}
          {...register("username")}
        />

        <FormInput
          Icon={TbLockPassword}
          placeholder="Password"
          error={errors.password?.message}
          type="password"
          {...register("password")}
        />

        <button
          disabled={isPending}
          type="submit"
          className={classNames({
            "mt-6 w-full select-none rounded-3xl bg-Primary p-3 text-white":
              true,
            "!bg-SecondaryTextColor": isPending,
          })}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

{
  /* <div className="w-full">
          <div
            className={classNames({
              "form-input": true,
              "form-input-error": errors.username?.message,
              "outline-OutlineColor": !errors.username?.message,
            })}
          >
            <span>
              <TbUser />
            </span>
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="flex-1 bg-transparent outline-none placeholder:text-inherit"
            />
          </div>
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </div> */
}
{
  /* <div className="w-full">
          <div
            className={classNames({
              "form-input": true,
              "form-input-error": errors.password?.message,
              "outline-OutlineColor": !errors.password?.message,
            })}
          >
            <span>
              <TbLockPassword />
            </span>
            <input
              {...register("password")}
              type={visiblePassword ? "text" : "password"}
              placeholder="password"
              className="flex-1 bg-transparent outline-none placeholder:text-inherit"
            />
            <span onClick={showPassword} className="cursor-pointer">
              {visiblePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div> */
}
