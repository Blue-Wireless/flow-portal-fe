export type DateRangeKey = "7D" | "30D" | "3M" | "6M" | "12M";

export type Connection<T> = {
  edges: Array<{ node: T }>;
  totalCount: number;
};

export type TerminalStatus = "online" | "offline";
export type DeviceStatus = "online" | "offline";

export type TerminalNode = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: TerminalStatus;
};

export type DeviceNode = {
  id: string;
  device: string;
  location: string;
  terminalId?: string; // link device -> terminal if you want
  status: DeviceStatus;
  lastSeenAt: string;
  signalPct: number;
};

export type UsagePointNode = {
  date: string; // YYYY-MM-DD
  valueMB: number;
};

// --- UI metadata, served by API (mocking GraphQL) ---
export type FilterOption = { label: string; value: string };

export type FilterMeta = {
  id: "dateRange" | "customers" | "partners" | "countries";
  label: string;
  icon: string; // asset path resolved in client mock
  options: FilterOption[];
};

export type StatField = { label: string; value: string | number; unit?: string };

export type StatCardMeta = {
  title: string;
  image: string;
  fields: [StatField, StatField, StatField];
};

export type OverviewFilters = {
  dateRange: DateRangeKey;
  customers: string;
  partners: string;
  countries: string;
};

export type OverviewQueryVariables = {
  filters: OverviewFilters;
};

export type OverviewQueryResult = {
  overview: {
    meta: {
      filters: FilterMeta[];
      statCards: StatCardMeta[];
    };
    terminals: Connection<TerminalNode>;
    devices: Connection<DeviceNode>; 
    usage: Connection<UsagePointNode>;
  };
};