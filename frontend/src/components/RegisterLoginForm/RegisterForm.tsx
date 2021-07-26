import React from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from 'redux/actions/users';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputForm } from 'components/Form';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ email, password }) => {
      dispatch(createUser({ email, password }));
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid format').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Not same with password'),
    }),
  });

  return (
    <>
      <h1 className="text-center text-xl my-7">Create your account</h1>
      <form className="grid mx-5" onSubmit={formik.handleSubmit}>
        <InputForm formik={formik} id="email" type="email" />
        <InputForm formik={formik} id="password" type="password" />
        <InputForm formik={formik} id="confirmPassword" type="password" />
        <button className="bg-blue-500 text-white p-2 rounded-md focus:outline-none" type="submit">
          Sign up
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
