import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className="px-3 text-Alert">{children}</p>;
};

export default ErrorMessage;
