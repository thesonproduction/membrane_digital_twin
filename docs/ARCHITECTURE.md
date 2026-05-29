# Membrane PINNs Digital Twin

## Goal

Dự án xây dựng một hệ thống web digital twin cho hệ membrane gồm 14 RO train chạy song song, dữ liệu lưu dưới dạng sheet csv, cho phép người dùng upload dữ liệu vận hành lịch sử, quan sát differential Pressure ở cấp độ RO train / cấp độ element. Chương trình chạy dự đoán bằng model-based method, PINNs model và Ensemble, đồng thời mô phỏng kịch bản vận hành khác nhau.

## MVP Scope

Phiên bản MVP (sản phẩm khả dụng tối thiểu) tập trung vào dữ liệu CSV/ offline, chưa kết nối sensor thời gian thực.

MVP gồm:

1. Upload CSV dữ liệu membrane.
2. Kiểm tra và chuẩn hóa dữ liệu.
3. Hiển thị dashboard gồm Differential Pressure ở cấp độ train và element trên cùng 1 đồ thị ở trang dashboard.
4. Chạy dự đoán bằng model-based baseline.
5. Chuẩn bị interface để sau này thêm PINNs và hybrid model.
6. Chạy what-if simulation đơn giản.

## Out of Scope for MVP

1. Realtime sensor streaming. (Hệ thống chưa kết nối thời gian thực)
2. Kubernetes. (Kubernetes à một nền tảng mã nguồn mở dùng để tự động hóa việc điều phối, quản lý, mở rộng và triển khai các ứng dụng container (như Docker).

KHÔNG NÊN DÙNG khi: Dự án của bạn ở giai đoạn MVP, ứng dụng monolithic đơn khối nhỏ gọn, hoặc hệ thống chỉ chạy một vài container cố định. Việc setup K8s lúc này sẽ là một gánh nặng kỹ thuật không cần thiết.

NÊN DÙNG khi: Bạn đang xây dựng một hệ thống lớn theo kiến trúc Microservices (Nhiều dịch vụ nhỏ chạy độc lập), ứng dụng cần độ sẵn sàng cao (High Availability), hoặc hệ thống có lượng tải trồi sụt thất thường cần co giãn tự động liên tục trên các hạ tầng Cloud (AWS, GCP) hay hạ tầng GPU phức tạp.)
3. Microservice.

Thay vì gộp tất cả code thành một khối lớn duy nhất, hệ thống được chia nhỏ thành các dịch vụ mini độc lập chạy riêng biệt và giao tiếp với nhau qua API.

Ví dụ thực tế: Hệ thống của bạn được tách làm 3 phần độc lập:

Service Web/Frontend (chỉ lo hiển thị giao diện).

Service AI/Simulation (chỉ ôm mô hình PINNs để tính toán vật lý).

Service Quản lý người dùng.

Lợi ích: Nếu mô hình AI bị quá tải hoặc sập, người dùng vẫn vào được trang web và xem lại các dữ liệu cũ bình thường, toàn bộ hệ thống không bị sập theo.

4. Authentication phức tạp.

Đây không chỉ là việc nhập "Username/Password" thông thường, mà là hệ thống bảo mật nâng cao để xác định chính xác danh tính và quyền hạn của từng người/thiết bị truy cập vào hệ thống.

Ví dụ thực tế: * OAuth2 / JWT: Giúp người dùng đăng nhập một lần bằng tài khoản Google/Microsoft của trường/viện và giữ phiên đăng nhập an toàn mà không cần gửi mật khẩu liên tục.

RBAC (Phân quyền theo vai trò): Sinh viên trong lab chỉ có quyền xem đồ thị; bạn (Lecturer) có quyền kích hoạt chạy mô phỏng; Admin hệ thống mới có quyền xóa dữ liệu hoặc thay đổi cấu hình server.

M2M (Machine-to-Machine Auth): Xác thực an toàn khi các cảm biến IoT tự động gửi dữ liệu thô về cho Backend mà không cần con người can thiệp.

5. Auto retraining.

Mô hình AI (như PINNs) sau khi deploy lên Production có thể bị giảm độ chính xác theo thời gian do điều kiện thực tế thay đổi (ví dụ: màng lọc bị lão hóa, nguồn nước đầu vào thay đổi cấu trúc). Auto retraining là quy trình tự động hóa việc "học lại" này.Luồng hoạt động tự động: 1. Hệ thống thu thập dữ liệu mới từ thực tế.2. Khi tích lũy đủ lượng dữ liệu hoặc khi độ chính xác của model hiện tại giảm xuống dưới mức cho phép $\rightarrow$ Một script (train_pinns.py) sẽ tự động kích hoạt chạy ngầm để train ra một phiên bản model mới.3. Nếu model mới tốt hơn, hệ thống sẽ tự động thay thế model cũ mà không cần bạn phải vào train tay bằng code.

6. Production alert system.

Đây là "hệ thống báo động" hoạt động 24/7. Nó liên tục giám sát sức khỏe của toàn bộ ứng dụng khi đã chạy chính thức (Production) và gửi cảnh báo ngay lập tức cho bạn khi có sự cố xảy ra.

Ví dụ thực tế: Hệ thống sẽ tự động gửi tin nhắn qua Telegram, Slack hoặc Email cho bạn nếu:

Server bị hết bộ nhớ (RAM/GPU) khi đang chạy mô phỏng.

API trả về lỗi 500 liên tục cho người dùng.

Mô hình AI đột ngột dự đoán ra kết quả bất thường (sai số quá lớn so với phương trình vật lý).

Lợi ích: Bạn biết và sửa lỗi ngay lập tức trước khi người dùng kịp phàn nàn.


## System Architecture

Frontend: ReactJS
Backend: FastAPI (Hệ thống quản trị lớn thì dùng Django)
AI/core: membrane_core
Database: PostgreSQL
Model: Model-base trước, PINNS/hybrid sau

## Main Modules

1. Frontend
    - Dashboard (Hiển thị trực quan hóa dữ liệu và các báo cáo tổng quan)
    - Upload CSV (Dữ liệu của 14 Ro train csv)
    - Simulation Page (Thiết lập kịch bản bảo trì, số ngày dự đoán)
2. Backend
    - API routes
    - request/response schemas
    - service layer
    - database access
3. membrane_core
    - preprocessing
    - model-based model
    - PINNs model
    - Ensemble Method
    - digital twin state
    - simulation engine
4. ML_Pipeline
    - train model
    - evaluate model
    - save checkpoint

## Architecture Rules

1. Frontend không được xử lý logic mô hình.
2. Backend route không được chứa logic PINNs hoặc physics phức tạp.
3. Toàn bộ logic vật lý, model-based, PINNs, hybrid phải đặt trong membrane_core.
4. API input/output phải dùng schema rõ ràng.
5. Training code phải tách khỏi inference API.
6. Mỗi model phải dùng chung một interface predict().