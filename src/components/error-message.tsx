import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className="text-red-500 text-sm">{children}</p>;
};

export default ErrorMessage;
