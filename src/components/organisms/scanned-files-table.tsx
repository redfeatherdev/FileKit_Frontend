import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { Button, Text } from 'rizzui';
import { format } from 'date-fns';

import { Flex } from "../atoms/layout";
import useQueryParams from "@/hooks/useQueryParam";
import { Table } from "../atoms/table/table";
import TablePagination from "../atoms/table/table-pagination";
import { Fallback } from "../molecules/Fallback";
import { NoFilesIllustration } from "../atoms/illustrations/fallbacks/no-files-illustration";

import { RiDownload2Fill } from "react-icons/ri";
import { toast } from "sonner";

const ScannedFilesTable = ({ isLoading, files, totalCount, getFiles }: {
  isLoading: boolean,
  files: any,
  totalCount: number,
  getFiles: () => void
}) => {

  const { setQueryParams, queryParams } = useQueryParams();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Processed Date',
        accessorKey: 'file.created_at',
        size: 200,
        cell: ({ row }) => {
          const created_at = row.original.file
            ? row.original.file.created_at
            : row.original.created_at;

          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              {format(created_at, 'MMM dd, yyyy')}
            </Text>
          );
        },
      },
      {
        header: 'Backup Source',
        accessorKey: 'file.id',
        size: 200,
        cell: () => {
          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              Auto Classification
            </Text>
          );
        },
      },
      {
        header: 'Page Scanned',
        accessorKey: 'file.id',
        size: 200,
        cell: ({ row }) => {
          const total_pages = row.original.file
            ? row.original.file.total_pages
            : row.original.total_pages;

          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              {total_pages}
            </Text>
          );
        },
      },
      {
        header: '',
        meta: {
          columnName: 'Operations',
        },
        enableHiding: false,
        accessorKey: 'id',
        size: 100,
        cell: ({ row }: { row: any }) => {
          const { id: id } = row.original;
          return (
            <Button
              variant="flat"
              className="w-8 h-8 p-1 dark:bg-steel-600 text-steel-400 hover:text-steel-600 dark:text-stone-300"
              onClick={() => handleDownload(id)}
            >
              <RiDownload2Fill className="text-[17px]" />
            </Button>
          );
        },
      },
    ],
    []
  );

  const [columnVisibility, setColumnVisibility] = useState<{
    [key: string]: boolean;
  }>({
    id: true,
    total_pages: true,
    created_at: true,
  });

  const table = useReactTable({
    data: files,
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

  const handleDownload = async (id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/file/download/${id}`, {
        method: "GET",
      });

      if (res.status === 200) {
        const blob = await res.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        const contentDisposition = res.headers.get("Content-Disposition");
        let fileName = "downloaded_file";
        if (contentDisposition && contentDisposition.includes("filename=")) {
          fileName = contentDisposition.split("filename=")[1].replace(/"/g, "");
        }

        link.setAttribute("download", fileName);

        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);

        window.URL.revokeObjectURL(url);

        toast.success("File downloaded successfully!");
      }
    } catch (err: any) {
      toast.error(err.response.data.msg || "An error occurred during file download");
    }
  };

  const onPaginationChange = (page: number) => {
    setQueryParams({ page });
  };

  const onRowsPerPageChange = (rows: number) => {
    setQueryParams({ size: rows, page: 1 });
  };

  useEffect(() => {
    getFiles();
  }, [queryParams]);

  return (
    <Flex direction="col" align="stretch" className="w-full gap-0 mt-0">
      {isLoading ? <>
        <div className='mt-20 flex justify-center items-center'>
          <div className="h-10 w-10 rounded-full border-2 border-solid border-steel-500 border-t-transparent animate-spin"></div>
        </div>
      </> : files?.length > 0 ? (
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

export default ScannedFilesTable;