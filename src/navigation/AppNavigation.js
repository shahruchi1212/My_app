import React from "react";

import { useSelector } from "react-redux";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";



const AppNavigation = () => {
  const Auth = useSelector((state) => state.auth);
  const { isLoggedIn } = Auth;
  return isLoggedIn ? <AppStack /> : <AuthStack />;

};

export default AppNavigation;
