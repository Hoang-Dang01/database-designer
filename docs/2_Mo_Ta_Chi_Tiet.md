# TỪ ĐIỂN DỮ LIỆU CHI TIẾT (DATA DICTIONARY) - MARS COLONY

Dưới đây là mô tả chi tiết kiểu dữ liệu, các ràng buộc (Khóa chính, Khóa ngoại) cho từng bảng trong cơ sở dữ liệu hệ thống định cư trên Sao Hỏa.

## 1. Bảng `E_JET` (Lưu thông tin Tàu vũ trụ)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| JetCode | VARCHAR(20) | **PK** | Mã tàu vũ trụ |
| PowerSource | VARCHAR(50) | NOT NULL | Nguồn năng lượng sử dụng |
| NumberOfSeats | INT | NOT NULL | Số lượng ghế ngồi |
| Weight | DECIMAL(8,2) | NOT NULL | Trọng tải của tàu (tấn) |
| NuclearEnginePower | VARCHAR(50) | NULL | Công suất động cơ hạt nhân |
| MadeYear | INT | NOT NULL | Năm sản xuất |
| JetType | VARCHAR(50) | NOT NULL | Phân loại tàu (chở khách, chở hàng) |

## 2. Bảng `PILOT` (Lưu thông tin Phi công)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| AstronomersID | INT | **PK** | Mã phi hành gia/phi công |
| JetCode | VARCHAR(20) | **FK**, NOT NULL | Mã tàu vũ trụ phi công phụ trách |
| Name | VARCHAR(100) | NOT NULL | Tên đầy đủ của phi công |
| Rank | VARCHAR(50) | NOT NULL | Cấp bậc phi công (Cơ trưởng, Lái phụ) |
| SpaceHours | INT | NOT NULL | Số giờ bay trong không gian vũ trụ |

## 3. Bảng `TRIP` (Lưu thông tin Chuyến bay lên Sao Hỏa)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| TripID | INT | **PK** | Mã chuyến bay |
| JetCode | VARCHAR(20) | **FK**, NOT NULL | Tàu vũ trụ thực hiện chuyến bay |
| LaunchDate | DATE | NOT NULL | Ngày phóng từ Trái Đất |
| ReturnDate | DATE | NULL | Ngày dự kiến trở về (Nếu có) |

## 4. Bảng `HOUSE` (Lưu thông tin Nơi ở)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| LotNumber | VARCHAR(20) | **PK** | Mã lô đất/Căn nhà trên Sao Hỏa |
| NumberOfRoom | INT | NOT NULL | Số lượng phòng ở |
| SquareFeet | INT | NOT NULL | Diện tích (feet vuông) |

## 5. Bảng `JOB` (Lưu danh mục Công việc)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| JobID | INT | **PK** | Mã công việc |
| JobTitle | VARCHAR(100) | NOT NULL | Chức danh/Tên công việc |
| Description | VARCHAR(255) | NULL | Mô tả chi tiết nhiệm vụ |

## 6. Bảng `COLONIST` (Lưu thông tin Cư dân)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| MarsColonistID | VARCHAR(50) | **PK** | Mã số cư dân định cư |
| LotNumber | VARCHAR(20) | **FK**, NULL | Lô đất được phân bổ sinh sống |
| TripID | INT | **FK**, NOT NULL | Chuyến bay đưa cư dân đến Sao Hỏa |
| FirstName | VARCHAR(100) | NOT NULL | Tên |
| MiddleName | VARCHAR(100) | NULL | Tên lót |
| Surname | VARCHAR(100) | NOT NULL | Họ |
| Gender | VARCHAR(20) | NOT NULL | Giới tính |
| DateOfBirth | DATE | NOT NULL | Ngày sinh |
| CivilStatus | VARCHAR(50) | NOT NULL | Tình trạng hôn nhân |
| ContactNo | VARCHAR(30) | NULL | Số điện thoại liên lạc ở Trái Đất |
| Qualification | VARCHAR(100) | NOT NULL | Trình độ chuyên môn/Học vấn |
| NoOfFamilyMembers| INT | NULL | Số lượng thành viên gia đình (Thuộc tính dẫn xuất) |

## 7. Bảng `DEPENDENT` (Lưu thông tin Người phụ thuộc)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| DependentID | INT | **PK** | Mã định danh người phụ thuộc |
| MarsColonistID | VARCHAR(50) | **FK**, NOT NULL | Cư dân bảo lãnh |
| FirstName | VARCHAR(100) | NOT NULL | Tên |
| Surname | VARCHAR(100) | NOT NULL | Họ |
| Relationship | VARCHAR(50) | NOT NULL | Mối quan hệ (Vợ/Chồng, Con) |

## 8. Bảng `WORK` (Bảng phân công việc làm)

| Tên Thuộc Tính | Kiểu Dữ Liệu | Ràng Buộc | Mô Tả |
|---|---|---|---|
| MarsColonistID | VARCHAR(50) | **PK, FK** | Mã cư dân |
| JobID | INT | **PK, FK** | Mã công việc được phân công |
| Status | VARCHAR(50) | NOT NULL | Trạng thái (Đang làm, Đã nghỉ) |
| AssignedDate | DATE | NOT NULL | Ngày nhận việc |
