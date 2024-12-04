import { Button, Input } from 'rizzui';

import { Fieldset, Form } from '@/components/atoms/forms';
import { Box, Flex } from '@/components/atoms/layout';
import { PageHeader } from '@/components/atoms/page-header';

export const UpdateProfileForm = () => {
  return (
    <>
      <Form
        onSubmit={() => { console.log("submit") }}
        useFormProps={{
          defaultValues: {
            name: '',
            email: ''
          },
        }}
      >
        {({
          register,
          formState: { errors },
        }) => (
          <Box>
            <PageHeader
              title="Update your profile"
              description="View and update your profile"
              titleClassName="text-lg xl:text-xl"
              childrenClassName="flex [@media(min-width:375px)]:inline-flex"
              className="items-center"
              headingWrapperClassName="[@media(min-width:375px)]:w-auto"
            >
              <Flex justify="end">
                <Button
                  type="submit"
                  className="w-full [@media(min-width:375px)]:w-auto"
                >
                  Save changes
                </Button>
              </Flex>
            </PageHeader>
            <Fieldset title="Name" required>
              <Input
                type="text"
                placeholder="Enter your name"
                className="[&>label>span]:font-medium"
                {...register('name')}
                error={errors.name?.message}
              />
            </Fieldset>

            <Fieldset title="Email" description="Save your email from here">
              <Input
                type="email"
                placeholder="Enter your email"
                className="[&>label>span]:font-medium"
                {...register('email')}
                error={errors.email?.message}
              />
            </Fieldset>
          </Box>
        )}
      </Form>
    </>
  );
};
