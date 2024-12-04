import axios from "axios";
import { toast } from "sonner";

import { Flex } from "@/components/atoms/layout";
import { PageHeader } from "@/components/atoms/page-header";

import AllScannedFilesTable from "@/components/organisms/all-scanned-files-table";
import useQueryParams from "@/hooks/useQueryParam";
import { useState } from "react";

const ScannedFileHistory = () => {

  const { queryParams } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<any | null>();
  const [totalCount, setTotalCount] = useState<number>(0);

  const getFiles = async () => {
    const page = queryParams.page ? Number(queryParams.page) : 1;
    const size = queryParams.size ? Number(queryParams.size) : 10;

    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/file/get-all-files`, {
        params: {
          page: page,
          size: size
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

  return (
    <Flex direction="col" align="stretch" className="gap-0">
      <PageHeader
        title="Scanned File History"
        description="All Files scanned by all users"
        titleClassName="text-xl"
        className="items-start flex-col 375px:flex-row w-full 375px:w-auto 375px:items-center"
        headingWrapperClassName="w-auto shrink"
        childrenClassName="w-full 375px:w-auto shrink" />

      <AllScannedFilesTable isLoading={isLoading} files={files} totalCount={totalCount} getFiles={getFiles} />
    </Flex>
  )
}

export default ScannedFileHistory;