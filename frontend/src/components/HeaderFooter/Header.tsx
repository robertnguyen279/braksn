import React, { useEffect, useRef } from 'react';
import { SearchOutlined, MenuOutlined, FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { RootState } from 'redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { createParams } from 'redux/actions/ui';
import InputForm from 'components/Form/InputForm';
import { useFormik } from 'formik';
import NoProfile from 'assets/images/no-profile.jpg';
import Logo from 'assets/icons/logo.png';

const Header = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const queries = useSelector((state: RootState) => state.ui.params);
  const tempAvatar = useSelector((state:RootState) => state.ui.avatar)
  const location = useLocation()
    .pathname.split('/')
    .filter((x) => x)[0];
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: ({ search }) => {
      props.setDropMenu(false);

      setTimeout(() => {
        if (['entertainment', 'business', 'health', 'science', 'sports', 'technology', 'savedNews'].includes(location)) {
          history.push(`/${location}`);
        } else {
          history.push(`/newsList`);
        }
        dispatch(createParams({ search, page: 1 }));
      }, 550);
    },
  });

  useEffect(() => {
    formik.setValues({ search: queries?.search ? queries.search : '' });
  }, [JSON.stringify(queries)]);

  //------------------------------------------------------------------------------
  const otherLoginItems = [FacebookFilled, GoogleOutlined];

  const otherLoginRender = () => (
    <div className="flex">
      {otherLoginItems.map((Item, i) => (
        <Item key={i} style={{ color: 'white' }} className="bg-blue-500 ml-2 p-2 rounded-full cursor-pointer" />
      ))}
    </div>
  );

  //------------------------------------------------------------------------------
  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'News List', link: '/newsList' },
    { text: 'Entertainment', link: '/entertainment' },
    { text: 'Business', link: '/business' },
    { text: 'Health', link: '/health' },
    { text: 'Science', link: '/science' },
    { text: 'Sports', link: '/sports' },
    { text: 'Technology', link: '/technology' },
  ];

  const menuRender = () => (
    <ul className="flex flex-col bg-blue-500 m-0">
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <InputForm
          formik={formik}
          type="text"
          id="search"
          className="border-b border-white px-5 justify-center"
          Icon={SearchOutlined}
        />
        <button
          className="absolute right-7 top-4 bg-gray-500 text-white py-1 px-3 rounded-full focus:outline-none"
          type="submit"
        >
          Search
        </button>
      </form>
      {menuItems.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            props.setDropMenu(false);
            setTimeout(() => {
              history.push(item.link);
            }, 550);
          }}
          className="cursor-pointer"
        >
          <li className="text-white px-5 py-3 border-b cursor-pointer">{item.text}</li>
        </div>
      ))}
    </ul>
  );

  const headerRender = () => (
    <div className="flex flex-col shadow-md">
      <div className="flex bg-white h-16 justify-between items-center m-0 px-5">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-24" />
        </Link>
        <MenuOutlined
          style={{ color: 'white' }}
          className="bg-blue-500 p-3 rounded-md transform hover:scale-110 duration-500 cursor-pointer"
          onClick={() => {
            props.setDropMenu(!props.isDroppedMenu);
          }}
        />
      </div>
      <div className={`overflow-hidden ${props.isDroppedMenu ? 'h-menu' : 'h-0'} transform duration-500`}>
        {menuRender()}
      </div>
    </div>
  );

  //----------------------------------------------------------------------------

  return (
    <div className={`${props.className} flex flex-col absolute w-full z-50`}>
      <div className="h-16 flex bg-black items-center justify-between m-0 px-5">
        {user ? (
          <a onClick={() => props.setShownUserMenu(props.isShownUserMenu ? false : true)}>
            <img className="rounded-full w-8 h-8" src={tempAvatar ? tempAvatar : user?.avatar ? user?.avatar : NoProfile} />
          </a>
        ) : (
          <Link className="text-white" to="/registerLogin">
            Sign in
          </Link>
        )}
        {otherLoginRender()}
      </div>
      {headerRender()}
    </div>
  );
};

export default Header;
