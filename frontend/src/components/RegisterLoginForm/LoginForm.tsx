import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { loginUser, getSavedArticles } from 'redux/actions/users';
import { InputForm } from 'components/Form';

const LoginForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // @ts-ignore
    onSubmit: ({ email, password, remember }) => {
      dispatch(
        loginUser({ email, password, remember }, (e: any) => {
          if (e) console.log(e);
          else dispatch(getSavedArticles({}));
        }),
      );
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid format').required('Required'),
      password: Yup.string().required('Required'),
    }),
  });

  return (
    <div>
      <h1 className="text-center text-xl my-7">Sign in</h1>
      <form className="grid mx-5" onSubmit={formik.handleSubmit}>
        <InputForm formik={formik} id="email" type="email" />
        <InputForm formik={formik} id="password" type="password" />
        <div className="flex mb-5">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            value="remember"
            onChange={formik.handleChange}
            className="mr-2 items-center my-auto"
          />
          <div>Remember Me</div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md focus:outline-none">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
