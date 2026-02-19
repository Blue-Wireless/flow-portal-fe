import { useState } from 'react';
import Searchbar from '../components/Searchbar';
import DashboardFilter, {
  type FilterConfig,
} from '../components/DashboardFilter';
import calenderIcon from '../assets/calendar.svg';
import globeIcon from '../assets/globe.svg';
import satelliteIcon from '../assets/satellite.svg';
import usersIcon from '../assets/users.svg';

const OverviewPage = () => {
  const [query, setQuery] = useState('');

  const dividerClass = 'border-b border-[#B9C1CB]';

  const [filters, setFilters] = useState<Record<string, string>>({
    dateRange: '6M',
    customers: 'All',
    partners: 'All',
    countries: 'All',
  });
  const filterConfigs: FilterConfig[] = [
    {
      id: 'dateRange',
      label: 'Date Range',
      value: filters.dateRange,
      options: [
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

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-4">
      <div className=" flex items-center justify-between">
        <div>
          {/* TODO Dynamic Breadcrumbs component */}
          <h4>Overview /</h4>
          <h1 className="text-4xl font-semibold text-slate-900">Dashboard</h1>
        </div>

        <Searchbar />
      </div>

      <div className={dividerClass} />

      {/* TODO Filter components */}
      <DashboardFilter filters={filterConfigs} onChange={handleFilterChange} />
    </div>
  );
};

export default OverviewPage;
