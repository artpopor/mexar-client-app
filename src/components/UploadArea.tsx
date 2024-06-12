import React, { useState } from 'react';
import { Upload, message, Progress } from 'antd';
import { GetProp, UploadFile, UploadProps } from 'antd';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";

const { Dragger } = Upload;

interface UploadAreaProps {
  token: string;
  onUploadSuccess?: (response: any) => void; // Optional callback function
}

const UploadArea: React.FC<UploadAreaProps> = ({ token, onUploadSuccess }) => {
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileUpload = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        onProgress({ percent }); // Update Ant Design's progress bar
      },
    };

    const url = `${import.meta.env.VITE_API_URL}ewallet/files`;

    try {
      const response = await axios.post(url, formData, config);

      if (response.status !== 201) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

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
      console.error('Upload error:', error);
      message.error('Upload failed. Please try again.');
      onError(error); // Call Ant Design's error handler
    }
  };

  const handleOnChange = ({ file, fileList, event }: any) => {
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
        <FaUpload className='self-center w-full text-3xl my-4'/>
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
