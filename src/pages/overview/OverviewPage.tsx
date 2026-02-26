import { useMemo, useState } from 'react';

import Searchbar from '../../components/Searchbar';
import DashboardFilter, {
  type FilterConfig,
} from '../../components/DashboardFilter';
import StatisticCard from '../../components/StatisticCard';

import GlobalMap from '../../components/GlobalMap';
import DataUsageBarChart from '../../components/DataUsageBarChart';
import RecentActivityTable from '../../components/RecentActivityTable';

import type {
  OverviewFilters,
  OverviewQueryResult,
  DateRangeKey,
} from '../../graphql/types';
import { useQuery } from '../../graphql/useQuery';
import { OVERVIEW_QUERY } from '../../graphql/queries';

const initialFilters: OverviewFilters = {
  dateRange: '6M',
  customers: 'All',
  partners: 'All',
  countries: 'All',
};

const OverviewPage = () => {
  const [filters, setFilters] = useState<OverviewFilters>(initialFilters);

  const variables = useMemo(() => ({ filters }), [filters]);

  const { data, loading, error } = useQuery<
    OverviewQueryResult,
    typeof variables
  >({
    query: OVERVIEW_QUERY,
    variables,
  });

  const handleFilterChange = (id: string, value: string) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const range = filters.dateRange as DateRangeKey;

  const filterConfigs: FilterConfig[] = useMemo(() => {
    const meta = data?.overview.meta.filters ?? [];
    return meta.map((m) => ({
      id: m.id,
      label: m.label,
      value: filters[m.id],
      options: m.options,
      icon: m.icon,
    }));
  }, [data, filters]);

  const statCards = data?.overview.meta.statCards ?? [];
  const terminals = data?.overview.terminals.edges.map((e) => e.node) ?? [];
  const points = data?.overview.usage.edges.map((e) => e.node) ?? [];
  const devices = data?.overview.devices.edges.map((e) => e.node) ?? [];

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        Failed to load overview data: {error.message}
      </div>
    );
  }

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

        <div className="w-xl">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">
            Data usage
          </h1>
          <DataUsageBarChart range={range} points={points} />
        </div>
      </div>

      <div className="border-b border-[#B9C1CB]" />

      {/* Recent Device Activity */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">
          Recent Device Activity
        </h1>
        <RecentActivityTable data={devices} />
      </div>
    </div>
  );
};

export default OverviewPage;
