# 3. Mô hình Quan hệ (Relational Model) - Mars Colony

Dưới đây là mô hình cơ sở dữ liệu quan hệ (Logical Database Design) được chuyển đổi từ ERD.

*Quy ước:*
- Các thuộc tính **Khóa chính (Primary Key)** được <u>gạch chân</u>.
- Các thuộc tính **Khóa ngoại (Foreign Key)** được in *nghiêng*.

---

**E_JET** (<u>JetCode</u>, PowerSource, NumberOfSeats, Weight, NuclearEnginePower, MadeYear, JetType)

**HOUSE** (<u>LotNumber</u>, NumberOfRoom, SquareFeet)

**JOB** (<u>JobID</u>, JobTitle, Description)

**DEPENDENT** (<u>DependentID</u>, *MarsColonistID*, FirstName, Surname, Relationship)

**PILOT** (<u>AstronomersID</u>, Name, Rank, SpaceHours, *JetCode*)

**TRIP** (<u>TripID</u>, LaunchDate, ReturnDate, *JetCode*)

**COLONIST** (<u>MarsColonistID</u>, FirstName, MiddleName, NoOfFamilyMembers, Qualification, ContactNo, Gender, Surname, CivilStatus, DateOfBirth, *LotNumber*, *TripID*)

**WORK** (*<u>MarsColonistID</u>*, *<u>JobID</u>*, Status, AssignedDate)

---

## Giải thích toàn vẹn tham chiếu (Referential Integrity)

1. `DEPENDENT.MarsColonistID` tham chiếu đến `COLONIST.MarsColonistID`
2. `PILOT.JetCode` tham chiếu đến `E_JET.JetCode`
3. `TRIP.JetCode` tham chiếu đến `E_JET.JetCode`
4. `COLONIST.LotNumber` tham chiếu đến `HOUSE.LotNumber`
5. `COLONIST.TripID` tham chiếu đến `TRIP.TripID`
6. `WORK.MarsColonistID` tham chiếu đến `COLONIST.MarsColonistID`
7. `WORK.JobID` tham chiếu đến `JOB.JobID`
