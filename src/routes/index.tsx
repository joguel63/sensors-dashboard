import { Route, Routes } from "react-router";
import { useFirebaseContext } from "../hooks";
import { PrivateRoute } from "./privateRoute";
import { DashboardPage, LoginPage } from "../pages";

export const AppRoutes = () => {
  const { user } = useFirebaseContext();
  const isLogged = !!user;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            validation={!isLogged}
            validationPath="/dashboard"
            element={<LoginPage />}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute validation={isLogged} validationPath="/" element={<DashboardPage />} />
        }
      />
    </Routes>
  );
};
