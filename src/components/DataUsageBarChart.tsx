import { useMemo, useState, } from 'react';
import type { DateRangeKey, UsagePoint } from '../utils/timeSeries';
import {
  formatDayLabel,
  formatMonthLabel,
  groupIntoMonths,
} from '../utils/timeSeries';

type Props = {
  range: DateRangeKey;
  points: UsagePoint[]; //data usage
};

type HoverState = {
  index: number;
  x: number;
  y: number;
} | null;

const DataUsageBarChart = ({ range, points }: Props) => {
  const [hover, setHover] = useState<HoverState>(null);

  const displayPoints = useMemo(() => {
    if (range === '7D' || range === '30D') {
      return points;
    }
    if (range === '3M' || range === '6M' || range === '12M') {
      return groupIntoMonths(points);
    }
    return points;
  }, [points, range]);

  const max = useMemo(() => {
    return Math.max(1, ...displayPoints.map((p) => p.valueMB));
  }, [displayPoints]);

  const getLabel = (p: UsagePoint) => {
    if (range === '7D' || range === '30D') {
      return formatDayLabel(p.date);
    }
    return formatMonthLabel(p.date);
  };

  const formatValue = (valueMB: number) => {
    if (valueMB >= 1024) return `${(valueMB / 1024).toFixed(1)} GB`;
    return `${valueMB} MB`;
  };

  const usagePeriod = useMemo(() => {
    switch (range) {
      case '7D':
        return 'Daily usage over 7 days';
      case '30D':
        return 'Daily usage over 30 days';
      case '3M':
        return 'Monthly usage over 3 months';
      case '6M':
        return 'Monthly usage over 6 months';
      case '12M':
        return 'Monthly usage over 12 months';
      default:
        return '';
    }
  }, [range]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{usagePeriod}</div>
        </div>

        <div className="text-right">
          <div>Total</div>
          <div className="text-lg font-semibold">
            {formatValue(displayPoints.reduce((acc, p) => acc + p.valueMB, 0))}
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="flex h-56 items-stretch justify-evenly gap-2 overflow-x-auto py-2">
          {displayPoints.map((p, i) => {
            const heightPct = (p.valueMB / max) * 100;
            const isActive = hover?.index === i;

            return (
              <div
                key={`${p.date}-${i}`}
                className="flex w-10 shrink-0 flex-col items-center gap-2"
                onMouseEnter={(e) => {
                  setHover({
                    index: i,
                    x: e.clientX,
                    y: e.clientY,
                  });
                }}
                onMouseMove={(e) => {
                  setHover((prev) =>
                    prev
                      ? { ...prev, index: i, x: e.clientX, y: e.clientY }
                      : prev,
                  );
                }}
                onMouseLeave={() => setHover(null)}
              >
                <div className="flex flex-1 w-full items-end">
                  <div
                    className={`w-full rounded-md transition-all ${isActive ? 'bg-[#1580D4]' : 'bg-[#8F7EE7]'}`}
                    style={{ height: `${heightPct}%` }}
                    aria-label={`${getLabel(p)}: ${formatValue(p.valueMB)}`}
                  />
                </div>
                <div className="mt-1 text-center text-[10px] font-semibold text-slate-600">
                  {getLabel(p)}
                </div>
              </div>
            );
          })}
        </div>

        {hover && displayPoints[hover.index] && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-2 rounded-lg bg-[#164555] px-2 py-1 text-xs"
            style={{ left: hover.x + 50, top: hover.y + 20 }}
          >
            <div className="font-semibold text-[#E3E8ED]">
              {getLabel(displayPoints[hover.index])}
            </div>
            <div className="text-[#E3E8ED]">
              {formatValue(displayPoints[hover.index].valueMB)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUsageBarChart;
