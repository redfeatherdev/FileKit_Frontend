import { Button, Input, Select } from 'rizzui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';

import { useDrawer } from '@/lib/store/drawer.store';
import { FixedDrawerBottom } from '@/components/atoms/fixed-drawer-bottom';
import { Box, Flex } from '@/components/atoms/layout';

export const CreateUserForm = ({ getUsers }: {
  getUsers: () => void
}) => {
  const { closeDrawer } = useDrawer();

  return (
    <Flex direction="col" align="stretch" className="gap-0 p-6 pb-24">
      <Formik initialValues={{
        name: '',
        email: '',
        status: '',
        submit: null
      }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          status: Yup.string().max(255).required('Status is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('email', values.email);
          formData.append('status', values.status);
          await axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_URL}/api/v1/admin/add-user`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then((res) => {
            if (res.status === 200) {
              setSubmitting(false);
              toast.success(res.data.msg);
              closeDrawer();
              getUsers();
            }
          }).catch((err) => {
            setSubmitting(false);
            toast.error(err.response.data.msg);
          })
        }}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Flex direction="col" align="stretch" className="gap-5">
              <Box>
                <Input
                  type="text"
                  name='name'
                  label="Name"
                  placeholder="Enter name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <div className='text-orange text-[13px] mt-2'>{errors.name}</div>
                )}
              </Box>

              <Box>
                <Input
                  type="text"
                  name='email'
                  label="Email"
                  placeholder="Enter email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <div className='text-orange text-[13px] mt-2'>{errors.email}</div>
                )}
              </Box>

              <Box>
                <Select
                  name='status'
                  label="Status"
                  selectClassName="border-steel-100 ring-0 dark:border-steel-500 dark:bg-steel-600/20"
                  options={[
                    { label: 'Active', value: 'Active' },
                    { label: 'Inactive', value: 'Inactive' },
                  ]}
                  value={values.status}
                  onChange={(e: any) => handleChange({
                    target: { name: 'status', value: e.value }
                  })}
                />

                {touched.status && errors.status && (
                  <div className='text-orange text-[13px] mt-2'>{errors.status}</div>
                )}
              </Box>

              <FixedDrawerBottom>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={closeDrawer}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full disabled:bg-[#F8F9FB]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <div className='flex justify-center items-center'>
                    <div className="h-6 w-6 rounded-full border-2 border-solid border-steel-500 border-t-transparent animate-spin"></div>
                  </div>
                    : <span>Save</span>
                  }
                </Button>
              </FixedDrawerBottom>
            </Flex>
          </form>
        )}
      </Formik>
    </Flex>
  );
};
