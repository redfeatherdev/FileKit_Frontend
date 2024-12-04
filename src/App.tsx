import { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

// import DefaultLayout from "@/layouts/default-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// import Landing from "@/pages/landing";
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';

import { dashRoutes } from "./routes";
import { useAuthStore } from "./lib/store/main.store";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, token, logIn, logOut } = useAuthStore() as {
    isAuthenticated: boolean,
    token: string,
    logIn: (token: string) => void,
    logOut: () => void
  };

  useEffect(() => {
    if (token !== null) {
      logIn(token);
    } else {
      logOut();
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        {/* <Route element={<DefaultLayout><Outlet /></DefaultLayout>}>
          <Route index element={<Landing />} />
          {landingRoutes.map((routes: any, index: number) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Component />
                }
              />
            );
          })}
        </Route> */}
        <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
          {dashRoutes.map((routes: any, index: number) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Component />
                }
              />
            );
          })}
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App;