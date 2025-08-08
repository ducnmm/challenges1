import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result">
      <h3>Thông tin đã trích xuất:</h3>
      <div className="result-content">
        <p><strong>Kính gửi:</strong> {result.company_addressed}</p>
        <p><strong>Quý công ty:</strong> {result.company_name}</p>
        <p><strong>Tên tôi là:</strong> {result.full_name}</p>
        <p><strong>Sinh năm:</strong> {result.birth_year}</p>
        <p><strong>Địa chỉ:</strong> {result.address}</p>
        <p><strong>Số CMND/CCCD:</strong> {result.id_number}</p>
        <p><strong>Cấp ngày:</strong> {result.id_issue_date}</p>
        <p><strong>Hiện cư trú tại:</strong> {result.current_residence}</p>
        <p><strong>Trình độ văn hóa:</strong> {result.education_level}</p>
        <p><strong>Ngoại ngữ:</strong> {result.foreign_language}</p>
        <p><strong>Nghề nghiệp chuyên môn:</strong> {result.profession}</p>
        <p><strong>Ngành:</strong> {result.field}</p>
        <p><strong>Xin được ứng tuyển vào vị trí:</strong> {result.applying_position}</p>
        <p><strong>Nơi làm đơn:</strong> {result.application_location}</p>
        <p><strong>Ngày làm đơn:</strong> {result.application_date}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;