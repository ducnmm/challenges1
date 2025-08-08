import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ file, onFileSelect, loading }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      {file ? (
        <div>
          <p>✓ Đã chọn file: {file.name}</p>
          <p>Kích thước: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      ) : isDragActive ? (
        <p>Thả file vào đây...</p>
      ) : (
        <p>Kéo thả file CV vào đây hoặc click để chọn file</p>
      )}
    </div>
  );
};

export default FileUpload;