# HƯỚNG DẪN CHẠY DEMO ĐỒ ÁN (MARS COLONY) - PHIÊN BẢN MYSQL

Hệ thống sử dụng **Node.js** làm Backend và **MySQL (thông qua XAMPP)** làm cơ sở dữ liệu.

---

## BƯỚC 1: BẬT MYSQL (XAMPP) VÀ TẠO DATABASE
1. Mở phần mềm **XAMPP Control Panel** trên máy tính của bạn.
2. Tại dòng **MySQL**, bấm nút **Start**.
3. Mở trình duyệt web, truy cập vào `http://localhost/phpmyadmin/`.
4. Bấm vào nút **Mới (New)** ở cột bên trái để tạo Database.
   - Tên cơ sở dữ liệu nhập là: `MarsColony`
   - Bấm **Tạo**.
5. Mở database `MarsColony` vừa tạo, chọn tab **SQL**.
6. Copy toàn bộ nội dung trong file `4_Cai_Dat_DBMS.sql` dán vào và bấm **Thực hiện (Go)** để tự động tạo toàn bộ các bảng.

---

## BƯỚC 2: KHỞI ĐỘNG HỆ THỐNG (CHẠY BACKEND)
1. Mở thư mục `MarsColony` trên máy tính của bạn.
2. Tìm file có tên là **`start.bat`**.
3. **Click đúp chuột** vào file đó.
   - Nó sẽ tự động cài đặt thư viện MySQL và khởi động máy chủ (Backend).
   - Nếu thấy dòng chữ `Đã kết nối thành công tới Database MySQL (XAMPP)!`, nghĩa là máy chủ đã chạy.
   - **Lưu ý quan trọng**: ĐỪNG tắt cái màn hình đen này đi trong suốt quá trình demo nhé! Cứ thu nhỏ nó xuống là được.

---

## BƯỚC 3: MỞ GIAO DIỆN WEB ĐỂ THÊM DỮ LIỆU
1. Trong cùng thư mục `MarsColony`, tìm file **`index.html`**.
2. **Click đúp chuột** để mở file bằng trình duyệt (Chrome, Cốc Cốc, Edge...).
3. Giao diện quản lý sẽ hiện ra. Bạn thử nhập mã cư dân, tên họ và bấm **Thêm Cư dân**.
4. Dữ liệu sẽ lập tức được gửi xuống Backend và lưu cứng vào MySQL.
5. Để chứng minh với giảng viên, bạn mở lại `http://localhost/phpmyadmin/`, bấm vào bảng `COLONIST` để show dữ liệu vừa được thêm vào.

*Chúc bạn bảo vệ đồ án đạt điểm tối đa!*
