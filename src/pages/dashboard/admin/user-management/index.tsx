import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';

import { PageHeader } from "@/components/atoms/page-header";
import { Flex } from '@/components/atoms/layout';
import { CreateUserButton } from "@/components/organisms/create-user-button";
import UsersTable from "@/components/organisms/users-table";
import useQueryParams from "@/hooks/useQueryParam";

const UserManagement = () => {
  const { queryParams } = useQueryParams();
  const [isLoading, setisLoading] = useState(false);
  const [users, setUsers] = useState<any | null>();
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);

  const getUsers = async () => {
    const search = queryParams.search ? queryParams.search : '';
    const status = queryParams.status ? queryParams.status : '';
    const page = queryParams.page ? Number(queryParams.page) : 1;
    const size = queryParams.size ? Number(queryParams.size) : 10;

    try {
      setisLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/get-users`, {
        params: {
          search: search,
          status: status,
          page: page,
          size: size
        }
      });

      if (res.status === 200) {
        setUsers(res.data.users);
        setTotalUsersCount(res.data.total_users_count);
        setisLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response.data.msg)
    }
  }

  return (
    <Flex direction="col" align="stretch" className="gap-0">
      <PageHeader
        title="Manage Users"
        description="View and manage all users"
        titleClassName="text-xl"
        className="items-start flex-col 375px:flex-row w-full 375px:w-auto 375px:items-center"
        headingWrapperClassName="w-auto shrink"
        childrenClassName="w-full 375px:w-auto shrink "
      >
        <Flex justify="end" className="w-full">
          <CreateUserButton getUsers={getUsers} />
        </Flex>
      </PageHeader>

      <UsersTable isLoading={isLoading} users={users} totalUsersCount={totalUsersCount} getUsers={getUsers} />
    </Flex>
  )
}

export default UserManagement;