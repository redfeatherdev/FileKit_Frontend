import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Avatar, Badge, Button, Modal, Popover, Select, Text, Title } from 'rizzui';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

import { PiPencilThin } from 'react-icons/pi';
import { TrashIcon } from '@heroicons/react/24/outline';
import { NoContactIllustration } from '../atoms/illustrations/fallbacks/no-contact-illustration';

import { Table } from '../atoms/table/table';
import TablePagination from '../atoms/table/table-pagination';
import { Box, Flex } from '@/components/atoms/layout';
import { SearchBox } from '@/components/atoms/search-box';
import { Fallback } from "@/components/molecules/Fallback";
import { getOptionByValue } from '@/lib/utils/getOptionByValue';
import { useDrawer } from '@/lib/store/drawer.store';
import useQueryParams from '@/hooks/useQueryParam';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuthStore } from '@/lib/store/main.store';
import { UpdateUserForm } from './forms/update-user-form';

const userStatusOptions = [
  {
    label: 'All',
    value: '*'
  },
  {
    label: 'Active',
    value: 'Active'
  },
  {
    label: 'Inactive',
    value: 'Inactive'
  }
]

const UsersTable = ({ isLoading, users, totalUsersCount, getUsers }: {
  isLoading: boolean,
  users: any,
  totalUsersCount: number,
  getUsers: () => void
}) => {
  const { openDrawer } = useDrawer();
  const { clearQueryParams, setQueryParams, queryParams } = useQueryParams();
  const { user } = useAuthStore() as { user: any };

  const filterParams = ['search', 'status'];
  const toggleClearBtn = filterParams.some((key) => {
    return key in queryParams;
  });

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'user.name',
        size: 200,
        cell: ({ row }) => {
          const name = row.original.user
            ? row.original.user.name
            : row.original.name;

          const image = row.original.user ? row.original.user.image : null;

          return (
            <Flex justify="start" className="gap-2.5">
              <Avatar name={name} src={image} size="sm" />
              <Text className="capitalize text-steel-700 dark:text-steel-100/90">
                {name}
              </Text>
            </Flex>
          );
        },
      },
      {
        header: 'Email',
        accessorKey: 'user.email',
        size: 200,
        cell: ({ row }) => {
          const email = row.original.user
            ? row.original.user.email
            : row.original.email;

          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              {email}
            </Text>
          );
        },
      },
      {
        header: 'Role',
        accessorKey: 'user.role',
        size: 100,
        cell: ({ row }) => {
          const role = row.original.user
            ? row.original.user.role
            : row.original.role;

          return (
            <Text className="text-steel-700 dark:text-steel-100/90">
              {role}
            </Text>
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        size: 100,
        enableSorting: false,
        cell: ({ row }) => {
          function statusColor(status: string) {
            if (status === 'Inactive') return 'danger';
            return 'success';
          }

          return (
            <Flex justify="start" className="gap-2">
              <Badge color={statusColor(row.original.status)} renderAsDot />
              <Text className="text-steel-700 dark:text-steel-100/90">
                {userStatusOptions.filter(userStatus => userStatus.value === row.original.status)[0].label}
              </Text>
            </Flex>
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
            <Flex justify="end" className="gap-1">
              <Button
                aria-label="Edit User Button"
                type="button"
                variant="flat"
                className="w-8 h-8 p-1 dark:bg-steel-600 text-steel-400 hover:text-steel-600 dark:text-stone-300"
                onClick={() =>
                  openDrawer(UpdateUserForm, 'Update User', 'Change user info', {
                    user: row.original,
                    getUsers: getUsers
                  })
                }
              >
                <PiPencilThin className="text-[17px]" />
              </Button>
              <DeleteUserButton id={id} userId={user?.id} getUsers={getUsers} />
            </Flex>
          );
        },
      },
    ],
    [openDrawer]
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
    data: users,
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
    pageCount: Math.ceil(totalUsersCount / (queryParams.size ? Number(queryParams.size) : 10)) ?? -1,
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
    getUsers();
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
            placeholder="Search users"
            inputClassName="h-10"
            onSubmit={(search) => {
              setQueryParams({ search: search, page: 1 });
            }}
            defaultValue={queryParams?.search}
            queryParams={queryParams}
          />

          <Select
            placeholder="Filter By Status"
            className="w-full sm:w-auto lg:w-52 xl:w-44"
            optionClassName="capitalize"
            options={userStatusOptions}
            onChange={(value: string) => {
              setQueryParams({ status: value, page: 1 });
            }}
            getOptionValue={(option) => option?.value}
            value={queryParams?.status ?? ''}
            displayValue={(value) =>
              getOptionByValue(userStatusOptions, value as any)?.label
            }
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
      </> : users?.length > 0 ? (
        <>
          <Table table={table} total={totalUsersCount} />
          <Flex justify="end" className="mt-6">
            <TablePagination
              pageSize={queryParams.page ? Number(queryParams.size) : 10}
              setPageSize={onRowsPerPageChange as any}
              total={totalUsersCount}
              current={queryParams.page ? Number(queryParams.page) : 1}
              onChange={onPaginationChange}
            />
          </Flex>
        </>
      ) : (
        <>
          <Flex justify="center" className="mt-10 mb-16">
            <Fallback
              illustration={NoContactIllustration}
              illustrationClassName="min-w-[280px] max-w-[700px] h-auto"
              title="No user found."
            />
          </Flex>
        </>
      )
      }
    </Flex >
  )
}

const DeleteUserButton = ({ id, userId, getUsers }: {
  id: number,
  userId: number,
  getUsers: () => void
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isExtraSmall = useMediaQuery('(max-width:424px )');

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/admin/delete-user/${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        isModalOpen && setIsModalOpen(false);
        setIsLoading(false);
        getUsers();
      }
    } catch (err: any) {
      toast.error(err.response.data.msg);
    }
  }

  if (isExtraSmall) {
    return (
      <>
        <Button
          aria-label="Delete User Button"
          onClick={() => setIsModalOpen(true)}
          disabled={userId === id}
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
            <Title className="mb-2 text-lg font-semibold">Delete User?</Title>
            <Text className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this user?
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
          disabled={userId === id}
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
            <Title className="mb-2 text-lg font-semibold">Delete User?</Title>
            <Text className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this user?
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

export default UsersTable;