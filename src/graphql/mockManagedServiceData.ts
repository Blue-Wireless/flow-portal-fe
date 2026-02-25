import type { ManagedServiceByBwid } from './managedServiceTypes';

export const MOBILECORP = {
  id: 'cust-mobilecorp',
  name: 'Mobilecorp',
};

export const managedServiceByBwidMock: ManagedServiceByBwid[] = [
  {
    bwid: 'BWID-9387',
    customer: MOBILECORP,
    localSite: {
      country: 'Australia',
      name: 'Mobilecorp AU-Beverley Park',
    },
    satellites: [
      {
        terminals: [
          {
            dishSerialNumber: '4PBA00999575',
            kitSerialNumber: 'KIT4E00016301',
            serviceLineNumber: 'SL-5069509-33560-76',
            userTerminalId: '01000000-00000000-00e9eb57',
          },
        ],
        usage: {
          currentMonth: {
            dailyUsage: [
              { date: '2026-02-01', usageGB: 0.8 },
              { date: '2026-02-02', usageGB: 4.23 },
              { date: '2026-02-03', usageGB: 2.01 },
              { date: '2026-02-04', usageGB: 5.41 },
              { date: '2026-02-05', usageGB: 8.47 },
              { date: '2026-02-06', usageGB: 1.7 },
              { date: '2026-02-07', usageGB: 0.22 },
              { date: '2026-02-08', usageGB: 11.8 },
              { date: '2026-02-09', usageGB: 14.55 },
              { date: '2026-02-10', usageGB: 8.09 },
              { date: '2026-02-11', usageGB: 7.08 },
              { date: '2026-02-12', usageGB: 13.31 },
              { date: '2026-02-13', usageGB: 3.5 },
              { date: '2026-02-14', usageGB: 0.23 },
              { date: '2026-02-15', usageGB: 5.69 },
              { date: '2026-02-16', usageGB: 3.53 },
              { date: '2026-02-17', usageGB: 13.95 },
              { date: '2026-02-18', usageGB: 9.21 },
              { date: '2026-02-19', usageGB: 5.76 },
              { date: '2026-02-20', usageGB: 4.29 },
              { date: '2026-02-21', usageGB: 0.18 },
              { date: '2026-02-22', usageGB: 4.26 },
              { date: '2026-02-23', usageGB: 5.46 },
              { date: '2026-02-24', usageGB: 15.82 },
              { date: '2026-02-25', usageGB: 1.49 },
            ],
            startDate: '2026-02-01',
            endDate: '2026-03-01',
            serviceLineNumber: 'SL-5069509-33560-76',
            totalUsageGB: 151.04,
            updatedAt: '2026-02-25T03:51:26.964Z',
          },
          previousMonth: {
            startDate: '2026-01-01',
            endDate: '2026-02-01',
            serviceLineNumber: 'SL-5069509-33560-76',
            totalUsageGB: 72.58,
          },
        },
      },
    ],
    status: 'Active',
  },
  {
    bwid: 'BWID-9790',
    customer: MOBILECORP,
    localSite: {
      country: 'Australia',
      name: 'Mobilecorp AU-South Grafton',
    },
    satellites: [
      {
        terminals: [
          {
            dishSerialNumber: '4PBA01069367',
            kitSerialNumber: 'KIT4E00018896',
            serviceLineNumber: 'SL-6155621-86797-88',
            userTerminalId: '40c09191-01a18019-582921c3',
          },
        ],
        usage: {
          currentMonth: {
            dailyUsage: [
              { date: '2026-02-01', usageGB: 1.54 },
              { date: '2026-02-02', usageGB: 7.02 },
              { date: '2026-02-03', usageGB: 0.59 },
              { date: '2026-02-04', usageGB: 2.12 },
              { date: '2026-02-05', usageGB: 0.87 },
              { date: '2026-02-06', usageGB: 0.72 },
              { date: '2026-02-07', usageGB: 0.05 },
              { date: '2026-02-08', usageGB: 2.75 },
              { date: '2026-02-09', usageGB: 1.47 },
              { date: '2026-02-10', usageGB: 0.71 },
              { date: '2026-02-11', usageGB: 0.64 },
              { date: '2026-02-12', usageGB: 1.4 },
              { date: '2026-02-13', usageGB: 0.49 },
              { date: '2026-02-14', usageGB: 0.06 },
              { date: '2026-02-15', usageGB: 0.05 },
              { date: '2026-02-16', usageGB: 0.05 },
              { date: '2026-02-17', usageGB: 0.06 },
              { date: '2026-02-18', usageGB: 0.05 },
              { date: '2026-02-19', usageGB: 0.05 },
              { date: '2026-02-20', usageGB: 0.06 },
              { date: '2026-02-21', usageGB: 0.05 },
              { date: '2026-02-22', usageGB: 2.1 },
              { date: '2026-02-23', usageGB: 2.21 },
              { date: '2026-02-24', usageGB: 2.87 },
              { date: '2026-02-25', usageGB: 2.21 },
            ],
            endDate: '2026-03-01',
            serviceLineNumber: 'SL-6155621-86797-88',
            startDate: '2026-02-01',
            totalUsageGB: 30.19,
            updatedAt: '2026-02-25T05:47:56.966Z',
          },
          previousMonth: {
            endDate: '2026-02-01',
            serviceLineNumber: 'SL-6155621-86797-88',
            startDate: '2026-01-01',
            totalUsageGB: 26.15,
          },
        },
      },
    ],
    status: 'Active',
  },
];
