import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import NoProfile from 'assets/images/no-profile.jpg';
import UploadImage from 'assets/icons/upload-image.svg';
import RightArrow from 'assets/icons/right-arrow.svg';
import { Modal } from 'antd';
import { InputFile } from 'components/Form';
import { Input } from 'antd';
import Compressor from 'compressorjs';
import { message } from 'antd';
import { updateAvatar, updatePassword } from 'redux/actions/users';
import { setTempAvatar } from 'redux/actions/ui';
import { useHistory } from 'react-router';
import { myBucket, S3_BUCKET_ASSETS } from 'services/aws';

const Profile = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const tempAvatar = useSelector((state: RootState) => state.ui.avatar);
  const [visibleUploadImage, setVisibleUploadImage] = useState(false);
  const [visibleChangePass, setVisibleChangePass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(undefined);
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  //-------------Handle update password----------------
  const handleUpdatePassword = () => {
    dispatch(
      updatePassword({ oldPassword, newPassword }, (e: any) => {
        if (e) {
          message.error(e.message);
        } else {
          message.success('success');
          setVisibleChangePass(false);
          setOldPassword('');
          setNewPassword('');
        }
      }),
    );
  };

  //--------Handle upload avatar-----------------------
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const resizeFile = (file: any) =>
    new Promise(
      (resolve) =>
        new Compressor(file, {
          convertSize: 0.1,
          maxHeight: 300,
          maxWidth: 300,
          quality: 0.8,
          success: (res) => resolve(res),
        }),
    );

  const handleChangeFile = async (info: any) => {
    const file = await resizeFile(info.file.originFileObj);

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    getBase64(file, (url: any) => {
      setImageUrl(url);
    });

    setSelectedFile(file);
    setLoading(false);
  };

  const uploadFile = (file: any) => {
    setConfirmLoading(true);
    const keyName = `${user?._id}-${Date.now()}-${file.name}`;
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET_ASSETS,
      Key: keyName,
    };

    myBucket.putObject(params, (err) => {
      if (err) return console.log(err);
      dispatch(setTempAvatar(imageUrl));
      dispatch(
        updateAvatar(
          { newAvatarUrl: `https://dt3-static-assets.s3-ap-southeast-1.amazonaws.com/${keyName}` },
          (e: any) => {
            if (e) {
              message.error(e);
              dispatch(setTempAvatar(user?.avatar));
            }
          },
        ),
      );
      setSelectedFile(undefined);
      setImageUrl(undefined);
      setConfirmLoading(false);
      setVisibleUploadImage(false);
    });
  };

  return (
    <div className="flex flex-col w-full divide-y divide-gray-300">
      {/* --------------------------Update avatar------------------------ */}
      <div className="w-max relative mx-auto mb-10">
        <img
          src={tempAvatar ? tempAvatar : user?.avatar ? user.avatar : NoProfile}
          alt="avatar"
          className="rounded-full w-36 h-36"
        />
        <button
          onClick={() => setVisibleUploadImage(true)}
          className="absolute bottom-0 right-0 rounded-full bg-white p-1 w-10 h-10 focus:outline-none"
        >
          <img className="rounded-full" src={UploadImage} />
        </button>
        <Modal
          width={300}
          visible={visibleUploadImage}
          title="Upload your photo"
          confirmLoading={confirmLoading}
          onOk={() => uploadFile(selectedFile)}
          onCancel={() => setVisibleUploadImage(false)}
        >
          <InputFile handleChange={handleChangeFile} loading={loading} imageUrl={imageUrl} />
        </Modal>
      </div>
      {/* ----------------------------Username-----------------------------*/}
      <div className="flex justify-between py-3 px-3 items-center">
        <h3>Username:</h3>
        <div className="text-gray-500">
          {user?.firstName} {user?.lastName}
        </div>
      </div>
      {/* -----------------------------Email------------------------------- */}
      <div className="flex justify-between py-3 px-3 items-center">
        <h3>Email:</h3>
        <div className="text-gray-500">{user?.email}</div>
      </div>
      {/* -----------------------------Change password---------------------- */}
      <div className="flex justify-between py-3 px-3 items-center">
        <h3>Change password</h3>
        <button
          disabled={user?.accountType != 'TraditionalAuth'}
          onClick={() => setVisibleChangePass(true)}
          className="focus:outline-none"
        >
          <img src={RightArrow} alt="icon" className="w-5 h-5" />
        </button>
        <Modal
          width={300}
          visible={visibleChangePass}
          title="Change your password"
          onOk={handleUpdatePassword}
          onCancel={() => setVisibleChangePass(false)}
        >
          <Input.Password
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mb-5"
            placeholder="Enter old password"
          />
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </Modal>
      </div>
      {/* ----------------------------Saved articles---------------------- */}
      <div className="flex justify-between py-3 px-3 items-center">
        <h3>Your saved articles</h3>
        <button
          onClick={() => {
            history.push('/savedNews');
          }}
          className="focus:outline-none"
        >
          <img src={RightArrow} alt="icon" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
