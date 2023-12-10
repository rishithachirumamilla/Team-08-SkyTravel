import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route
            path={route.path}
            element={
              route.isPrivate ? (
                <route.PrivateRoute>
                  <route.component />
                </route.PrivateRoute>
              ) : (
                <route.component />
              )
            }
            key={route.path}
          >
            {route.subRoutes?.map(sub => (
              <Route
                path={sub.path}
                element={<sub.component />}
                key={sub.path}
              />
            ))}
          </Route>
        ))}
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
