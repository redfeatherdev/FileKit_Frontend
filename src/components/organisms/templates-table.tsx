import { useEffect, useMemo, useState } from 'react';
import { Button, Text } from 'rizzui';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import prettyBytes from 'pretty-bytes';
import { format } from 'date-fns';

import { Flex } from "../atoms/layout";
import { SearchBox } from "../atoms/search-box";

import useQueryParams from "@/hooks/useQueryParam";
import { useDrawer } from "@/lib/store/drawer.store";
import { Table } from '../atoms/table/table';
import TablePagination from '../atoms/table/table-pagination';
import { Fallback } from '../molecules/Fallback';
import {
  DynamicFileIcon,
} from '@/components/atoms/dynamic-file-icon';
import { NoFilesIllustration } from '../atoms/illustrations/fallbacks/no-files-illustration';

const TemplatesTable = ({ isLoading, templates, totalCount, getTemplates }: {
  isLoading: boolean,
  templates: any,
  totalCount: number,
  getTemplates: () => void
}) => {
  const { openDrawer } = useDrawer();
  const { clearQueryParams, setQueryParams, queryParams } = useQueryParams();

  const filterParams = ['search'];
  const toggleClearBtn = filterParams.some((key) => {
    return key in queryParams;
  });

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'template.name',
        size: 200,
        cell: ({ row }) => {
          const name = row.original.template
            ? row.original.template.name
            : row.original.name;

          const type = row.original.template
            ? row.original.template.type
            : row.original.type;

          return (
            <Flex justify="start" className="gap-2.5 pl-2 py-1.5">
              <DynamicFileIcon
                className="w-6 h-auto shrink-0"
                iconType={type}
              />
              <Text className="capitalize max-w-[30ch] truncate text-custom-black dark:text-slate-300 font-medium ">
                {name}
              </Text>
            </Flex>
          );
        },
      },
      {
        header: 'File Size',
        accessorKey: 'template.size',
        size: 200,
        cell: ({ row }) => {
          const size = row.original.template
            ? row.original.template.size
            : row.original.size;

          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              {prettyBytes(size)}
            </Text>
          );
        },
      },
      {
        header: 'Created At',
        accessorKey: 'template.created_at',
        size: 100,
        cell: ({ row }) => {
          const created_at = row.original.template
            ? row.original.template.created_at
            : row.original.created_at;

          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              {format(created_at, 'MMM dd, yyyy')}
            </Text>
          );
        },
      },
      // {
      //   header: '',
      //   meta: {
      //     columnName: 'Operations',
      //   },
      //   enableHiding: false,
      //   accessorKey: 'id',
      //   size: 100,
      //   cell: ({ row }: { row: any }) => {
      //     const { id: id } = row.original;
      //     return (
      //       <Flex justify="end" className="gap-1">
      //         <Button
      //           aria-label="Edit User Button"
      //           type="button"
      //           variant="flat"
      //           className="w-8 h-8 p-1 dark:bg-steel-600 text-steel-400 hover:text-steel-600 dark:text-stone-300"
      //           onClick={() =>
      //             openDrawer(UpdateUserForm, 'Update User', 'Change user info', {
      //               user: row.original,
      //               getUsers: getUsers
      //             })
      //           }
      //         >
      //           <PiPencilThin className="text-[17px]" />
      //         </Button>
      //         <DeleteUserButton id={id} userId={user?.id} getUsers={getUsers} />
      //       </Flex>
      //     );
      //   },
      // },
    ],
    [openDrawer]
  );

  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({
    id: true,
    name: true,
    size: true,
    created_at: true,
  });

  const table = useReactTable({
    data: templates,
    columns,
    defaultColumn: {
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    enableSorting: false,
    pageCount: Math.ceil(totalCount / (queryParams.size ? Number(queryParams.size) : 10)) ?? -1,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const onPaginationChange = (page: number) => {
    setQueryParams({ page });
  };

  const onRowsPerPageChange = (rows: number) => {
    setQueryParams({ size: rows, page: 1 });
  };

  useEffect(() => {
    getTemplates();
  }, [queryParams]);

  return (
    <Flex direction="col" align="stretch" className="w-full gap-0 mt-0">
      <Flex justify="start" direction="col" className="gap-3 mb-10 lg:flex-row">
        <Flex
          justify="start"
          className="gap-3 lg:gap-5 flex-wrap lg:flex-nowrap"
        >
          <SearchBox
            className="w-full sm:w-auto lg:w-64 3xl:w-96"
            name="text"
            onClear={() => {
              setQueryParams({ search: '' });
            }}
            placeholder="Search templates"
            inputClassName="h-10"
            onSubmit={(search) => {
              setQueryParams({ search: search, page: 1 });
            }}
            defaultValue={queryParams?.search}
            queryParams={queryParams}
          />

          {toggleClearBtn && (
            <Button
              className="!h-10 w-full sm:w-auto !font-normal text-steel-500 dark:text-steel-400 hover:bg-steel-50 dark:hover:text-steel-100 dark:hover:bg-steel-600"
              onClick={() => {
                clearQueryParams();
              }}
              variant="text"
            >
              Clear Filters
            </Button>
          )}
        </Flex>
      </Flex>

      {isLoading ? <>
        <div className='mt-20 flex justify-center items-center'>
          <div className="h-10 w-10 rounded-full border-2 border-solid border-steel-500 border-t-transparent animate-spin"></div>
        </div>
      </> : templates?.length > 0 ? (
        <>
          <Table table={table} total={totalCount} />
          <Flex justify="end" className="mt-6">
            <TablePagination
              pageSize={queryParams.page ? Number(queryParams.size) : 10}
              setPageSize={onRowsPerPageChange as any}
              total={totalCount}
              current={queryParams.page ? Number(queryParams.page) : 1}
              onChange={onPaginationChange}
            />
          </Flex>
        </>
      ) : (
        <>
          <Flex justify="center" className="mt-10 mb-16">
            <Fallback
              illustration={NoFilesIllustration}
              illustrationClassName="min-w-[280px] max-w-[700px] h-auto"
              title="No file found."
            />
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default TemplatesTable;