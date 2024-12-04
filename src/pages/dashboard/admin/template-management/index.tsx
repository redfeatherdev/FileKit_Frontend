import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Flex } from "@/components/atoms/layout";
import { PageHeader } from "@/components/atoms/page-header";
import { CreateTemplateButton } from "@/components/organisms/create-template-button";
import TemplatesTable from "@/components/organisms/templates-table";
import useQueryParams from "@/hooks/useQueryParam";

const TemplateManagement = () => {
  const { queryParams } = useQueryParams();
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<any | null>();
  const [totalCount, setTotalCount] = useState<number>(0);

  const getTemplates = async () => {
    const search = queryParams.search ? queryParams.search : '';
    const page = queryParams.page ? Number(queryParams.page) : 1;
    const size = queryParams.size ? Number(queryParams.size) : 10;

    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/get-templates`, {
        params: {
          search: search,
          page: page,
          size: size
        }
      });

      if (res.status === 200) {
        setTemplates(res.data.templates);
        setTotalCount(res.data.total_counts);
        setIsLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response.data.msg)
    }
  }

  return (
    <Flex direction="col" align="stretch" className="gap-0">
      <PageHeader
        title="Manage Templates"
        description="View and manage all templates"
        titleClassName="text-xl"
        className="items-start flex-col 375px:flex-row w-full 375px:w-auto 375px:items-center"
        headingWrapperClassName="w-auto shrink"
        childrenClassName="w-full 375px:w-auto shrink "
      >
        <Flex justify="end" className="w-full">
          <CreateTemplateButton getTemplates={getTemplates} />
        </Flex>
      </PageHeader>

      <TemplatesTable isLoading={isLoading} templates={templates} totalCount={totalCount} getTemplates={getTemplates} />
    </Flex>
  )
}

export default TemplateManagement;