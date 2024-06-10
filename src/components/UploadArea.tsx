import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import { LuUpload } from "react-icons/lu";

const { Dragger } = Upload;

const uploadProps: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const FileUpload: React.FC = () => (
  <Dragger {...uploadProps}>
    <div className="flex content-center justify-center min-h-[80px] ">
      <LuUpload className="self-center text-[30px] text-gray-500" />
    </div>
    <p className="ant-upload-hint">Upload Transaction File</p>
  </Dragger>
);

export default FileUpload;
