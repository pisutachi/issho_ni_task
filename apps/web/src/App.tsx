import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import { appRoutes, defaultRoute } from "./routes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={defaultRoute} replace />} />
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  );
}
