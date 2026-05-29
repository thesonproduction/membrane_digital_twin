# membrane_digital_twin\backend\app\main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import health

app = FastAPI(
    title="Membrane Digital Twin API",
    version="0.1.0"
) # khởi tạo ứng dụng FasstAPI


"""
Cấu hình Middleware CORS (Chia sẻ tài nguyên giữa các nguồn khác nhau)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Đây là phần giải quyết vấn đề bảo mật chặn kết nối giữa Frontend và Backend (Lỗi CORS rất hay gặp trong phát triển web).

CORSMiddleware: Con bot trung gian đứng ra kiểm tra xem ai được quyền gửi yêu cầu (request) đến backend.

allow_origins: Danh sách các địa chỉ Frontend được phép kết nối tới Backend này.

http://localhost:5173: Thường là cổng chạy mặc định của các framework frontend hiện đại như Vite / React / Vue.

http://localhost:3000: Thường là cổng mặc định của Next.js hoặc React truyền thống.

Ý nghĩa: Chỉ có Frontend chạy ở 2 địa chỉ này mới gọi API lấy dữ liệu được, các trang web lạ khác gọi vào sẽ bị chặn đứng để bảo vệ hệ thống.

allow_credentials=True: Cho phép Frontend gửi kèm theo các thông tin xác thực như Cookie, Token hoặc chuỗi cấu hình bảo mật khi gọi API.

allow_methods=["*"]: Cho phép tất cả các phương thức HTTP (Dấu * nghĩa là tất cả, bao gồm: GET để lấy data, POST để thêm mới, PUT để cập nhật, DELETE để xóa).

allow_headers=["*"]: Cho phép Frontend gửi lên bất kỳ loại định dạng dữ liệu (Header) nào, ví dụ như ép kiểu dữ liệu dạng JSON, dữ liệu file, v.v.
"""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
app.include_router: Gom các cụm API được viết tách biệt ở các file khác vào ứng dụng chính. Khi dự án lớn lên, 
bạn không thể viết tất cả API chung một file được mà phải chia nhỏ ra (chia module).

health.router: Đây là router kiểm tra sức khỏe hệ thống (thường nằm ở file health.py). 
Nó thường chứa một API đơn giản kiểu /health trả về {"status": "ok"} để kiểm tra xem server backend có đang sống và hoạt động bình thường hay không.
"""

app.include_router(health.router)