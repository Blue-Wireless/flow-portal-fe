import { NavLink } from 'react-router-dom';
import bwLogo from '../assets/bw-logo-white.png';

const linkBase =
  'block rounded px-3 py-2 text-base transition-colors duration-150';

const linkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? `${linkBase} bg-[#C6EDFB] text-black hover:text-black`
    : `${linkBase} text-[#E3E8ED] hover:bg-[#126DB6] font-normal`;
};

const disabledClass = `${linkBase} text-[#B9C1CB] cursor-not-allowed`;
const navHeaderClass =
  'mb-2 mt-2 text-[#B9C1CB] text-xs uppercase tracking-wide';
const dividerClass = 'mx-4 border-b border-[#B9C1CB]';

export default function Sidenavbar() {
  return (
    <aside className="w-68 p-1 border-r bg-[#1580D4] text-white flex flex-col">
      <div className="h-24 flex items-center justify-center">
        <img src={bwLogo} alt="BlueWireless Logo" className="h-16 w-auto" />
      </div>

      <div className={dividerClass} />

      <nav className="p-4 space-y-3 flex-1">
        <div>
          <div className={navHeaderClass}>Manage</div>
          <NavLink to="/app" end className={linkClass}>
            Overview
          </NavLink>
          <NavLink to="/app/device-management" className={linkClass}>
            Device management
          </NavLink>

          <div className={navHeaderClass}>Review</div>
          <span className={disabledClass}>Analytics</span>
          <span className={disabledClass}>Location tracking</span>
          <span className={disabledClass}>Billing</span>

          <div className={navHeaderClass}>Admin</div>
          <span className={disabledClass}>Account settings</span>
          <span className={disabledClass}>Support</span>
        </div>
      </nav>

      <div className={dividerClass} />

      <nav className="p-4 space-y-3">
        <span className={disabledClass}>Account</span>
        <span className={disabledClass}>Logout</span>
      </nav>
    </aside>
  );
}
