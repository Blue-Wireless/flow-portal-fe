export type DateRangeKey = '7D' | '30D' | '3M' | '6M' | '12M';

export type UsagePoint = {
  date: string;
  valueMB: number;
};

// Format helper functions
export const formatDayLabel = (isoDate: string) => {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('en-SG', {
    day: '2-digit',
    month: 'short',
  });
};

export const formatMonthLabel = (isoDate: string) => {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('en-SG', {
    month: 'short',
    year: 'numeric',
  });
};

export const buildDailyMockSeries = (days: number): UsagePoint[] => {
  const out: UsagePoint[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const iso = date.toISOString().slice(0, 10);
    const valueMB = Math.round(200 + Math.random() * 1000);
    out.push({ date: iso, valueMB });
  }
  return out;
};

export const groupIntoWeeks = (points: UsagePoint[]) => {
  const out: UsagePoint[] = [];
  for (let i = 0; i < points.length; i += 7) {
    const weekPoints = points.slice(i, i + 7);
    const sum = weekPoints.reduce((acc, p) => acc + p.valueMB, 0);
    out.push({ date: weekPoints[0]!.date, valueMB: sum });
  }
  return out;
};

export const groupIntoMonths = (points: UsagePoint[]) => {
  const map = new Map<string, number>();
  for (const p of points) {
    const ym = p.date.slice(0, 7);
    map.set(ym, (map.get(ym) ?? 0) + p.valueMB);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([ym, valueMB]) => ({ date: ym + '-01', valueMB }));
};
