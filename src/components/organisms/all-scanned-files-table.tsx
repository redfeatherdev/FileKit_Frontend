import { useEffect, useMemo, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { Avatar, Button, Modal, Popover, Text, Title } from 'rizzui';
import { format } from 'date-fns';

import { Box, Flex } from "../atoms/layout";
import useQueryParams from "@/hooks/useQueryParam";
import { Table } from "../atoms/table/table";
import TablePagination from "../atoms/table/table-pagination";
import { Fallback } from "../molecules/Fallback";
import { NoFilesIllustration } from "../atoms/illustrations/fallbacks/no-files-illustration";

import { RiDownload2Fill } from "react-icons/ri";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import axios from "axios";
import { TrashIcon } from '@heroicons/react/24/outline';

const AllScannedFilesTable = ({ isLoading, files, totalCount, getFiles }: {
  isLoading: boolean,
  files: any,
  totalCount: number,
  getFiles: () => void
}) => {

  const { setQueryParams, queryParams } = useQueryParams();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'file.name',
        size: 200,
        cell: ({ row }) => {
          const name = row.original.file
            ? row.original.file.name
            : row.original.name;

          return (
            <Flex justify="start" className="gap-2.5">
              <Avatar name={name} size="sm" />
              <Text className="capitalize text-steel-700 dark:text-steel-100/90">
                {name}
              </Text>
            </Flex>
          );
        },
      },
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
            <Flex justify="end" className="gap-2">

              <Button
                variant="flat"
                className="w-8 h-8 p-1 dark:bg-steel-600 text-steel-400 hover:text-steel-600 dark:text-stone-300"
                onClick={() => handleDownload(id)}
              >
                <RiDownload2Fill className="text-[17px]" />
              </Button>
              <DeleteRecordButton id={id} getFiles={getFiles} />
            </Flex>
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

const DeleteRecordButton = ({ id, getFiles }: {
  id: number,
  getFiles: () => void
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isExtraSmall = useMediaQuery('(max-width:424px )');

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/delete-file/${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        isModalOpen && setIsModalOpen(false);
        setIsLoading(false);
        getFiles();
      }
    } catch (err: any) {
      toast.error(err.response.data.msg);
    }
  }

  if (isExtraSmall) {
    return (
      <>
        <Button
          aria-label="Delete Record Button"
          onClick={() => setIsModalOpen(true)}
          color="danger"
          variant="flat"
          className="w-8 h-8 p-1 text-red-600 bg-red-100 hover:bg-red-200/70 dark:hover:bg-red-200/70"
        >
          <TrashIcon className="w-4" />
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          containerClassName="bg-white dark:bg-steel-800"
        >
          <Box className="p-4">
            <Title className="mb-2 text-lg font-semibold">Delete Record?</Title>
            <Text className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this record?
            </Text>
            <Flex className="gap-3 mt-6" justify="end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onClick={handleDelete}
                variant="flat"
                color="danger"
              >
                Delete
              </Button>
            </Flex>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <Popover placement="left">
      <Popover.Trigger>
        <Button
          aria-label="Delete User Button"
          color="danger"
          variant="flat"
          className="w-8 h-8 p-1 text-red-600 bg-red-100 hover:bg-red-200/70 dark:hover:bg-red-200/70"
        >
          <TrashIcon className="w-4" />
        </Button>
      </Popover.Trigger>

      <Popover.Content>
        {({ setOpen }) => (
          <>
            <Title className="mb-2 text-lg font-semibold">Delete Record?</Title>
            <Text className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this record?
            </Text>
            <Flex className="gap-3 mt-6" justify="end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                onClick={handleDelete}
                variant="flat"
                color="danger"
              >
                Delete
              </Button>
            </Flex>
          </>
        )}
      </Popover.Content>
    </Popover>
  );
}

export default AllScannedFilesTable;