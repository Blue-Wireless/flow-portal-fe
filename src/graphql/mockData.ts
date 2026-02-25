import calenderIcon from '../assets/calendar.svg';
import globeIcon from '../assets/globe.svg';
import satelliteIcon from '../assets/satellite.svg';
import usersIcon from '../assets/users.svg';

import customersBgImg from '../assets/bg-users.svg';
import devicesBgImg from '../assets/bg-laptop-mobile.svg';
import networkBgImg from '../assets/bg-wifi.svg';

import type {
  DeviceNode,
  FilterMeta,
  StatCardMeta,
  TerminalNode,
} from './types';

export const terminalNodes: TerminalNode[] = [
  {
    id: 'syd',
    name: 'Sydney',
    latitude: -33.8688,
    longitude: 151.2093,
    status: 'online',
  },
  {
    id: 'mel',
    name: 'Melbourne',
    latitude: -37.8136,
    longitude: 144.9631,
    status: 'offline',
  },
  {
    id: 'bne',
    name: 'Brisbane',
    latitude: -27.4698,
    longitude: 153.0251,
    status: 'online',
  },
  {
    id: 'per',
    name: 'Perth',
    latitude: -31.9505,
    longitude: 115.8605,
    status: 'online',
  },
  {
    id: 'adl',
    name: 'Adelaide',
    latitude: -34.9285,
    longitude: 138.6007,
    status: 'offline',
  },
  {
    id: 'cbr',
    name: 'Canberra',
    latitude: -35.2809,
    longitude: 149.13,
    status: 'online',
  },
  {
    id: 'drw',
    name: 'Darwin',
    latitude: -12.4634,
    longitude: 130.8456,
    status: 'offline',
  },
  {
    id: 'hob',
    name: 'Hobart',
    latitude: -42.8821,
    longitude: 147.3272,
    status: 'online',
  },
];

const locationsByTerminalId: Record<string, string> = {
  syd: 'Sydney, AU',
  mel: 'Melbourne, AU',
  bne: 'Brisbane, AU',
  per: 'Perth, AU',
  adl: 'Adelaide, AU',
  cbr: 'Canberra, AU',
  drw: 'Darwin, AU',
  hob: 'Hobart, AU',
};

const deviceNames = [
  'Main Terminal',
  'Kitchen POS',
  'Bar Counter Unit',
  'Back Office Router',
  'Outdoor Kiosk',
  'Warehouse Scanner',
  'Reception Terminal',
  'Drive-Thru Screen',
  'Self-Service Kiosk',
  'Payment Gateway',
];

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomRecentIso = () => {
  const minutesAgo = randomInt(1, 60 * 48);
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
};

export const generateDeviceNodes = (count: number = 30): DeviceNode[] => {
  return Array.from({ length: count }).map((_, i) => {
    const terminal = terminalNodes[randomInt(0, terminalNodes.length - 1)];
    const isOnline = Math.random() > 0.3;

    return {
      id: `device-${i + 1}`,
      terminalId: terminal.id,
      device: `${deviceNames[randomInt(0, deviceNames.length - 1)]} ${randomInt(1, 12)}`,
      location: locationsByTerminalId[terminal.id] ?? 'Unknown',
      status: isOnline ? 'online' : 'offline',
      lastSeen: randomRecentIso(),
      signal: isOnline ? randomInt(60, 100) : randomInt(0, 50),
    };
  });
};

export const overviewFilterMeta: FilterMeta[] = [
  {
    id: 'dateRange',
    label: 'Date Range',
    icon: calenderIcon,
    options: [
      { label: '7 days', value: '7D' },
      { label: '30 days', value: '30D' },
      { label: '3 months', value: '3M' },
      { label: '6 months', value: '6M' },
      { label: '12 months', value: '12M' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: usersIcon,
    options: [
      { label: 'All customers', value: 'All' },
      { label: 'Mobilecorp', value: 'Mobilecorp' },
      { label: 'Telestar', value: 'Telestar' },
      { label: 'Vertel', value: 'Vertel' },
      { label: 'Acutec Systems', value: 'Acutec Systems' },
    ],
  },
  {
    id: 'partners',
    label: 'Partners',
    icon: satelliteIcon,
    options: [
      { label: 'All partners', value: 'All' },
      { label: 'Mobilecorp', value: 'Mobilecorp' },
      { label: 'Telestar', value: 'Telestar' },
      { label: 'Vertel', value: 'Vertel' },
      { label: 'Acutec Systems', value: 'Acutec Systems' },
    ],
  },
  {
    id: 'countries',
    label: 'Countries',
    icon: globeIcon,
    options: [
      { label: 'All countries', value: 'All' },
      { label: 'United States', value: 'US' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Canada', value: 'CA' },
      { label: 'Australia', value: 'AU' },
    ],
  },
];

export const overviewStatCardsMeta: StatCardMeta[] = [
  {
    title: 'Customers',
    image: customersBgImg,
    fields: [
      { label: 'Total', value: 60 },
      { label: 'Active', value: 52 },
      { label: 'Avg devices/ customer', value: 15.2, unit: 'Mbps' },
    ],
  },
  {
    title: 'Devices',
    image: devicesBgImg,
    fields: [
      { label: 'Total', value: 112 },
      { label: 'Online', value: 95 },
      { label: 'Offline', value: 30 },
    ],
  },
  {
    title: 'Network health',
    image: networkBgImg,
    fields: [
      { label: 'Uptime', value: 67, unit: '%' },
      { label: 'Avg signal strength', value: 60, unit: '%' },
      { label: 'Issues resolved', value: 99.8, unit: '%' },
    ],
  },
];
