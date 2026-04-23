# TÀI LIỆU ÔN TẬP BẢO VỆ ĐỒ ÁN - THIẾT KẾ CƠ SỞ DỮ LIỆU
**Dự án: Hệ thống Quản trị Thuộc địa Sao Hỏa (Mars Colony)**

Tài liệu này tổng hợp các câu hỏi trọng tâm về lý thuyết Thiết kế Cơ sở dữ liệu, tập trung vào ERD, Chuẩn hóa (Normalization) và Ràng buộc toàn vẹn. Hãy ôn kỹ để trả lời trôi chảy trước Hội đồng bảo vệ.

---

## Câu 1: Giải thích thứ tự và tư duy thiết kế các bảng trong hệ thống?
**Trả lời:**
Nguyên tắc thiết kế CSDL là **Bảng độc lập (không chứa khóa ngoại) phải được tạo trước**, sau đó mới tạo các bảng phụ thuộc (chứa khóa ngoại).
1. **Các bảng gốc (Độc lập):** `E_JET` (Tàu), `HOUSE` (Nhà ở), `JOB` (Công việc). Các bảng này tự tồn tại, không phụ thuộc vào dữ liệu bảng khác.
2. **Các bảng phụ thuộc bậc 1:** `PILOT` (Phi công) và `TRIP` (Chuyến bay). Cả 2 bảng này cần lấy mã Tàu (`JetCode`) làm khóa ngoại (Foreign Key) để biết phi công lái tàu nào và chuyến bay dùng tàu nào.
3. **Các bảng phụ thuộc bậc 2:** `COLONIST` (Cư dân). Bảng này phải kéo khóa ngoại từ cả Nhà (`LotNumber`) và Chuyến bay (`TripID`).
4. **Các bảng phụ thuộc bậc 3:** `DEPENDENT` (Người phụ thuộc) lấy khóa ngoại từ `COLONIST`. Bảng kết hợp `WORK` lấy khóa ngoại từ cả `COLONIST` và `JOB`.

---

## Câu 2: Trong hệ thống có mối quan hệ Nhiều - Nhiều (N-N) không? Cách giải quyết?
**Trả lời:**
Dạ có. Đó là mối quan hệ giữa Cư dân (`COLONIST`) và Công việc (`JOB`). 
- Một cư dân có thể đảm nhận nhiều công việc khác nhau.
- Một công việc có thể có nhiều cư dân cùng làm.

**Cách giải quyết:** Theo nguyên lý thiết kế CSDL quan hệ, không thể lưu trực tiếp quan hệ N-N. Vì vậy, em đã **tách nó ra thành một bảng trung gian (Bảng kết hợp) tên là `WORK`**. 
Bảng `WORK` này mượn 2 khóa ngoại từ 2 bảng kia (`MarsColonistID` và `JobID`) gộp lại với nhau để tạo thành **Khóa chính ghép (Composite Primary Key)**. Điều này giúp triệt tiêu quan hệ N-N thành hai quan hệ 1-N.

---

## Câu 3: Dữ liệu của hệ thống đã đạt Dạng Chuẩn (Normalization) mức mấy?
**Trả lời:**
Thiết kế CSDL của em đạt **Dạng Chuẩn 3 (3NF)**:
- **Đạt 1NF:** Vì tất cả các cột đều chứa giá trị nguyên tố (không có thuộc tính đa trị hay mảng).
- **Đạt 2NF:** Vì tất cả các thuộc tính không khóa đều phụ thuộc hoàn toàn vào toàn bộ khóa chính (Không có sự phụ thuộc một phần vào Khóa chính ghép ở bảng `WORK`).
- **Đạt 3NF:** Vì không có thuộc tính nào phụ thuộc bắc cầu vào khóa chính (Tức là không có cột nào có thể suy ra từ một cột không phải là khóa chính khác).

**Lưu ý đặc biệt (Dùng để lấy điểm cộng):**
Riêng ở bảng `COLONIST`, em cố tình giữ lại cột `NoOfFamilyMembers` (Số lượng thành viên gia đình). Về mặt lý thuyết chuẩn hóa khắt khe, đây là *thuộc tính dẫn xuất* (có thể tính ra bằng lệnh `COUNT()` từ bảng `DEPENDENT`). Tuy nhiên, trong thực tế kỹ thuật tối ưu CSDL (Denormalization - Phi chuẩn hóa có chủ đích), việc giữ lại cột này giúp **tăng tốc độ truy vấn** đáng kể khi hệ thống có hàng triệu cư dân, tránh việc phải chạy lệnh đếm (JOIN và COUNT) liên tục gây nghẽn Server.

---

## Câu 4: Ràng buộc toàn vẹn tham chiếu (Referential Integrity) là gì? Trong đồ án có áp dụng không?
**Trả lời:**
Dạ, ràng buộc toàn vẹn tham chiếu là tính nhất quán của dữ liệu được bảo vệ qua các Khóa ngoại (Foreign Key). Nó đảm bảo rằng dữ liệu ở bảng phụ thuộc phải tham chiếu đến một dữ liệu có thật ở bảng gốc.

**Ví dụ thực tế trong đồ án:**
Nếu em muốn phân công Tàu cho một Phi công mới, em bắt buộc phải nhập đúng một mã Tàu (`JetCode`) đã tồn tại sẵn trong bảng `E_JET`. Em không thể nhập bừa một mã "Tàu Ma" được, hệ thống MySQL sẽ lập tức văng lỗi vi phạm khóa ngoại.
Tương tự, em không thể bấm XÓA một chiếc Tàu đang có lịch bay (Trong bảng `TRIP`), MySQL sẽ chặn lại để bảo vệ tính toàn vẹn của lịch trình.

---

## Câu 5: Hệ thống giao diện Web kết nối với CSDL như thế nào? (Chứng minh tính thực tiễn)
**Trả lời:**
Thưa thầy, để chứng minh mô hình CSDL của em thiết kế là khả thi và thực chiến được, em đã tự tay code thêm một Web App quản trị hoàn chỉnh (Client-Server Architecture).
- Khi người dùng muốn thao tác Thêm dữ liệu (Ví dụ: Thêm Phân công công việc).
- Giao diện Web **không cho phép gõ tay mã khóa ngoại** mà sẽ dùng JavaScript móc xuống bảng `COLONIST` và `JOB`, lấy dữ liệu lên thành danh sách thả xuống (Dropdown) để chọn. Tính năng này giúp loại bỏ 100% lỗi sai chính tả mã tham chiếu từ người dùng.
- Khi bấm "Thêm", Backend (Node.js) sẽ nhận mã và bắn lệnh `INSERT INTO` thẳng vào MySQL. Quá trình này chứng minh CSDL hoàn toàn sẵn sàng cho môi trường Production thực tế.
