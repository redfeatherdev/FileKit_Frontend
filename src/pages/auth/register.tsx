import { Link, useNavigate } from 'react-router-dom';
import { Button, Text, Input } from 'rizzui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'sonner';

import { Box, Flex } from "@/components/atoms/layout";
import { LoginIllustration } from '@/components/atoms/illustrations/login-illustration';
import { FaUser } from "react-icons/fa6";
import { Envelop } from '@/components/atoms/icons/envelop';
import { PasswordIcon } from '@/components/atoms/icons/password';

const Register = () => {
  const navigate = useNavigate();

  return (
    <Box className="grid w-screen min-h-screen md:grid-cols-2 bg-white dark:bg-steel-900">
      <Flex
        className="p-6 sm:p-8 md:py-24 lg:p-12 w-full h-full"
        direction="col"
        justify="start"
      >
        <Box className="md:w-full w-full h-full max-w-[550px] flex flex-col gap-10 justify-center">
          <Box>
            <Text className="text-xl lg:text-3xl lg:leading-10 mx-auto font-bold text-center max-w-[18ch] text-custom-black dark:text-[#CBD5E1]">
              Welcome to the FileKit!
            </Text>
            <Text className="text-custom-gray darkK:text-[#94A3B8] mt-3 text-sm lg:text-base text-center">
              Please register your account here
            </Text>
          </Box>
          <Formik initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            submit: null
          }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Username is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().min(6, 'Password must be at least 6 characters').max(255).required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Password must match')
                .required('Confirm password is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('email', values.email);
              formData.append('password', values.password);
              formData.append('confirmPassword', values.confirmPassword);
              await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
              }).then((res) => {
                if (res?.status === 200) {
                  setSubmitting(false);
                  toast.success(res.data.msg);
                  navigate("/auth/login");
                }
              }).catch((err) => {
                setSubmitting(false);
                toast.error(err.response.data.msg);
              })
            }}>
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Box>
                  <Input
                    autoComplete="off"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="[&_.rizzui-input-container]:bg-white dark:[&_.rizzui-input-container]:bg-transparent [&_.rizzui-input-container]:focus:ring-gray-500 [&_.rizzui-input-container_input]:w-full lg:[&_.rizzui-input-container]:h-14 [&_.rizzui-input-container]:w-full 3xl:[&_.rizzui-input-container]:w-full [&_.rizzui-input-container]:px-3 md:[&_.rizzui-input-container]:px-5 xl:[&_.rizzui-input-container]:px-7"
                    inputClassName="[&.is-focus]:border-gray-500 ring-[#CBD5E1] dark:ring-[#3B404F] [&.is-focus]:ring-2 [&.is-focus]:ring-[#CBD5E1] dark:[&.is-focus]:ring-[#3B404F] [&.is-hover]:border-0 border-0 ring-1 lg:text-base text-[#475569] dark:text-steel-100/40"
                    prefix={<FaUser className="w-5 md:w-6 h-5 md:h-5" />}
                  />
                  {touched.name && errors.name && (
                    <div className='text-orange text-[13px] mt-2'>{errors.name}</div>
                  )}
                  <Input
                    autoComplete="off"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="[&_.rizzui-input-container]:bg-white dark:[&_.rizzui-input-container]:bg-transparent [&_.rizzui-input-container]:focus:ring-gray-500 [&_.rizzui-input-container_input]:w-full lg:[&_.rizzui-input-container]:h-14 [&_.rizzui-input-container]:w-full 3xl:[&_.rizzui-input-container]:w-full [&_.rizzui-input-container]:px-3 md:[&_.rizzui-input-container]:px-5 xl:[&_.rizzui-input-container]:px-7 mt-5"
                    inputClassName="[&.is-focus]:border-gray-500 ring-[#CBD5E1] dark:ring-[#3B404F] [&.is-focus]:ring-2 [&.is-focus]:ring-[#CBD5E1] dark:[&.is-focus]:ring-[#3B404F] [&.is-hover]:border-0 border-0 ring-1 lg:text-base text-[#475569] dark:text-steel-100/40"
                    prefix={<Envelop className="w-5 md:w-6 h-5 md:h-6" />}
                  />
                  {touched.email && errors.email && (
                    <div className='text-orange text-[13px] mt-2'>{errors.email}</div>
                  )}
                  <Input
                    autoComplete="off"
                    name="password"
                    type={"password" as any}
                    placeholder="Enter your password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="[&_.rizzui-input-container]:bg-white dark:[&_.rizzui-input-container]:bg-transparent [&_.rizzui-input-container]:focus:ring-gray-500 [&_.rizzui-input-container_input]:w-full lg:[&_.rizzui-input-container]:h-14 [&_.rizzui-input-container]:w-full 3xl:[&_.rizzui-input-container]:w-full [&_.rizzui-input-container]:px-3 md:[&_.rizzui-input-container]:px-5 xl:[&_.rizzui-input-container]:px-7 mt-5"
                    inputClassName="[&.is-focus]:border-gray-500 ring-[#CBD5E1] dark:ring-[#3B404F] [&.is-focus]:ring-2 [&.is-focus]:ring-[#CBD5E1] dark:[&.is-focus]:ring-[#3B404F] [&.is-hover]:border-0 border-0 ring-1 lg:text-base text-[#475569] dark:text-steel-100/40"
                    prefix={<PasswordIcon className="w-5 md:w-6 h-5 md:h-6" />}
                  />
                  {touched.password && errors.password && (
                    <div className='text-orange text-[13px] mt-2'>{errors.password}</div>
                  )}
                  <Input
                    autoComplete="off"
                    name="confirmPassword"
                    type={"password" as any}
                    placeholder="Confirm your password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="[&_.rizzui-input-container]:bg-white dark:[&_.rizzui-input-container]:bg-transparent [&_.rizzui-input-container]:focus:ring-gray-500 [&_.rizzui-input-container_input]:w-full lg:[&_.rizzui-input-container]:h-14 [&_.rizzui-input-container]:w-full 3xl:[&_.rizzui-input-container]:w-full [&_.rizzui-input-container]:px-3 md:[&_.rizzui-input-container]:px-5 xl:[&_.rizzui-input-container]:px-7 mt-5"
                    inputClassName="[&.is-focus]:border-gray-500 ring-[#CBD5E1] dark:ring-[#3B404F] [&.is-focus]:ring-2 [&.is-focus]:ring-[#CBD5E1] dark:[&.is-focus]:ring-[#3B404F] [&.is-hover]:border-0 border-0 ring-1 lg:text-base text-[#475569] dark:text-steel-100/40"
                    prefix={<PasswordIcon className="w-5 md:w-6 h-5 md:h-6" />}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className='text-orange text-[13px] mt-2'>{errors.confirmPassword}</div>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex font-semibold items-center justify-center w-full h-10 lg:h-14 !mt-5 text-sm lg:text-base text-white transition-all !bg-cstom-black dark:!bg-steel-600 hover:dark:!bg-steel-600/80 border-0 rounded-md hover:!bg-opacity-90 focus:outline-none hover:shadow-sm disabled:bg-[#F8F9FB]"
                  >
                    {isSubmitting ? <div className='flex justify-center items-center'>
                      <div className="h-6 w-6 rounded-full border-4 border-solid border-steel-500 border-t-transparent animate-spin"></div>
                    </div>
                      : <span>Register</span>
                    }
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Flex justify='center' className='gap-1.5'>
            <span
              className='text-sm lg:text-base'
            >
              If you have an account, please sign in
            </span>
            <Link to="/auth/login" className='text-sm lg:text-base underline'>
              here!
            </Link>
          </Flex>
        </Box>
        <Text className="text-center 3xl:text-base text-custom-black font-medium dark:text-custom-border">
          @{new Date().getFullYear()}&nbsp;FileKit
        </Text>
      </Flex>
      <Box className="relative overflow-hidden h-full hidden md:block">
        <Flex
          justify="center"
          align="center"
          className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[#6831E1]"
        >
          <img
            src="/assets/login-bg.webp"
            alt="login image"
            width={960}
            height={1008}
            className="w-full h-full top-0 left-0 absolute object-cover pointer-events-none"
            loading="eager"
          />
          <LoginIllustration className="w-[65%] max-w-[500px] h-auto relative z-[10]" />
        </Flex>
      </Box>
    </Box>
  )
}

export default Register;