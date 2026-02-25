// Mock useQuery hook to imitate apollo

import { useCallback, useEffect, useMemo, useState } from 'react';
import { apolloMockClient } from './apolloMockClient';

type UseQueryResult<TData> = {
  data: TData | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => Promise<void>;
};

// Apollo-like behavior: runs on mount + when variables change
export const useQuery = <TData, TVars extends object>(args: {
  query: string;
  variables: TVars;
}): UseQueryResult<TData> => {
  const { query, variables } = args;

  const varsKey = useMemo(() => JSON.stringify(variables), [variables]);

  const [data, setData] = useState<TData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const run = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await apolloMockClient.query<TData, TVars>({
        query,
        variables,
      });
      setData(res.data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [query, varsKey]);

  useEffect(() => {
    void run();
  }, [run]);

  const refetch = useCallback(async () => {
    await run();
  }, [run]);

  return { data, loading, error, refetch };
};
