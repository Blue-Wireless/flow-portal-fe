import type { OverviewQueryResult, OverviewQueryVariables, UsagePointNode } from "./types";
import { buildDailyMockSeries } from "../utils/timeSeries";
import {
  terminalNodes,
  generateDeviceNodes,
  overviewFilterMeta,
  overviewStatCardsMeta,
} from "./mockData";

const toConnection = <T,>(nodes: T[]) => ({
  edges: nodes.map((node) => ({ node })),
  totalCount: nodes.length,
});

const getUsageForRange = (range: OverviewQueryVariables["filters"]["dateRange"]): UsagePointNode[] => {
  const days =
    range === "7D" ? 7 :
    range === "30D" ? 30 :
    range === "3M" ? 90 :
    range === "6M" ? 180 :
    365;

  return buildDailyMockSeries(days);
};

export const queryOverview = async (
  variables: OverviewQueryVariables
): Promise<OverviewQueryResult> => {
  // In “real GraphQL”, filters affect results.
  // Here we only use dateRange for usage; you can add filtering later.
  const usage = getUsageForRange(variables.filters.dateRange);

  // ✅ devices and terminals come from same “API”
  const devices = generateDeviceNodes(30);

  await new Promise((r) => setTimeout(r, 150));

  return {
    overview: {
      meta: {
        filters: overviewFilterMeta,
        statCards: overviewStatCardsMeta,
      },
      terminals: toConnection(terminalNodes),
      devices: toConnection(devices),
      usage: toConnection(usage),
    },
  };
};