import React from "react";
import { Route, RouteProps, Routes } from "react-router";
import { AccountState } from "../redux/Account/types";
import { useSelector } from "react-redux";

import { AppState } from "../redux/stores";
import { Login } from "../pages";

const PrivateRoute = ({ children, ...rest }: RouteProps): JSX.Element => {
  const account: AccountState = useSelector((state: AppState) => state.account);
  return (
    <Routes>
      <Route element={<Login />} />
    </Routes>
  );
};

export default PrivateRoute;
