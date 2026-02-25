// This is intentionally just a string type so your code looks Apollo-ish.
// Later you'll swap to: import { gql } from "@apollo/client";
export const gql = (strings: TemplateStringsArray) => strings.join("");

export const OVERVIEW_QUERY = gql`
  query Overview($filters: OverviewFiltersInput!) {
    overview(filters: $filters) {
      meta {
        filters { id label icon options { label value } }
        statCards { title image fields { label value unit } }
      }
      terminals { totalCount edges { node { id name latitude longitude status } } }
      devices { totalCount edges { node { id device location terminalId status lastSeenAt signalPct } } }
      usage { totalCount edges { node { date valueMB } } }
    }
  }
`;