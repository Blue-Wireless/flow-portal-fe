import type React from 'react';
import { NavLink } from 'react-router-dom';

import bwLogo from '../assets/bw-logo-white.png';

import OverviewIcon from '../assets/rectangles-mixed.svg?react';
import DeviceMgtIcon from '../assets/laptop-mobile.svg?react';
import AnalyticsIcon from '../assets/file-chart-column-svg.svg?react';
import LocationTrackingIcon from '../assets/location-crosshairs.svg?react';
import BillingIcon from '../assets/file-invoice.svg?react';
import AccountSettingsIcon from '../assets/screwdriver-wrench.svg?react';
import SupportIcon from '../assets/headset.svg?react';
import UserIcon from '../assets/user.svg?react';
import LogoutIcon from '../assets/right-from-bracket.svg?react';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type NavItemConfig = {
  icon: IconType;
  label: string;
  to?: string;
  end?: boolean;
  disabled?: boolean;
};

type NavSection = {
  title: string;
  items: NavItemConfig[];
};

const topSections: NavSection[] = [
  {
    title: 'Manage',
    items: [
      { icon: OverviewIcon, label: 'Overview', to: '/app', end: true },
      {
        icon: DeviceMgtIcon,
        label: 'Device management',
        to: '/app/device-management',
      },
    ],
  },
  {
    title: 'Review',
    items: [
      { icon: AnalyticsIcon, label: 'Analytics', disabled: true },
      {
        icon: LocationTrackingIcon,
        label: 'Location tracking',
        disabled: true,
      },
      { icon: BillingIcon, label: 'Billing', disabled: true },
    ],
  },
  {
    title: 'Admin',
    items: [
      { icon: AccountSettingsIcon, label: 'Account settings', disabled: true },
      { icon: SupportIcon, label: 'Support', disabled: true },
    ],
  },
];

const bottomItems: NavItemConfig[] = [
  { icon: UserIcon, label: 'User', disabled: true },
  { icon: LogoutIcon, label: 'Logout', disabled: true },
];

const getLinkClass = (isActive: boolean) => {
  const base =
    'flex items-center gap-2 rounded px-3 py-2 text-base transition-colors duration-150';
  return isActive
    ? `${base} bg-[#C6EDFB] text-black`
    : `${base} text-[#E3E8ED] hover:bg-[#126DB6] hover:text-black font-normal`;
};

const getIconClass = (isActive: boolean) => {
  return isActive
    ? 'w-5 h-5 text-black [&_*]:fill-black'
    : 'w-5 h-5 text-[#CFD5DD] [&_*]:fill-[#CFD5DD]';
};

const NavItem = ({ icon: Icon, label, to, end, disabled }: NavItemConfig) => {
  if (disabled || !to) {
    return (
      <span
        className="flex items-center gap-2 rounded px-3 py-2 text-base text-[#B9C1CB] cursor-not-allowed"
        aria-disabled="true"
      >
        <Icon className="w-5 h-5 opacity-60 **:fill-[#B9C1CB]" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div className={getLinkClass(isActive)}>
          <Icon className={getIconClass(isActive)} />
          <span>{label}</span>
        </div>
      )}
    </NavLink>
  );
};

const Sidenavbar = () => {
  return (
    <aside className="w-68 p-1 border-r bg-[#1580D4] text-white flex flex-col">
      {/* Logo */}
      <div className="h-24 flex items-center justify-center">
        <img src={bwLogo} alt="BlueWireless Logo" className="h-16 w-auto" />
      </div>

      <div className="mx-1 border-b border-[#B9C1CB]" />

      {/* Top nav */}
      <nav className="p-1 space-y-3 flex-1">
        {topSections.map((section) => (
          <div key={section.title}>
            <div className="mb-2 mt-2 px-3 text-[#B9C1CB] text-xs uppercase tracking-wide">
              {section.title}
            </div>

            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mx-1 border-b border-[#B9C1CB]" />

      {/* Bottom nav */}
      <nav className="p-1 space-y-3">
        <div className="space-y-1">
          {bottomItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidenavbar;
