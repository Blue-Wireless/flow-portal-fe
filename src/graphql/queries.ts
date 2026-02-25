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

export const MANAGED_SERVICE_BY_BWID_QUERY = gql`
  query ManagedServiceByBwid($bwid: String!) {
    managedServiceByBwid(bwid: $bwid) {
      bwid
      localSite { country name }
      satellites {
        terminals { dishSerialNumber kitSerialNumber serviceLineNumber userTerminalId }
        usage {
          currentMonth {
            dailyUsage { date usageGB }
            startDate endDate serviceLineNumber totalUsageGB updatedAt
          }
          previousMonth { startDate endDate serviceLineNumber totalUsageGB }
        }
      }
      status
    }
  }
`;