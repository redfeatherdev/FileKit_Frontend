import {
  flexRender,
  type Table as ReactTableType,
} from '@tanstack/react-table';
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from 'lucide-react';
import { Text, Title } from 'rizzui';


import { Flex } from '../layout';
import { TableBody } from './table-body';
import { TableCell } from './table-cell';
import { TableHead } from './table-head';
import { TableHeaderCell } from './table-header-cell';
import { TableRoot } from './table-root';
import { TableRow } from './table-row';

type TableType<T extends Record<string, any>> = {
  table: ReactTableType<T>;
  total?: number;
  noDataFallback?: React.ReactNode;
  tableRootClassName?: string;
  columnVisibilityWrapperClassName?: string;
};

export function Table<TData extends Record<string, any>>({
  table,
  total,
  noDataFallback,
  tableRootClassName,
}: TableType<TData>) {

  if (typeof table === 'undefined' || table === null) return null;

  const isEmptyTable = total === 0;

  return (
    <Flex direction="col" align="stretch" className="w-full gap-3">
      <Flex className="table-control-wrapper">
        <Text className="text-sm table-result-count font-medium text-steel-700 dark:text-steel-100">
          {total} {total && total < 2 ? 'Result Found' : 'Results Found'}
        </Text>
      </Flex>

      <TableRoot className={tableRootClassName}>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHead key={headerGroup.id}>
            <TableRow className="hover:bg-inherit dark:hover:bg-inherit">
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width:
                        header.getSize() === Number.MAX_SAFE_INTEGER
                          ? 'auto'
                          : header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex items-center gap-2'
                          : 'flex items-center gap-2',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort()
                        ? {
                          asc: <ArrowUpWideNarrow className="w-4 h-4" />,
                          desc: <ArrowDownWideNarrow className="w-4 h-4" />,
                        }[header.column.getIsSorted() as string] ??
                        (header.column.columnDef.header !== '' && (
                          <ArrowDownUp className="w-4 h-4" />
                        ))
                        : null}
                    </div>
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
        ))}

        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    {...{
                      className: 'td break-words box-border',
                      style: {
                        width:
                          cell.column.getSize() === Number.MAX_SAFE_INTEGER
                            ? 'auto'
                            : cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </TableRoot>
      {isEmptyTable && (
        <>
          {noDataFallback ? (
            noDataFallback
          ) : (
            <Flex align="center" justify="center" className="w-full h-60">
              <Title className="text-steel-400">No Data Found</Title>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
}
