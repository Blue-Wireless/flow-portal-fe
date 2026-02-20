import chevronDown from '../assets/chevron-down.svg';

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  id: string;
  label: string;
  value: string;
  options: FilterOption[];
  disabled?: boolean;
  icon?: string;
};

type Props = {
  filters: FilterConfig[];
  onChange: (id: string, value: string) => void;
};

const DashboardFilter = ({ filters, onChange }: Props) => {
  return (
    <div className="flex flex-row gap-2 items-center font-exo">
      <span className="text-xs text-[#434A56] font-bold">Filters:</span>
      {filters.map((filter) => (
        <div key={filter.id} className="group relative">
          {filter.icon && (
            <img
              src={filter.icon}
              alt=""
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
          )}
          <select
            style={{ textOverflow: 'ellipsis' }}
            id={filter.id}
            value={filter.value}
            onChange={(e) => onChange(filter.id, e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-sm border border-[#227D9B] bg-white px-3 py-2 pr-10 pl-7 text-sm text-[#227D9B] font-bold shadow-m outline-none transition-all hover:ring-1 focus:border-[#1580D4] focus:ring-1 focus:ring[#1580D4]/20 disabled:bg-slate-50 disabled:text-slate-400"
          >
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <img
            src={chevronDown}
            alt=""
            className="absolute right-3 top-1/2 transform -translate-y-1/2 group-focus-within:rotate-180 transition-transform"
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardFilter;
