import type { OverviewQueryResult, OverviewQueryVariables } from './types';
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

    throw new Error('Mock client: query not implemented');
  },
};
