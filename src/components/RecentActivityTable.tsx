import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import type { DeviceNode } from '../graphql/types';

type Props = {
  data: DeviceNode[];
};

const StatusPill = ({ status }: { status: 'online' | 'offline' }) => {
  const isOnline = status === 'online';
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1text-xs font-semibold ${
        isOnline
          ? 'bg-[#BAF3DB] border-3 border-[#1F845A] text-[#164B35]'
          : 'bg-red-100 border-3 border-[#AE2E24] text-[#AE2E24]'
      }`}
    >
      {isOnline ? 'Online' : 'Offline'}
    </span>
  );
};

const formatLastSeen = (iso: string) => {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) {
    return '-';
  }

  const now = Date.now();
  const diffMs = Math.max(0, now - t);
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) {
    return `${mins} minute(s) ago`;
  }

  const hours = Math.floor(mins / 60);
  return `${hours} hour(s) ago`;
};

const RecentActivityTable = ({ data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'lastSeenAt', desc: true },
  ]);

  const columns = useMemo<ColumnDef<DeviceNode>[]>(
    () => [
      {
        accessorKey: 'device',
        header: 'Device',
        cell: (info) => (
          <span className="text-slate-900">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: (info) => (
          <span className="text-slate-700">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusPill status={info.getValue<any>()} />,
        sortingFn: 'alphanumeric',
      },
      {
        accessorKey: 'lastSeen',
        header: 'Last seen',
        cell: (info) => formatLastSeen(info.getValue<string>()),
        sortingFn: 'datetime',
      },
      {
        accessorKey: 'signal',
        header: () => <div className="text-right">Signal</div>,
        cell: (info) => (
          <div className="text-right text-slate-900">
            {Math.round(info.getValue<number>())}%
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="overflow-x-auto border border-[#B9C1CB]">
        <table className="min-w-205 w-full border-collapse font-exo">
          <thead className=" text-base font-semibold text-slate-600">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isSorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="border-r border-b last:border-r-0 border-[#B9C1CB] px-3 py-3 text-left"
                      >
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-1 hover:text-slate-900"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {isSorted === 'asc' && '(Up icon)'}
                          {isSorted === 'desc' && '(Down icon)'}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="text-sm">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-3 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center text-sm text-slate-500"
                >
                  No recent activity
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;
