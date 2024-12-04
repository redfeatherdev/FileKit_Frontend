import { Controller, SubmitHandler } from 'react-hook-form';
import { Button, Text } from 'rizzui';
import { toast } from 'sonner';
import isEmpty from 'lodash/isEmpty';
import { Flex } from "@/components/atoms/layout";
import { Form } from "@/components/atoms/forms";
import { FixedDrawerBottom } from '@/components/atoms/fixed-drawer-bottom';
import { useDrawer } from "@/lib/store/drawer.store"
import { useState } from "react";
import { UploadFileInput, UploadFileSchema } from "@/lib/validations/file.schema";
import { Uploader } from '@/components/molecules/uploader/uploader';
import { acceptedDocumentType } from '@/lib/utils/file';

export const CreateTemplateForm = ({ getTemplates }: {
  getTemplates: () => void
}) => {
  const { closeDrawer } = useDrawer();
  const [reset, setReset] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit: SubmitHandler<UploadFileInput> = async (
    inputs: UploadFileInput
  ) => {
    try {
      if (isEmpty(inputs.file)) {
        toast.error("Please upload at least one file.");
        return;
      }

      setIsUploading(true);

      const formData = new FormData();
      inputs.file.forEach((file: File) => {
        formData.append("files", file);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/admin/add-template`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to upload files");
      }

      const result = await response.json();
      toast.success(result.msg || "Files uploaded successfully");
      getTemplates();

      setIsUploading(false);
      setReset({ file: [] });
      closeDrawer();
    } catch (err: any) {
      setIsUploading(false);
      toast.error(err.message || "An error occurred during upload");
    }
  };

  return (
    <Flex direction="col" align="stretch" className="gap-0 p-6 pb-24">
      <Form<UploadFileInput>
        validationSchema={UploadFileSchema}
        resetValues={reset}
        onSubmit={onSubmit}
      >
        {({
          control,
          formState: { errors, defaultValues },
        }) => (
          <Flex direction="col" align="stretch" className="gap-5">
            <Controller
              control={control}
              name="file"
              render={({ field: { onChange } }) => {
                return (
                  <Flex direction="col" align="stretch">
                    <Uploader
                      multiple
                      onChange={(files: File[]) => {
                        onChange(files);
                      }}
                      placeholder="Upload your files. 5MB max."
                      defaultValue={defaultValues?.file}
                      accept={acceptedDocumentType()}
                    />
                    <Text className="text-red text-xs mt-0.5">
                      {errors.file?.message as string}
                    </Text>
                  </Flex>
                );
              }}
            />

            <FixedDrawerBottom>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={closeDrawer}
              >
                Cancel
              </Button>

              <Button
                isLoading={isUploading}
                type="submit"
                size="lg"
                className="w-full"
              >
                Upload
              </Button>
            </FixedDrawerBottom>

          </Flex>
        )}
      </Form>
    </Flex>
  )
}