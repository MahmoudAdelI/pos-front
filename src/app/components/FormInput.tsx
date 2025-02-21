"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import classNames from "classnames";
import { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type FormInputProps = {
  Icon?: IconType | undefined;
  label?: boolean;
  placeholder: string;
  error?: string | undefined;
  type?: "text" | "password" | "number" | undefined;
};
const FormInput = ({
  Icon,
  label,
  placeholder,
  error,
  type = "text",
  ...rest
}: FormInputProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const inputType =
    type === "password" ? (visiblePassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      {label && (
        <span className="absolute -top-6 left-0 text-xs font-medium text-PrimaryTextColor">
          {placeholder}
        </span>
      )}
      <div
        className={classNames({
          "form-input": true,
          "form-input-error": error,
        })}
      >
        {Icon && <Icon />}

        <div className="relative flex w-full">
          <input
            {...rest}
            id={placeholder}
            type={inputType}
            placeholder={placeholder}
            autoComplete="off"
            className="peer flex-1 bg-transparent outline-none placeholder:text-sm placeholder:text-SecondaryTextColor"
          />
        </div>

        {type === "password" && (
          <span onClick={togglePassword} className="cursor-pointer">
            {visiblePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        )}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default FormInput;
