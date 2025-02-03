"use client";

import login from "@/app/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { TbLockPassword, TbUser } from "react-icons/tb";
import FormInput from "../../components/FormInput";
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
      await login(data);
      router.push("/");
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage =
          error.response.data.error || "An unexpected error occurred";
        setAuthError(errorMessage);
        reset();
      }
    } finally {
      setPending(false);
    }
  });

  return (
    <div className="h-auto w-full lg:max-w-[28rem]">
      {authError && (
        <div className="motion-preset-fade-lg mb-4 flex w-full items-start gap-3 rounded-md bg-red-500/30 p-3">
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
