import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const EXTRACTION_PROMPT = `
Hãy trích xuất thông tin từ đơn xin việc này và trả về dữ liệu JSON có cấu trúc như sau:
{
  "company_addressed": "Lấy thông tin sau từ 'Kính gửi:' (ví dụ: Bộ phận nhân sự)",
  "company_name": "Lấy thông tin sau từ 'Quý công ty:' (tên công ty)",
  "full_name": "Lấy thông tin sau từ 'Tên tôi là:' (họ và tên đầy đủ)",
  "birth_year": "Lấy thông tin sau từ 'Sinh năm:' (chỉ lấy năm)",
  "address": "Lấy thông tin sau từ 'Địa chỉ:' (địa chỉ đầy đủ)",
  "id_number": "Lấy thông tin sau từ 'Số CMND/CCCD:' (số chứng minh thư/căn cước)",
  "id_issue_date": "Lấy thông tin sau từ 'Cấp Ngày' (ngày cấp CMND/CCCD)",
  "current_residence": "Lấy thông tin sau từ 'Hiện cư trú tại:' (địa chỉ hiện tại)",
  "education_level": "Lấy thông tin sau từ 'Trình độ văn hóa:' (học vấn)",
  "foreign_language": "Lấy thông tin sau từ 'Ngoại Ngữ:' (ngoại ngữ biết)",
  "profession": "Lấy thông tin sau từ 'Nghề nghiệp chuyên môn:' (chuyên môn)",
  "field": "Lấy thông tin sau từ 'Ngành:' (ngành nghề)",
  "applying_position": "Tìm vị trí ứng tuyển trong đoạn văn sau từ 'ứng tuyển vào vị trí' (ví dụ: 'công nhân', 'công nhân may', v.v.)",
  "application_location": "Lấy địa điểm ở cuối đơn trước ngày tháng (ví dụ: TP.HCM)",
  "application_date": "Lấy ngày tháng năm ở cuối đơn (ví dụ: ngày 12 tháng 4 năm 2025)"
}

HƯỚNG DẪN CHI TIẾT:
- Đọc từng dòng trong đơn xin việc một cách cẩn thận, kể cả chữ viết tay
- Tìm chính xác các từ khóa như "Kính gửi:", "Tên tôi là:", "Sinh năm:", v.v.
- Lấy thông tin ngay sau dấu hai chấm (:) của mỗi mục
- Với "Ngoại Ngữ:", nếu chỉ thấy "tiếng việt" thì có thể để trống vì đó không phải ngoại ngữ
- Với vị trí ứng tuyển, tìm trong câu có từ "ứng tuyển vào vị trí" 
- Với ngày tháng năm, chuyển đổi sang định dạng dd/mm/yyyy
- Chú ý phân biệt "Địa chỉ" (hộ khẩu thường trú) và "Hiện cư trú tại" (nơi ở hiện tại)
- Chỉ trích xuất, không được tự bịa đặt thông tin
- Trả về JSON hợp lệ, không có text giải thích
- Nếu không tìm thấy thông tin thì để ""
`;

export const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

export const extractResumeData = async (file) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
  
  const imagePart = await fileToGenerativePart(file);
  const result = await model.generateContent([EXTRACTION_PROMPT, imagePart]);
  const response = result.response;
  const text = response.text();
  
  const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleanedText);
};