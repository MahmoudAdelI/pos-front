import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className="mt-[2px] px-3 text-xs text-Alert">{children}</p>;
};

export default ErrorMessage;
