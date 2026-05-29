// 1. Khai báo hằng số lưu địa chỉ gốc (Base URL) của API Backend.
// - const: Đảm bảo biến địa chỉ này không bị ghi đè hoặc thay đổi ở các dòng code dưới.
// - import.meta.env: Cú pháp của hệ thống cuộn mã Vite, dùng để đọc các biến môi trường từ file `.env`.
// - VITE_API_BASE_URL: Tên biến chứa địa chỉ Backend (ví dụ: http://localhost:8000). Tiền tố VITE_ là bắt buộc để Vite cho phép Frontend truy cập.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// 2. Định nghĩa và xuất (export) một hàm xử lý bất đồng bộ (async).
// - export: Xuất hàm này ra ngoài để các file giao diện khác (như App.jsx) có thể import vào sử dụng.
// - async function: Khai báo đây là hàm bất đồng bộ, giúp gọi dữ liệu ngầm qua mạng mà không làm đóng băng giao diện trình duyệt.
export async function checkHealth() {
  
  // 3. Thực hiện gửi yêu cầu (Request) lên Server và đợi câu trả lời.
  // - fetch(): Hàm mặc định của trình duyệt để gửi yêu cầu HTTP (ở đây mặc định là phương thức GET).
  // - `${API_BASE_URL}/health/`: Cú pháp nối chuỗi để tạo đường dẫn hoàn chỉnh (ví dụ thành: http://localhost:8000/health/).
  // - await: Bắt chương trình tạm dừng tại dòng này, đợi mạng truyền dữ liệu từ Backend về nạp vào biến `response` xong mới chạy tiếp xuống dưới.
  const response = await fetch(`${API_BASE_URL}/health/`);

  // 4. Kiểm tra xem phản hồi (Response) từ Server trả về có thành công hay không.
  // - response.ok: Trả về `true` nếu mã trạng thái HTTP thành công (từ 200 đến 299), ngược lại trả về `false`.
  // - Dấu chấm than (!): Phủ định lại. Dòng này nghĩa là: "Nếu kết nối KHÔNG thành công" (Server sập, lỗi 404, lỗi 500...).
  if (!response.ok) {
    // throw new Error: Lập tức ngắt hàm và ném ra một thông báo lỗi để phía giao diện (khối catch) bắt được và hiển thị thông báo lỗi màu đỏ lên màn hình.
    throw new Error("Backend health check failed");
  }

  // 5. Chuyển đổi dữ liệu nhận được thành định dạng sạch và trả về kết quả.
  // - response.json(): Chuyển đổi luồng dữ liệu thô (byte) nhận từ mạng thành một đối tượng (Object) JavaScript dạng JSON (ví dụ: { status: "ok" }).
  // - return: Trả đối tượng JSON này về nơi gọi hàm (giao diện React) để đem đi hiển thị lên màn hình.
  return response.json();
}
