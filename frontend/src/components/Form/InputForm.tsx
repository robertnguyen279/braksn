import React from 'react';

const Input = ({ formik, id, type, Icon, className, className2, autoComplete }: any) => {
  return (
    <div className={`${className} overflow-hidden flex flex-col h-16`}>
      {Icon ? <Icon className="absolute left-8 top-6" /> : null}
      <input
        type={type}
        id={id}
        autoComplete={autoComplete == null ? 'on' : autoComplete}
        placeholder={id.replace(/^\w/, (c: any) => c.toUpperCase())}
        className={`${className2} h-10 pr-4 ${Icon ? 'pl-8' : 'pl-4'} rounded-full focus:outline-none`}
        {...formik.getFieldProps(id)}
      />
      <div className="text-red-600">{formik.touched[id] && formik.errors[id] ? formik.errors[id] : null}</div>
    </div>
  );
};

export default Input;
