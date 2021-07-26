import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/reducers';
import { useHistory, useLocation } from 'react-router-dom';
import { getSavedArticles, getUser, loginUserError } from 'redux/actions/users';
import { getParams } from 'redux/actions/ui';
import { message } from 'antd';
import { createParams } from 'redux/actions/ui';

export default (ComposedClass: any, reload: boolean | null) => {
  const Auth = (props: any) => {
    const user = useSelector((state: RootState) => state.users.user);
    const loginUserErr = useSelector((state: RootState) => state.users.loginUserError);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
      const prevLocation = localStorage.getItem('prevLocation');

      // remove params
      const prevPath = prevLocation?.split('/').filter((x) => x)[0];
      const currentPath = location.pathname.split('/').filter((x) => x)[0];

      if (prevPath != currentPath) {
        localStorage.removeItem('params');
        dispatch(createParams({}));
        dispatch(loginUserError(undefined))
      }

      if (!user) {
        if (reload) {
          history.push('/registerLogin');
        }
      } else {
        if (reload == false) {
          history.push(prevLocation ? encodeURI(prevLocation) : '/');
        }
      }

      if (!user) {
        dispatch(getUser());
        dispatch(getSavedArticles({}))
      }

      if (loginUserErr && loginUserErr.includes('Incorrect password')) {
        message.error('password incorrect');
      }

      if (loginUserErr && loginUserErr.includes('User existed')) {
        message.error('user existed');
      }

      if (location.pathname != '/registerLogin') {
        localStorage.setItem('prevLocation', location.pathname);
      }

      dispatch(getParams());
    }, [JSON.stringify(user), JSON.stringify(loginUserErr)]);

    return (
      <div>
        <ComposedClass {...props} />
      </div>
    );
  };

  return Auth;
};
