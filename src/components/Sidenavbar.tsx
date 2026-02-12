import { NavLink } from 'react-router-dom';
import bwLogo from '../assets/bw-logo-white.png';

function linkClass({ isActive }: { isActive: boolean }) {
  const base =
    'block rounded px-3 py-2 text-base transition-colors duration-150';
  return isActive
    ? `${base} bg-[#C6EDFB] text-black hover:text-black`
    : `${base} text-[#E3E8ED] hover:bg-[#126DB6] font-normal`;
}

export default function Sidenavbar() {
  return (
    <aside className="w-68 p-1 border-r bg-[#1580D4] text-white">
      <div className="h-24 flex items-center justify-center">
        <img src={bwLogo} alt="BlueWireless Logo" className="h-16 w-auto" />
      </div>

      {/* Divider */}
      <div className="mx-4 border-b border-[#B9C1CB]" />

      <nav className="p-4 space-y-3">
        <div>
          <div className="mb-2 text-[#B9C1CB] text-xs uppercase tracking-wide">
            Manage
          </div>
          <NavLink to="/app" end className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/app/device-management" className={linkClass}>
            Device management
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
