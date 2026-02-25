export type ManagedServiceStatus = 'Active' | 'Inactive' | 'Suspended';

export type LocalSite = {
  country: string;
  name: string;
};

export type Terminal = {
  dishSerialNumber: string;
  kitSerialNumber: string;
  serviceLineNumber: string;
  userTerminalId: string;
};

export type DailyUsage = {
  date: string; // YYYY-MM-DD
  usageGB: number;
};

export type UsageMonth = {
  dailyUsage?: DailyUsage[]; // only for currentMonth in your sample
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  serviceLineNumber: string;
  totalUsageGB: number;
  updatedAt?: string; // only for currentMonth in your sample
};

export type SatelliteUsage = {
  currentMonth: UsageMonth;
  previousMonth: UsageMonth;
};

export type Satellite = {
  terminals: Terminal[];
  usage: SatelliteUsage;
};

export type ManagedServiceByBwid = {
  bwid: string;
  customer: {
    id: string;
    name: string;
  };
  localSite: LocalSite;
  satellites: Satellite[];
  status: ManagedServiceStatus;
};

export type ManagedServiceByBwidQueryResult = {
  managedServiceByBwid: ManagedServiceByBwid | null;
};

export type ManagedServiceByBwidQueryVariables = {
  bwid: string;
};
