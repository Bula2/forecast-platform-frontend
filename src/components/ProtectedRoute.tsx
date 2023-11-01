import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  return <div></div>;
};

export default ProtectedRoute;
