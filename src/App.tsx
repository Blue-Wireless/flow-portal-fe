import { Outlet } from 'react-router-dom';
import Sidenavbar from './components/Sidenavbar';

export default function App() {
  return (
    <div className="min-h-screen flex">
      <Sidenavbar />

      {/* Page content */}
      <main className="flex-1 min-w-0">
        {/* Content wrapper */}
        <div className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
