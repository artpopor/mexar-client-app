import React, { useState } from 'react';
import { Upload, message, Progress } from 'antd';
import { UploadFile } from 'antd';
import { FaUpload } from "react-icons/fa";
import { useFileUploadMutation } from '../services/apiStore';

const { Dragger } = Upload;

interface UploadAreaProps {
  department_id: string;
  token: string;
  onUploadSuccess?: (response: any) => void; // Optional callback function
}

const UploadArea: React.FC<UploadAreaProps> = ({ token, department_id, onUploadSuccess }) => {
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadFile] = useFileUploadMutation();

  const handleFileUpload = async (options: any) => {
    const { onError, file } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('department_id', department_id)

    try {
      const response = await uploadFile({ token: token, data: formData })
      const data = await response

      setProgress(0); // Reset progress after successful upload
      setFileList([]); // Clear the file list (optional)

      if (onUploadSuccess) {
        onUploadSuccess(data); // Call the provided callback function with response data
      } else {
        message.success('File uploaded successfully!');
      }

      return { onSuccess: data };
    } catch (error) {
      message.error('Upload failed. Please try again.');
      onError(error); // Call Ant Design's error handler
    }
  };

  const handleOnChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <Dragger
      multiple={false} // Allow only a single file
      fileList={fileList}
      onChange={handleOnChange}
      customRequest={handleFileUpload}
      accept=".png,.jpeg,.pdf,.docx"
      className='text-gray-400 '
    >
      <FaUpload className='self-center w-full text-3xl my-4' />
      {fileList.length > 0 ? (
        <p className="ant-upload-text">
          Uploading: {fileList[0].name}
        </p>
      ) : (
        <p className="text-lg">Click or drag file to this area to upload</p>
      )}
      <span className="ant-upload-hint">
        Support for multiple files
      </span>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </Dragger>
  );
};

export default UploadArea;
