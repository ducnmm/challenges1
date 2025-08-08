import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { extractResumeData } from './services/geminiService';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleExtractData = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const extractedData = await extractResumeData(file);
      setResult(extractedData);
    } catch (err) {
      console.error('Error:', err);
      setError('Có lỗi xảy ra khi xử lý file. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>OCR Resume Digitization</h1>
        <p>Tải lên CV để trích xuất thông tin tự động</p>
      </header>
      
      <main className="App-main">
        <FileUpload 
          file={file} 
          onFileSelect={handleFileSelect}
          loading={loading}
        />

        {file && (
          <button
            onClick={handleExtractData}
            disabled={loading}
            className="extract-btn"
          >
            {loading ? 'Đang xử lý...' : 'Trích xuất thông tin'}
          </button>
        )}

        <ErrorDisplay error={error} />
        <ResultDisplay result={result} />
      </main>
    </div>
  );
}

export default App;