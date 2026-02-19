import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import OverviewPage from "./pages/OverviewPage.tsx";
import DeviceManagementPage from "./pages/DeviceManagementPage.tsx";

const NotFound = () => {
  return <div className="p-6">404 - Not Found</div>;
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/app" replace /> },
  {
    path: "/app",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "device-management", element: <DeviceManagementPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
