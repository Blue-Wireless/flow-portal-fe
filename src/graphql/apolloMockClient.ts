import type { OverviewQueryResult, OverviewQueryVariables } from './types';
import type {
  ManagedServiceByBwidQueryResult,
  ManagedServiceByBwidQueryVariables,
} from './managedServiceTypes';
import { managedServiceByBwidMock } from './mockManagedServiceData';
import { queryOverview } from './mockClient';

// Very small “Apollo-ish” client facade
export const apolloMockClient = {
  query: async <TData, TVars>(args: {
    query: string;
    variables: TVars;
  }): Promise<{ data: TData }> => {
    // Here we only support the overview query. You can expand later.
    if (args.query.includes('query Overview')) {
      const data = (await queryOverview(args.variables as any)) as any;
      return { data };
    }

    if (args.query.includes('query ManagedServiceByBwid')) {
      const { bwid } = args.variables as any as { bwid: string };

      const found =
        managedServiceByBwidMock.find((s) => s.bwid === bwid) ?? null;

      await new Promise((r) => setTimeout(r, 120));

      return { data: { managedServiceByBwid: found } as any as TData };
    }

    throw new Error('Mock client: query not implemented');
  },
};
