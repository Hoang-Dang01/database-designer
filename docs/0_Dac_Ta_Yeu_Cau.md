# TÀI LIỆU ĐẶC TẢ YÊU CẦU HỆ THỐNG MARS COLONY (ĐỊNH CƯ SAO HỎA)

## 1. Giới thiệu và Mục tiêu hệ thống
- **Giới thiệu**: Hệ thống quản lý cư dân định cư trên Sao Hỏa (Mars Colony) được thiết kế để quản lý các chuyến bay, phi công, tàu vũ trụ, thông tin cư dân, gia đình, nơi ở và công việc của họ trên Sao Hỏa.
- **Mục tiêu**: Đảm bảo theo dõi chính xác quá trình vận chuyển cư dân từ Trái Đất đến Sao Hỏa, phân bổ chỗ ở, phân công công việc và quản lý thông tin nhân khẩu học của thuộc địa.

## 2. Các quy tắc nghiệp vụ (Business Rules)

### 2.1. Quản lý Tàu Vũ Trụ (E-Jet) và Chuyến bay (Trip)
- **Tàu vũ trụ (E-Jet)**: Mỗi tàu vũ trụ được quản lý bởi một mã duy nhất (JetCode). Cần lưu trữ thông tin về nguồn năng lượng, số ghế ngồi, trọng lượng, công suất động cơ hạt nhân, năm sản xuất và loại tàu.
- **Chuyến bay (Trip)**: Mỗi chuyến bay lên Sao Hỏa có một mã chuyến bay (TripID), ngày phóng (LaunchDate) và ngày dự kiến trở về (ReturnDate). Một tàu vũ trụ có thể thực hiện nhiều chuyến bay, nhưng mỗi chuyến bay chỉ do một tàu vũ trụ đảm nhận.
- **Phi công (Pilot)**: Phi công điều khiển tàu vũ trụ được quản lý bởi ID (AstronomersID), tên, cấp bậc (Rank), và số giờ bay vũ trụ (SpaceHours). Mỗi phi công được phân công lái một tàu vũ trụ cụ thể.

### 2.2. Quản lý Cư dân (Colonist) và Người phụ thuộc (Dependent)
- **Cư dân (Colonist)**: Mỗi cư dân định cư có một mã định danh (MarsColonistID). Các thông tin cá nhân bao gồm: Tên (FirstName, MiddleName, Surname), Giới tính, Ngày sinh, Tình trạng hôn nhân, Số điện thoại liên hệ, Trình độ chuyên môn (Qualification).
- **Chuyến bay của cư dân**: Mỗi cư dân đến Sao Hỏa thông qua một chuyến bay cụ thể (thuộc về 1 TripID).
- **Người phụ thuộc (Dependent)**: Một cư dân có thể mang theo người nhà (vợ/chồng, con cái). Hệ thống cần lưu tên, họ, và mối quan hệ với cư dân chính.
- *Lưu ý*: Thuộc tính "Số lượng thành viên gia đình" (NoOfFamilyMembers) của cư dân là một thuộc tính dẫn xuất, có thể tính toán dựa trên số lượng người phụ thuộc.

### 2.3. Quản lý Nơi ở (House)
- **Khu nhà ở (House)**: Mỗi căn nhà/khu vực sinh sống trên Sao Hỏa được định danh bằng số lô đất (LotNumber). Hệ thống lưu trữ số lượng phòng (NumberOfRoom) và diện tích (SquareFeet).
- **Phân bổ chỗ ở**: Mỗi cư dân sẽ được cấp một nơi ở (LotNumber). Một căn nhà có thể có nhiều cư dân cùng sinh sống (ví dụ: các thành viên trong cùng một gia đình).

### 2.4. Quản lý Công việc (Job)
- **Công việc (Job)**: Các công việc trên Sao Hỏa được định danh bằng Mã công việc (JobID), Tên công việc (JobTitle) và Mô tả (Description).
- **Phân công lao động (Work)**: Một cư dân có thể đảm nhận nhiều công việc khác nhau, và một công việc có thể được giao cho nhiều cư dân. Khi phân công, cần lưu lại Ngày nhận việc (AssignedDate) và Trạng thái công việc (Status).

## 3. Lý thuyết Cơ sở dữ liệu áp dụng
Hệ thống được chuẩn hóa về Dạng chuẩn 3 (3NF) để tránh dư thừa dữ liệu:
1. **Thực thể độc lập**: E_JET, HOUSE, JOB, PILOT.
2. **Quan hệ 1-N**: 
   - `E_JET` - `TRIP`: Đưa `JetCode` làm khóa ngoại vào bảng `TRIP`.
   - `E_JET` - `PILOT`: Đưa `JetCode` làm khóa ngoại vào bảng `PILOT`.
   - `TRIP` - `COLONIST`: Đưa `TripID` làm khóa ngoại vào `COLONIST`.
   - `HOUSE` - `COLONIST`: Đưa `LotNumber` làm khóa ngoại vào `COLONIST`.
   - `COLONIST` - `DEPENDENT`: Đưa `MarsColonistID` làm khóa ngoại vào bảng `DEPENDENT`.
3. **Quan hệ M-N**:
   - `COLONIST` và `JOB` có quan hệ nhiều-nhiều, được tách thành thực thể kết hợp `WORK` chứa khóa chính ghép từ `MarsColonistID` và `JobID`.
