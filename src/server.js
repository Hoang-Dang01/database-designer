const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Phục vụ các file tĩnh (HTML, CSS, JS) từ thư mục public
app.use(express.static(path.join(__dirname, 'public')));

// Khởi tạo Database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MarsColony'
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi khi kết nối MySQL:', err.message);
        return;
    }
    console.log('Đã kết nối thành công tới Database MySQL (MarsColony)!');
});

// Helper function để xử lý các truy vấn DB chung
const executeQuery = (res, sql, params, successMessage) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Lỗi DB:', err.message);
            res.status(500).json({ error: err.message });
        } else {
            if (successMessage) {
                res.json({ message: successMessage });
            } else {
                res.json(results);
            }
        }
    });
};

// Helper để chèn dữ liệu đa trị
const insertMultiValues = (table, idField, idValue, valField, valuesArray, res, successMsg) => {
    if (!valuesArray || valuesArray.length === 0) {
        res.json({ message: successMsg });
        return;
    }
    const sql = `INSERT INTO ${table} (${idField}, ${valField}) VALUES ?`;
    const values = valuesArray.map(val => [idValue, val.trim()]);
    
    db.query(sql, [values], (err) => {
        if (err) {
            console.error('Lỗi thêm dữ liệu đa trị:', err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: successMsg });
        }
    });
};

// ==========================================
// 1. E_JET (Tàu vũ trụ)
// ==========================================
app.get('/api/ejets', (req, res) => executeQuery(res, 'SELECT * FROM E_JET', []));
app.post('/api/ejets', (req, res) => {
    const { JetCode, PowerSource, NumberOfSeat, Weight, NuclearEnginePower, MadeYear, JetType } = req.body;
    const sql = `INSERT INTO E_JET (JetCode, PowerSource, NumberOfSeat, Weight, NuclearEnginePower, MadeYear, JetType) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    executeQuery(res, sql, [JetCode, PowerSource, NumberOfSeat, Weight, NuclearEnginePower, MadeYear, JetType], 'Thêm E_JET thành công!');
});
app.delete('/api/ejets/:id', (req, res) => executeQuery(res, 'DELETE FROM E_JET WHERE JetCode = ?', [req.params.id], 'Xóa E_JET thành công!'));

// ==========================================
// 2. HOUSE (Nơi ở)
// ==========================================
app.get('/api/houses', (req, res) => executeQuery(res, 'SELECT * FROM HOUSE', []));
app.post('/api/houses', (req, res) => {
    const { LotNumber, NumberOfRoom, SquareFeet } = req.body;
    const sql = `INSERT INTO HOUSE (LotNumber, NumberOfRoom, SquareFeet) VALUES (?, ?, ?)`;
    executeQuery(res, sql, [LotNumber, NumberOfRoom, SquareFeet], 'Thêm HOUSE thành công!');
});
app.delete('/api/houses/:id', (req, res) => executeQuery(res, 'DELETE FROM HOUSE WHERE LotNumber = ?', [req.params.id], 'Xóa HOUSE thành công!'));

// ==========================================
// 3. JOB (Công việc)
// ==========================================
app.get('/api/jobs', (req, res) => executeQuery(res, 'SELECT * FROM JOB', []));
app.post('/api/jobs', (req, res) => {
    const { JobID, JobTitle, Description } = req.body;
    const sql = `INSERT INTO JOB (JobID, JobTitle, Description) VALUES (?, ?, ?)`;
    executeQuery(res, sql, [JobID, JobTitle, Description], 'Thêm JOB thành công!');
});
app.delete('/api/jobs/:id', (req, res) => executeQuery(res, 'DELETE FROM JOB WHERE JobID = ?', [req.params.id], 'Xóa JOB thành công!'));

// ==========================================
// 4. PILOT (Phi công)
// ==========================================
app.get('/api/pilots', (req, res) => executeQuery(res, 'SELECT p.*, GROUP_CONCAT(pq.Qualification) as Qualifications FROM PILOT p LEFT JOIN PILOT_QUALIFICATION pq ON p.AstronomersID = pq.AstronomersID GROUP BY p.AstronomersID', []));
app.post('/api/pilots', (req, res) => {
    const { AstronomersID, Name, Rank, SpaceHours, JetCode, Qualifications } = req.body;
    const sql = `INSERT INTO PILOT (AstronomersID, Name, Rank, SpaceHours, JetCode) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(sql, [AstronomersID, Name, Rank, SpaceHours || 0, JetCode], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        
        let qualArray = [];
        if (Qualifications) {
            qualArray = Qualifications.split(',').filter(q => q.trim() !== '');
        }
        insertMultiValues('PILOT_QUALIFICATION', 'AstronomersID', AstronomersID, 'Qualification', qualArray, res, 'Thêm PILOT thành công!');
    });
});
app.delete('/api/pilots/:id', (req, res) => executeQuery(res, 'DELETE FROM PILOT WHERE AstronomersID = ?', [req.params.id], 'Xóa PILOT thành công!'));

// ==========================================
// 5. TRIP (Chuyến bay)
// ==========================================
app.get('/api/trips', (req, res) => executeQuery(res, 'SELECT * FROM TRIP', []));
app.post('/api/trips', (req, res) => {
    const { TripID, LaunchDate, ReturnDate, JetCode } = req.body;
    const sql = `INSERT INTO TRIP (TripID, LaunchDate, ReturnDate, JetCode) VALUES (?, ?, ?, ?)`;
    executeQuery(res, sql, [TripID, LaunchDate, ReturnDate || null, JetCode], 'Thêm TRIP thành công!');
});
app.delete('/api/trips/:id', (req, res) => executeQuery(res, 'DELETE FROM TRIP WHERE TripID = ?', [req.params.id], 'Xóa TRIP thành công!'));

// ==========================================
// 6. COLONIST (Cư dân)
// ==========================================
app.get('/api/colonists', (req, res) => executeQuery(res, 'SELECT c.*, GROUP_CONCAT(cq.Qualification) as Qualifications FROM COLONIST c LEFT JOIN COLONIST_QUALIFICATION cq ON c.MarsColonizationID = cq.MarsColonizationID GROUP BY c.MarsColonizationID', []));
app.post('/api/colonists', (req, res) => {
    const { MarsColonizationID, Name, Gender, DateOfBirth, EarthAddress, CivilStatus, ContactNo, LotNumber, TripID, Qualifications } = req.body;
    const sql = `INSERT INTO COLONIST (MarsColonizationID, Name, Gender, DateOfBirth, EarthAddress, CivilStatus, ContactNo, LotNumber, TripID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [MarsColonizationID, Name, Gender, DateOfBirth, EarthAddress || null, CivilStatus, ContactNo || null, LotNumber || null, TripID], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        
        let qualArray = [];
        if (Qualifications) {
            qualArray = Qualifications.split(',').filter(q => q.trim() !== '');
        }
        insertMultiValues('COLONIST_QUALIFICATION', 'MarsColonizationID', MarsColonizationID, 'Qualification', qualArray, res, 'Thêm COLONIST thành công!');
    });
});
app.delete('/api/colonists/:id', (req, res) => executeQuery(res, 'DELETE FROM COLONIST WHERE MarsColonizationID = ?', [req.params.id], 'Xóa COLONIST thành công!'));

// ==========================================
// 7. DEPENDENT (Người nhà)
// ==========================================
app.get('/api/dependents', (req, res) => executeQuery(res, 'SELECT * FROM DEPENDENT', []));
app.post('/api/dependents', (req, res) => {
    const { DependentID, MarsColonizationID, Name, DateOfBirth, Gender, Relationship } = req.body;
    const sql = `INSERT INTO DEPENDENT (DependentID, MarsColonizationID, Name, DateOfBirth, Gender, Relationship) VALUES (?, ?, ?, ?, ?, ?)`;
    executeQuery(res, sql, [DependentID, MarsColonizationID, Name, DateOfBirth || null, Gender || null, Relationship], 'Thêm DEPENDENT thành công!');
});
app.delete('/api/dependents/:id', (req, res) => executeQuery(res, 'DELETE FROM DEPENDENT WHERE DependentID = ?', [req.params.id], 'Xóa DEPENDENT thành công!'));

// ==========================================
// 8. WORK (Phân công công việc)
// ==========================================
app.get('/api/works', (req, res) => executeQuery(res, 'SELECT * FROM WORK', []));
app.post('/api/works', (req, res) => {
    const { MarsColonizationID, JobID, Status, AssignedDate } = req.body;
    const sql = `INSERT INTO WORK (MarsColonizationID, JobID, Status, AssignedDate) VALUES (?, ?, ?, ?)`;
    executeQuery(res, sql, [MarsColonizationID, JobID, Status, AssignedDate || new Date().toISOString().split('T')[0]], 'Phân công WORK thành công!');
});
// Xóa ở bảng WORK cần cả 2 khóa chính
app.delete('/api/works/:colonistId/:jobId', (req, res) => {
    const { colonistId, jobId } = req.params;
    executeQuery(res, 'DELETE FROM WORK WHERE MarsColonizationID = ? AND JobID = ?', [colonistId, jobId], 'Xóa WORK thành công!');
});

app.listen(port, () => {
    console.log(`Backend Server đang chạy tại http://localhost:${port}`);
    console.log(`Vui lòng truy cập http://localhost:${port}/index.html để xem giao diện.`);
});
