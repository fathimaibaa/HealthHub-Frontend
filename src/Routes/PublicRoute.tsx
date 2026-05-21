import { FC } from "react";
import { useAppSelector } from "../Redux/Store/Store";
import { Navigate, Outlet } from "react-router-dom";
import { getItemFromLocalStorage } from "../Utils/Setnget";

const hasAccessToken = () => !!getItemFromLocalStorage("access_token");

export const PublicRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.UserSlice);
  const sessionValid = isAuthenticated && hasAccessToken();

  if (role === "user") {
    return sessionValid ? <Navigate to={"/"} replace /> : <Outlet />;
  }
  if (role === "admin") {
    return sessionValid ? <Navigate to={"/admin"} replace /> : <Outlet />;
  }
  return <Outlet />;
};

export const DoctorPublicRoute: FC = () => {
  const { isAuthenticated, role } = useAppSelector(
    (state) => state.DoctorSlice
  );
  const sessionValid = isAuthenticated && hasAccessToken();

  if (role === "doctor") {
    return sessionValid ? <Navigate to={"/doctor"} replace /> : <Outlet />;
  }
  return <Outlet />;
};
