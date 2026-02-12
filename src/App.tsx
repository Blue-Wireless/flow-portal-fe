import { Outlet } from 'react-router-dom';
import Sidenavbar from './components/Sidenavbar';

export default function App() {
  return (
    <div className="min-h-screen flex">
      <Sidenavbar />

      {/* Page content */}
      <main className="flex-1 min-w-0 p-6">
        <Outlet />
      </main>
    </div>
  );
}
