USE MarsColony;

-- LƯU Ý QUAN TRỌNG: Phải chạy lần lượt từ trên xuống dưới để không bị lỗi Khóa Ngoại (Foreign Key)

-- 1. Thêm dữ liệu bảng E_JET
INSERT INTO E_JET (JetCode, PowerSource, NumberOfSeat, Weight, NuclearEnginePower, MadeYear, JetType) VALUES 
('JET-Alpha-01', 'Solar', 150, 5000.50, 'High', 2040, 'Passenger'),
('JET-Beta-02', 'Nuclear', 50, 12000.00, 'Extreme', 2045, 'Cargo'),
('JET-Gamma-03', 'Hybrid', 100, 8000.00, 'Medium', 2042, 'Military');

-- 2. Thêm dữ liệu bảng HOUSE
INSERT INTO HOUSE (LotNumber, NumberOfRoom, SquareFeet) VALUES 
('LOT-A1', 4, 1200.50),
('LOT-A2', 2, 800.00),
('LOT-B1', 6, 2000.75),
('LOT-C1', 3, 950.25);

-- 3. Thêm dữ liệu bảng JOB
INSERT INTO JOB (JobID, JobTitle, Description) VALUES 
(1, 'Agricultural Engineer', 'Kỹ sư nông nghiệp - Trồng trọt lương thực trong lồng kính'),
(2, 'Medical Doctor', 'Bác sĩ đa khoa - Chăm sóc sức khỏe cho cư dân'),
(3, 'Mining Specialist', 'Thợ mỏ - Khai thác khoáng sản và băng dưới lòng đất'),
(4, 'System Administrator', 'Quản trị hệ thống AI và điều hòa không khí');

-- 4. Thêm dữ liệu bảng PILOT
INSERT INTO PILOT (AstronomersID, Name, Rank, SpaceHours, JetCode) VALUES 
(101, 'Neil Armstrong Jr', 'Captain', 15000, 'JET-Alpha-01'),
(102, 'Sarah Connor', 'First Officer', 8000, 'JET-Alpha-01'),
(103, 'Elon Musk II', 'Captain', 20000, 'JET-Beta-02');

-- 4.1 Thêm dữ liệu bảng PILOT_QUALIFICATION
INSERT INTO PILOT_QUALIFICATION (AstronomersID, Qualification) VALUES 
(101, 'Master Pilot License'),
(101, 'Nuclear Engine Certified'),
(102, 'Advanced Navigation'),
(103, 'Heavy Cargo Operations');

-- 5. Thêm dữ liệu bảng TRIP
INSERT INTO TRIP (TripID, LaunchDate, ReturnDate, JetCode) VALUES 
(1, '2050-01-15', NULL, 'JET-Alpha-01'),
(2, '2050-06-20', '2051-06-20', 'JET-Beta-02'),
(3, '2051-03-10', NULL, 'JET-Gamma-03');

-- 6. Thêm dữ liệu bảng COLONIST
INSERT INTO COLONIST (MarsColonizationID, Name, Gender, DateOfBirth, EarthAddress, CivilStatus, ContactNo, LotNumber, TripID) VALUES 
('MARS-001', 'John David Smith', 'Male', '1990-05-15', 'New York, Earth', 'Married', '+1-555-0101', 'LOT-A1', 1),
('MARS-002', 'Emma Watson', 'Female', '1995-08-22', 'London, Earth', 'Single', '+44-555-0202', 'LOT-A2', 1),
('MARS-003', 'Akira Tanaka', 'Male', '1988-11-30', 'Tokyo, Earth', 'Married', '+81-555-0303', 'LOT-B1', 2),
('MARS-004', 'Maria Isabel Garcia', 'Female', '1992-02-14', 'Madrid, Earth', 'Single', '+34-555-0404', 'LOT-C1', 3);

-- 6.1 Thêm dữ liệu bảng COLONIST_QUALIFICATION
INSERT INTO COLONIST_QUALIFICATION (MarsColonizationID, Qualification) VALUES 
('MARS-001', 'PhD in Biology'),
('MARS-001', 'Hydroponics Expert'),
('MARS-002', 'MD Medicine'),
('MARS-003', 'MSc Engineering'),
('MARS-004', 'BSc Geology');

-- 7. Thêm dữ liệu bảng DEPENDENT
INSERT INTO DEPENDENT (DependentID, MarsColonizationID, Name, DateOfBirth, Gender, Relationship) VALUES 
(1, 'MARS-001', 'Jane Smith', '1992-04-10', 'Female', 'Spouse'),
(2, 'MARS-001', 'Tommy Smith', '2015-09-01', 'Male', 'Child'),
(3, 'MARS-003', 'Yui Tanaka', '1990-12-25', 'Female', 'Spouse');

-- 8. Thêm dữ liệu bảng WORK
INSERT INTO WORK (MarsColonizationID, JobID, Status, AssignedDate) VALUES 
('MARS-001', 1, 'Active', '2050-08-01'),
('MARS-002', 2, 'Active', '2050-08-05'),
('MARS-003', 4, 'Active', '2050-12-10'),
('MARS-004', 3, 'Active', '2051-09-15');
