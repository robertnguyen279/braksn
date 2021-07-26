import Header from 'components/HeaderFooter/Header';
import Footer from 'components/HeaderFooter/Footer';
import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Breadcrumb from 'components/Breadcrumb';
import { useDispatch } from 'react-redux';
import { getSavedArticlesSuccess, logoutUser } from 'redux/actions/users';
import { useHistory } from 'react-router-dom';
import UserLayout from './UserLayout';

let contentRef: any;

const Layoutt = (props: any) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const [isShownUserMenu, setShownUserMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisibleMenu, setVisibleMenu] = useState(true);
  const [isDroppedMenu, setDropMenu] = useState(false);
  const [clientWidth, setClientWidth] = useState(0);
  const userMenuRef = useRef<HTMLInputElement>(null);
  contentRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // resize userlayout
    function handleResize() {
      setClientWidth(contentRef.current ? contentRef.current.clientWidth : 0);
    }
    handleResize();

    // hide menu when srcolldown
    function handleScroll() {
      const currentScrollPos = contentRef.current?.scrollTop;
      const visible = prevScrollPos > currentScrollPos;

      setVisibleMenu(visible);
      setTimeout(() => {
        setPrevScrollPos(currentScrollPos);
      }, 550);
    }

    //User menu close when click outside
    function handleClickOutside(event: any) {
      if (isShownUserMenu && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShownUserMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    contentRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      contentRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, isShownUserMenu, clientWidth, contentRef]);

  const logout = () => {
    localStorage.removeItem('beehive-auth');
    dispatch(logoutUser());
    dispatch(getSavedArticlesSuccess({}));
    setShownUserMenu(false);
  };

  const toProfile = () => {
    history.push('/profile');
    setShownUserMenu(false);
  };

  const toSavedNews = () => {
    history.push('/savedNews');
    setShownUserMenu(false);
  };

  //---------------------------------------------------------------------------
  const userMenuRender = () => (
    <div ref={userMenuRef} className="flex relative bg-gray-500">
      <div
        style={{ width: isShownUserMenu ? clientWidth * 0.85 : 0 }}
        className={`absolute bg-white flex h-screen  
                overflow-hidden duration-500`}
      >
        <UserLayout toProfile={toProfile} logout={logout} toSavedNews={toSavedNews} />
      </div>
      <div style={{ width: isShownUserMenu ? clientWidth * 0.85 : 0 }} className={`bg-gray-500 duration-500`} />
    </div>
  );
  //------------------------------------------------------------------------

  return (
    <div className={`mx-auto flex overflow-x-hidden ${!isMobile ? 'w-mobile' : 'w-screen'}`}>
      {userMenuRender()}
      <div className="relative min-w-full">
        {isShownUserMenu ? (
          <div style={{ zIndex: 9999 }} className="absolute w-full h-full bg-black bg-opacity-50 duration-500" />
        ) : null}

        {isDroppedMenu ? <div className="absolute w-full h-full bg-black bg-opacity-50 duration-500 z-40" /> : null}

        <Header
          className={`${isVisibleMenu ? 'top-0' : '-top-16'} duration-500`}
          setShownUserMenu={setShownUserMenu}
          isShownUserMenu={isShownUserMenu}
          isDroppedMenu={isDroppedMenu}
          setDropMenu={setDropMenu}
        />
        <div ref={contentRef} className="layout__scrollbar h-screen w-full">
          <div className="relative flex flex-col min-h-screen w-full bg-white pb-60">
            <div className={`${isVisibleMenu ? 'mt-32' : 'mt-16'} flex flex-col bg-white px-5 pt-5 pb-20 duration-500`}>
              <Breadcrumb />
              {props.children}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export { contentRef };
export default Layoutt;
