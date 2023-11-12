import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, UploadFile } from "antd";
import { RcFile, UploadProps } from "antd/es/upload";
import React, { useEffect } from "react";

import "./UploadPhoto.css";

const UploadPhoto = () => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  useEffect(()=>{
    console.log(fileList)
  },[fileList]);
  return (
    <>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        defaultFileList={[...fileList]}
        className="upload-list-inline"
      >
        <Button
          icon={<UploadOutlined />}
          className="ant-upload-list-item"
        >
          Upload
        </Button>
      </Upload>
    </>
  );
};

export default UploadPhoto;
