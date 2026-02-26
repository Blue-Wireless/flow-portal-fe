import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import OverviewPage from './pages/overview/OverviewPage.tsx';
import PartnersPage from './pages/deviceManagement/PartnersPage.tsx';
import CustomersPage from './pages/deviceManagement/CustomersPage.tsx';
import SitesPage from './pages/deviceManagement/SitesPage.tsx';
import TerminalsPage from './pages/deviceManagement/TerminalsPage.tsx';
import TerminalDetailsPage from './pages/deviceManagement/TerminalDetailsPage.tsx';

const NotFound = () => {
  return <div className="p-6">404 - Not Found</div>;
};

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/app" replace /> },
  {
    path: '/app',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="overview" replace /> },
      { path: 'overview', element: <OverviewPage /> },
      {
        path: 'device-management',
        children: [
          { index: true, element: <Navigate to="/partners" replace /> },
          { path: 'partners', element: <PartnersPage /> },
          {
            path: 'partners/:partnerId/customers',
            element: <CustomersPage />,
          },
          {
            path: 'partners/:partnerId/customers/:customerId/sites',
            element: <SitesPage />,
          },
          {
            path: 'partners/:partnerId/customers/:customerId/sites/:siteId/terminals',
            element: <TerminalsPage />,
          },
          {
            path: 'partners/:partnerId/customers/:customerId/sites/:siteId/terminals/:terminalId',
            element: <TerminalDetailsPage />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
