import React from 'react';

const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error">
      <h3>Lỗi:</h3>
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;