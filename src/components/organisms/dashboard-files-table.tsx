import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { Text } from 'rizzui';

import { cn } from '@/lib/utils/cn';
import { FilesTableNoFileIllustration } from '@/components/atoms/illustrations/fallbacks/files-table-no-file-illustration';
import { Box, Flex } from '@/components/atoms/layout';
import { Table } from '@/components/atoms/table/table';
import { DynamicFileIcon, FileIconType } from '@/components/atoms/dynamic-file-icon';
import { Fallback } from '@/components/molecules/Fallback';
import ScanButton from './scan-button';

export const DashboardFilesTable = ({ files }: { files: any[] }) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        maxSize: 350,
        enableSorting: true,
        cell: ({ row }) => {
          const iconType = row.original.type as FileIconType | null;
          return (
            <div>
              <Flex justify="start" className="gap-2.5 pl-3.5 py-1.5 cursor-pointer">
                <DynamicFileIcon
                  className="w-8 h-auto shrink-0"
                  iconType={iconType}
                />
                <Text className="max-w-[30ch] truncate text-custom-black dark:text-slate-300 font-medium ">
                  {row.original.name}
                </Text>
              </Flex>
            </div>
          );
        },
      },
      {
        header: 'Type',
        accessorKey: 'type',
        maxSize: 100,
        enableSorting: false,
        cell: ({ row }) => (
          <Flex justify="start" className="gap-2">
            <Text className="text-steel-400 dark:text-steel-400">
              {row.original.type}
            </Text>
          </Flex>
        ),
      },
      {
        header: 'Modified',
        accessorKey: 'updatedAt',
        maxSize: 150,
        enableSorting: true,
        cell: ({ row }) => (
          <Flex direction="col" align="start" className="gap-1">
            <Text className="text-custom-black dark:text-slate-300 font-medium">
              {format(row.original.updatedAt, 'MMM dd, yyyy')}
            </Text>
            <Text className="text-steel-400 dark:text-steel-400 text-[13px]">
              {format(row.original.updatedAt, 'h:mm aaa')}
            </Text>
          </Flex>
        ),
      },
    ],
    []
  );

  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({
    createdAt: true,
    id: true,
    role: true,
    status: true,
    user_email: true,
    user_name: true,
  });

  const table = useReactTable({
    data: files,
    columns,
    manualSorting: true,
    defaultColumn: {
      size: Number.MAX_SAFE_INTEGER,
    },
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box>
      <Flex justify="between" align="center" className="mb-3 lg:mb-6">
        <Text className="font-bold lg:text-lg text-custom-black dark:text-slate-300">
          Total Files (2)
        </Text>
        <ScanButton />
      </Flex>
      <Flex direction="col" align="stretch" className="w-full gap-0">
        <Box
          className={cn(
            '[&_table_thead]:border-0 first-of-type:[&_table_thead_tr_th]:px-6 first-of-type:[&_table_thead_tr_th]:py-5 [&_table_thead_tr_th]:font-semibold [&_table_thead]:border-b [&_table_thead]:border-steel-100 dark:[&_table_thead]:border-steel-600/60 [&_table_thead]:bg-[#F1F5F9]/0 dark:[&_table_thead]:bg-[#F1F5F9]/0 rounded-xl overflow-hidden border border-steel-100 dark:border-steel-600/60 [&_table]:border-0 [&_table_tbody]:divide-y-0 [&_table_tbody_tr_td]:py-[9.5px] [&_table_tbody_tr:hover]:bg-[#F1F5F9]/50 dark:[&_table_tbody_tr:hover]:bg-gray-600/10 [&_.table-control-wrapper]:hidden',
            !files.length && '[&_table_thead]:hidden'
          )}
        >
          <Table
            table={table}
            total={files.length}
            noDataFallback={
              <Fallback
                className="p-12"
                illustration={FilesTableNoFileIllustration}
                illustrationClassName="w-80 h-auto"
                title="No Files"
                subtitle="Please start uploading files"
              />
            }
          />
        </Box>
      </Flex>
    </Box>
  );
};