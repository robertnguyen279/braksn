import React, { useState } from 'react';
import LoginForm from './LoginForm';
import { loginByFacebook, loginByGoogle, getSavedArticles } from 'redux/actions/users';
import { useDispatch } from 'react-redux';
import RegisterForm from './RegisterForm';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import FacebookIcon from 'assets/icons/facebook.svg';
import GoogleIcon from 'assets/icons/google-plus.svg';

const MainForm = () => {
  const dispatch = useDispatch();
  const [isLoginForm, setLoginForm] = useState(true);

  const responseFacebook = (res: any): void => {
    const { name, email } = res;
    dispatch(
      loginByFacebook({ name, email, avatar: res.picture.data.url }, (e: any) => {
        if (e) console.log(e);
        else dispatch(getSavedArticles({}));
      }),
    );
  };

  const responseGoogle = (res: any): void => {
    const { familyName, givenName, imageUrl, email } = res.profileObj;
    dispatch(
      loginByGoogle(
        {
          firstName: familyName ? familyName : '',
          lastName: givenName ? givenName : '',
          avatar: imageUrl,
          email,
          token: res.tokenId,
        },
        (e: any) => {
          if (e) console.log(e);
          else dispatch(getSavedArticles({}));
        },
      ),
    );
  };

  const renderOtherLogin = () => (
    <div className="flex w-max mx-auto my-8 ">
      <FacebookLogin
        appId="441079470350681"
        autoLoad={false}
        callback={responseFacebook}
        fields="name,email,picture"
        // @ts-ignore
        render={(renderProps) => (
          <img
            src={FacebookIcon}
            alt="facebook-auth"
            className="w-8 h-8 cursor-pointer mx-5"
            onClick={renderProps.onClick}
          />
        )}
      />
      <GoogleLogin
        clientId="22234867800-4shnc1g407oks72lciep89ht3kdaeqfn.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <img
            src={GoogleIcon}
            alt="google-auth"
            className="w-8 h-8 cursor-pointer mx-5"
            onClick={renderProps.onClick}
          />
        )}
      />
    </div>
  );

  return (
    <div className="grid border border-gray-300 rounded-md mx-8">
      <div className="grid m-0 bg-gray-100 rounded-md">
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        {renderOtherLogin()}
      </div>
      {isLoginForm ? (
        <div className="text-center my-5">
          Do not have account? <a onClick={() => setLoginForm(false)}>Register here</a>
        </div>
      ) : (
        <div className="text-center my-5">
          Already a member? <a onClick={() => setLoginForm(true)}>Login here</a>
        </div>
      )}
    </div>
  );
};

export default MainForm;
