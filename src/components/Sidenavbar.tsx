import { NavLink } from 'react-router-dom';
import bwLogo from '../assets/bw-logo-white.png';
import overviewIcon from '../assets/rectangles-mixed.svg?react';
import deviceMgtIcon from '../assets/laptop-mobile.svg?react';
import analyticsIcon from '../assets/file-chart-column-svg.svg?react';
import locationTrackingIcon from '../assets/location-crosshairs.svg?react';
import billingIcon from '../assets/file-invoice.svg?react';
import accountSettingsIcon from '../assets/screwdriver-wrench.svg?react';
import supportIcon from '../assets/headset.svg?react';
import userIcon from '../assets/user.svg?react';
import logoutIcon from '../assets/right-from-bracket.svg?react';
import type React from 'react';

const linkBase =
  'flex gap-2 items-center block rounded px-3 py-2 text-base transition-colors duration-150';

const linkClass = ({ isActive }: any) => {
  return isActive
    ? `${linkBase} bg-[#C6EDFB] text-black hover:text-black`
    : `${linkBase} text-[#E3E8ED] hover:bg-[#126DB6] font-normal`;
};

const disabledClass = `${linkBase} text-[#B9C1CB] cursor-not-allowed`;
const navHeaderClass =
  'mb-2 mt-2 px-3 text-[#B9C1CB] text-xs uppercase tracking-wide';
const dividerClass = 'mx-1 border-b border-[#B9C1CB]';
const activeIconClass = 'w-5 h-5 [&_*]:fill-black  text-black';
const inactiveIconClass = 'w-5 h-5 text-[#CFD5DD] [&_*]:fill-[#CFD5DD]';

const iconClass = (isActive: boolean) => {
  return isActive ? activeIconClass : inactiveIconClass;
};
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type NavItemProps = {
  icon: IconType;
  label: string;
  to?: string;
  end?: boolean;
  disabled?: boolean;
};

const NavItem = ({ icon: Icon, label, to, end, disabled }: NavItemProps) => {
  if (disabled || !to) {
    return (
      <span className={disabledClass}>
        <Icon className={inactiveIconClass} />
        <span>{label}</span>
      </span>
    );
  } else {
    return (
      <NavLink to={to} end={end}>
        {({ isActive }) => (
          <div className={linkClass({ isActive })}>
            <Icon className={iconClass(isActive)} />
            <span>{label}</span>
          </div>
        )}
      </NavLink>
    );
  }
};

const Sidenavbar = () => {
  return (
    <aside className="w-68 p-1 border-r bg-[#1580D4] text-white flex flex-col">
      <div className="h-24 flex items-center justify-center">
        <img src={bwLogo} alt="BlueWireless Logo" className="h-16 w-auto" />
      </div>

      <div className={dividerClass} />

      <nav className="p-1 space-y-3 flex-1">
        <div>
          <div className={navHeaderClass}>Manage</div>
          <NavItem icon={overviewIcon} label="Overview" to="/app" end />
          <NavItem
            icon={deviceMgtIcon}
            label="Device management"
            to="/app/device-management"
          />

          <div className={navHeaderClass}>Review</div>
          <NavItem icon={analyticsIcon} label="Analytics" disabled />
          <NavItem
            icon={locationTrackingIcon}
            label="Location tracking"
            disabled
          />
          <NavItem icon={billingIcon} label="Billing" disabled />

          <div className={navHeaderClass}>Admin</div>

          <NavItem
            icon={accountSettingsIcon}
            label="Account settings"
            disabled
          />
          <NavItem icon={supportIcon} label="Support" disabled />
        </div>
      </nav>

      <div className={dividerClass} />

      <nav className="p-1 space-y-3">
        <NavItem icon={userIcon} label="User" disabled />
        <NavItem icon={logoutIcon} label="Logout" disabled />
      </nav>
    </aside>
  );
};

export default Sidenavbar;
