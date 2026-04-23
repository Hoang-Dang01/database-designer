DROP DATABASE IF EXISTS MarsColony;
CREATE DATABASE MarsColony;

USE MarsColony;

-- 1. Bảng E_JET
CREATE TABLE E_JET (
    JetCode VARCHAR(20) PRIMARY KEY,
    PowerSource VARCHAR(50) NOT NULL,
    NumberOfSeat INT NOT NULL,
    Weight DECIMAL(10,2) NOT NULL,
    NuclearEnginePower VARCHAR(50),
    MadeYear INT NOT NULL,
    JetType VARCHAR(50) NOT NULL
);

-- 2. Bảng HOUSE
CREATE TABLE HOUSE (
    LotNumber VARCHAR(20) PRIMARY KEY,
    NumberOfRoom INT NOT NULL,
    SquareFeet DECIMAL(10,2) NOT NULL
);

-- 3. Bảng JOB
CREATE TABLE JOB (
    JobID INT PRIMARY KEY,
    JobTitle VARCHAR(100) NOT NULL,
    Description TEXT
);

-- 4. Bảng PILOT
CREATE TABLE PILOT (
    AstronomersID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Rank VARCHAR(50) NOT NULL,
    SpaceHours INT NOT NULL DEFAULT 0,
    JetCode VARCHAR(20) NOT NULL,
    FOREIGN KEY (JetCode) REFERENCES E_JET(JetCode)
);

-- 4.1 Bảng đa trị PILOT_QUALIFICATION
CREATE TABLE PILOT_QUALIFICATION (
    AstronomersID INT,
    Qualification VARCHAR(100),
    PRIMARY KEY (AstronomersID, Qualification),
    FOREIGN KEY (AstronomersID) REFERENCES PILOT(AstronomersID) ON DELETE CASCADE
);

-- 5. Bảng TRIP
CREATE TABLE TRIP (
    TripID INT PRIMARY KEY,
    LaunchDate DATE NOT NULL,
    ReturnDate DATE,
    JetCode VARCHAR(20) NOT NULL,
    FOREIGN KEY (JetCode) REFERENCES E_JET(JetCode)
);

-- 6. Bảng COLONIST (Đã chuẩn hóa 3NF, bỏ NoOfFamilyMembers)
CREATE TABLE COLONIST (
    MarsColonizationID VARCHAR(50) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Gender VARCHAR(20) NOT NULL,
    DateOfBirth DATE NOT NULL,
    EarthAddress VARCHAR(255),
    CivilStatus VARCHAR(50) NOT NULL,
    ContactNo VARCHAR(30),
    LotNumber VARCHAR(20),
    TripID INT NOT NULL,
    FOREIGN KEY (LotNumber) REFERENCES HOUSE(LotNumber),
    FOREIGN KEY (TripID) REFERENCES TRIP(TripID)
);

-- 6.1 Bảng đa trị COLONIST_QUALIFICATION
CREATE TABLE COLONIST_QUALIFICATION (
    MarsColonizationID VARCHAR(50),
    Qualification VARCHAR(100),
    PRIMARY KEY (MarsColonizationID, Qualification),
    FOREIGN KEY (MarsColonizationID) REFERENCES COLONIST(MarsColonizationID) ON DELETE CASCADE
);

-- 7. Bảng DEPENDENT
CREATE TABLE DEPENDENT (
    DependentID INT PRIMARY KEY,
    MarsColonizationID VARCHAR(50) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    DateOfBirth DATE,
    Gender VARCHAR(20),
    Relationship VARCHAR(50) NOT NULL,
    FOREIGN KEY (MarsColonizationID) REFERENCES COLONIST(MarsColonizationID) ON DELETE CASCADE
);

-- 8. Bảng WORK (Phân công lao động N-N)
CREATE TABLE WORK (
    MarsColonizationID VARCHAR(50),
    JobID INT,
    Status VARCHAR(50) NOT NULL,
    AssignedDate DATE NOT NULL DEFAULT (CURRENT_DATE),
    PRIMARY KEY (MarsColonizationID, JobID),
    FOREIGN KEY (MarsColonizationID) REFERENCES COLONIST(MarsColonizationID) ON DELETE CASCADE,
    FOREIGN KEY (JobID) REFERENCES JOB(JobID) ON DELETE CASCADE
);
