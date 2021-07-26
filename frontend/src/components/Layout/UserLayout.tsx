import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import NoProfile from 'assets/images/no-profile.jpg';
import Logout from 'assets/icons/logout.svg';
import { useHistory } from 'react-router-dom';

interface IProps {
  toProfile(): void;
  logout(): void;
  toSavedNews(): void
}

const UserLayout = ({ toProfile, logout, toSavedNews }: IProps) => {
  const user = useSelector((state: RootState) => state.users.user);
  const savedTempArticles = useSelector((state:RootState)=> state.ui.savedArticles)
  const savedArticles = useSelector((state:RootState) => state.users.savedArticles)
  const articles = savedTempArticles?savedTempArticles:savedArticles
  const tempAvatar = useSelector((state:RootState) => state.ui.avatar)

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="w-full h-72 bg-gray-700 overflow-visible">
        <div className="grid justify-items-center mt-32 bg-white w-6/7 mx-auto shadow-lg py-10 rounded-xl">
          <div onClick={toProfile} className="grid justify-items-center">
            <img
              src={tempAvatar ? tempAvatar : user?.avatar ? user.avatar : NoProfile}
              alt="avatar"
              className="rounded-full w-20 h-20 my-2 cursor-pointer"
            />
            <div className="my-2 cursor-pointer hover:text-blue-500 hover:underline text-gray-500">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="my-2 cursor-pointer hover:text-blue-500 hover:underline text-gray-500 ">{user?.email}</div>
          </div>
          
          <div
            onClick={toSavedNews} 
            className="my-2 grid justify-items-center border-t border-gray-300 py-2 w-max"
          >
            <div className="text-gray-500 cursor-pointer hover:text-blue-500">Saved articles</div>
            <div className="text-gray-400 cursor-pointer hover:text-blue-500">{articles?.length}</div>
          </div>
        </div>
      </div>
      <button onClick={logout} className="flex items-center self-end m-5 focus:outline-none">
        <h3 className="mr-2">Logout</h3>
        <img src={Logout} className="w-5 h-5" alt="icon" />
      </button>
    </div>
  );
};

export default UserLayout;
