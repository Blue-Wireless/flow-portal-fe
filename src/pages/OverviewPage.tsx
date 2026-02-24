import { useMemo, useState } from 'react';

import Searchbar from '../components/Searchbar';
import DashboardFilter, {
  type FilterConfig,
} from '../components/DashboardFilter';
import StatisticCard from '../components/StatisticCard';

import calenderIcon from '../assets/calendar.svg';
import globeIcon from '../assets/globe.svg';
import satelliteIcon from '../assets/satellite.svg';
import usersIcon from '../assets/users.svg';

import customersBgImg from '../assets/bg-users.svg';
import devicesBgImg from '../assets/bg-laptop-mobile.svg';
import networkBgImg from '../assets/bg-wifi.svg';
import GlobalMap, { type Terminal } from '../components/GlobalMap';
import DataUsageBarChart from '../components/DataUsageBarChart';
import { buildDailyMockSeries, type DateRangeKey } from '../utils/timeSeries';

type FiltersState = {
  dateRange: string;
  customers: string;
  partners: string;
  countries: string;
};

const initialFilters: FiltersState = {
  dateRange: '6M',
  customers: 'All',
  partners: 'All',
  countries: 'All',
};

type StatCardConfig = {
  title: string;
  image: string;
  fields: [
    { label: string; value: string | number; unit?: string },
    { label: string; value: string | number; unit?: string },
    { label: string; value: string | number; unit?: string },
  ];
};

const statCards: StatCardConfig[] = [
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

const buildFilterConfigs = (filters: FiltersState): FilterConfig[] => [
  {
    id: 'dateRange',
    label: 'Date Range',
    value: filters.dateRange,
    options: [
      { label: '7 days', value: '7D' },
      { label: '30 days', value: '30D' },
      { label: '3 months', value: '3M' },
      { label: '6 months', value: '6M' },
      { label: '12 months', value: '12M' },
    ],
    icon: calenderIcon,
  },
  {
    id: 'customers',
    label: 'Customers',
    value: filters.customers,
    options: [{ label: 'All customers', value: 'All' }],
    icon: usersIcon,
  },
  {
    id: 'partners',
    label: 'Partners',
    value: filters.partners,
    options: [{ label: 'All partners', value: 'All' }],
    icon: satelliteIcon,
  },
  {
    id: 'countries',
    label: 'Countries',
    value: filters.countries,
    options: [
      { label: 'All countries', value: 'All' },
      { label: 'United States', value: 'US' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Canada', value: 'CA' },
      { label: 'Australia', value: 'AU' },
    ],
    icon: globeIcon,
  },
];

const terminals: Terminal[] = [
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

const OverviewPage = () => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);

  const filterConfigs = useMemo(() => buildFilterConfigs(filters), [filters]);

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const range = filters.dateRange as DateRangeKey;
  // For now: generate daily mock points depending on selected range
  const dailyPoints = useMemo(() => {
    const daily =
      range === '7D'
        ? buildDailyMockSeries(7)
        : range === '30D'
          ? buildDailyMockSeries(30)
          : range === '3M'
            ? buildDailyMockSeries(90)
            : range === '6M'
              ? buildDailyMockSeries(180)
              : buildDailyMockSeries(365);
    console.log('here', range, daily);
    return daily;
  }, [range]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          {/* TODO: Dynamic Breadcrumbs */}
          <div className="text-sm text-slate-600">Overview /</div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        </div>

        <Searchbar />
      </div>

      <div className="border-b border-[#B9C1CB]" />

      {/* Filters */}
      <DashboardFilter filters={filterConfigs} onChange={handleFilterChange} />

      <div className="border-b border-[#B9C1CB]" />

      {/* Statistic Cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {statCards.map((card) => (
          <StatisticCard
            key={card.title}
            title={card.title}
            image={card.image}
            fields={card.fields}
          />
        ))}
      </div>

      <div className="border-b border-[#B9C1CB]" />

      {/* Global Map and Data Usage Graph */}
      <div className="flex w-full items-stretch justify-between gap-8">
        <div className="w-xl">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">
            Global terminal network
          </h1>
          <GlobalMap terminals={terminals} />
        </div>
        <div className="border-r border-[#B9C1CB]" />

        <div className='w-xl'>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">
            Data usage
          </h1>
          <DataUsageBarChart range={range} points={dailyPoints} />
        </div>
      </div>

      <div className="border-b border-[#B9C1CB]" />
    </div>
  );
};

export default OverviewPage;
