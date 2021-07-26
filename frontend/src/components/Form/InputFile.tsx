import React from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const Avatar = ({ handleChange, loading, imageUrl }: any) => {
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
    >
      {imageUrl ? (
        <div className="w-full h-full overflow-hiddent">
          <img src={imageUrl} alt="avatar" className="w-full h-full object-cover" />
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default Avatar;
