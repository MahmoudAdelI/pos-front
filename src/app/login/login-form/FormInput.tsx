"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import classNames from "classnames";
import { useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type FormInputProps = {
  Icon?: IconType | undefined;
  placeholder: string;
  error?: string | undefined;
  type?: "text" | "password" | "number" | undefined;
};
const FormInput = ({
  Icon,
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
    <div className="w-full">
      <div
        className={classNames({
          "form-input": true,
          "form-input-error": error,
          "outline-OutlineColor": !error,
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
            className="peer flex-1 bg-transparent outline-none placeholder:text-transparent"
          />
          <label htmlFor={placeholder} className="label">
            {placeholder}
          </label>
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
