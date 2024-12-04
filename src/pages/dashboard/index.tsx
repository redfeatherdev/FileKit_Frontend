import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store/main.store"

import { Flex } from "@/components/atoms/layout";
import { PageHeader } from "@/components/atoms/page-header";
import { FileScanButton } from "@/components/organisms/file-scan-button";
import useQueryParams from "@/hooks/useQueryParam";
import { toast } from "sonner";

import ScannedFilesTable from "@/components/organisms/scanned-files-table";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore() as { user: any };

  const { queryParams } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any | null>();
  const [totalCount, setTotalCount] = useState<number>(0);

  const getFiles = async () => {
    const page = queryParams.page ? Number(queryParams.page) : 1;
    const size = queryParams.size ? Number(queryParams.size) : 10;
    const userId = user.id;

    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/file/get-files`, {
        params: {
          page: page,
          size: size,
          userId: userId
        }
      });

      if (res.status === 200) {
        setFiles(res.data.files);
        setTotalCount(res.data.total_files_count);
        setIsLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response.data.msg)
    }
  }

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate("/admin/users")
      }
    }
  }, [user]);

  return (
    <Flex direction="col" align="stretch" className="gap-0">
      <PageHeader
        title="Manage your files"
        description="Scan your files and extract"
        titleClassName="text-xl"
        className="items-start flex-col 375px:flex-row w-full 375px:w-auto 375px:items-center"
        headingWrapperClassName="w-auto shrink"
        childrenClassName="w-full 375px:w-auto shrink ">
        <Flex justify="end" className="w-full">
          <FileScanButton getFiles={getFiles} />
        </Flex>
      </PageHeader>

      <ScannedFilesTable isLoading={isLoading} files={files} totalCount={totalCount} getFiles={getFiles} />
    </Flex>
  )
}

export default Dashboard