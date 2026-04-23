# Sơ đồ ERD - Mars Colony

Dưới đây là sơ đồ ERD Mức Khái niệm (Chen Notation) thể hiện các thực thể, thuộc tính và mối quan hệ của hệ thống quản lý định cư Sao Hỏa.

```mermaid
graph TD
    %% Định nghĩa CSS
    classDef entity fill:#f9f9f9,stroke:#333,stroke-width:2px,font-weight:bold;
    classDef attribute fill:#fff,stroke:#333,stroke-width:1px;
    classDef relationship fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,font-weight:bold;

    %% Thực Thể
    JET[E_JET]:::entity
    PILOT[PILOT]:::entity
    TRIP[TRIP]:::entity
    COLONIST[COLONIST]:::entity
    HOUSE[HOUSE]:::entity
    DEP[DEPENDENT]:::entity
    JOB[JOB]:::entity

    %% Thuộc tính E_JET
    jet_id([<u>JetCode</u>]):::attribute --- JET
    jet_pw([PowerSource]):::attribute --- JET
    jet_seat([NumberOfSeats]):::attribute --- JET
    jet_w([Weight]):::attribute --- JET
    jet_nuke([NuclearEnginePower]):::attribute --- JET
    jet_yr([MadeYear]):::attribute --- JET
    jet_type([JetType]):::attribute --- JET

    %% Thuộc tính PILOT
    p_id([<u>AstronomersID</u>]):::attribute --- PILOT
    p_name([Name]):::attribute --- PILOT
    p_rank([Rank]):::attribute --- PILOT
    p_hrs([SpaceHours]):::attribute --- PILOT

    %% Thuộc tính TRIP
    t_id([<u>TripID</u>]):::attribute --- TRIP
    t_l([LaunchDate]):::attribute --- TRIP
    t_r([ReturnDate]):::attribute --- TRIP

    %% Thuộc tính COLONIST
    c_id([<u>MarsColonistID</u>]):::attribute --- COLONIST
    c_fn([FirstName]):::attribute --- COLONIST
    c_mn([MiddleName]):::attribute --- COLONIST
    c_sn([Surname]):::attribute --- COLONIST
    c_g([Gender]):::attribute --- COLONIST
    c_dob([DateOfBirth]):::attribute --- COLONIST
    c_cs([CivilStatus]):::attribute --- COLONIST
    c_cn([ContactNo]):::attribute --- COLONIST
    c_q([Qualification]):::attribute --- COLONIST
    c_fam([NoOfFamilyMembers]):::attribute --- COLONIST

    %% Thuộc tính DEPENDENT
    d_id([<u>DependentID</u>]):::attribute --- DEP
    d_fn([FirstName]):::attribute --- DEP
    d_sn([Surname]):::attribute --- DEP
    d_rel([Relationship]):::attribute --- DEP

    %% Thuộc tính HOUSE
    h_lot([<u>LotNumber</u>]):::attribute --- HOUSE
    h_rm([NumberOfRoom]):::attribute --- HOUSE
    h_sq([SquareFeet]):::attribute --- HOUSE

    %% Thuộc tính JOB
    j_id([<u>JobID</u>]):::attribute --- JOB
    j_title([JobTitle]):::attribute --- JOB
    j_desc([Description]):::attribute --- JOB

    %% Mối quan hệ
    Lais{Lái tàu}:::relationship
    JET ---|1| Lais
    Lais ---|N| PILOT

    ThucHien{Thực hiện}:::relationship
    JET ---|1| ThucHien
    ThucHien ---|N| TRIP

    ChoCho{Chuyên chở}:::relationship
    TRIP ---|1| ChoCho
    ChoCho ---|N| COLONIST

    NguoiNha{Có người nhà}:::relationship
    COLONIST ---|1| NguoiNha
    NguoiNha ---|N| DEP

    CuTru{Cư trú}:::relationship
    HOUSE ---|1| CuTru
    CuTru ---|N| COLONIST

    Work{Làm việc}:::relationship
    COLONIST ---|M| Work
    Work ---|N| JOB
    
    %% Thuộc tính của Mối quan hệ M-N (WORK)
    w_status([Status]):::attribute --- Work
    w_date([AssignedDate]):::attribute --- Work

```

## Nhận xét độ chuẩn xác (Mọi yêu cầu)

Sơ đồ và Cấu trúc quan hệ hiện tại của bạn đã **RẤT CHUẨN** và bám sát lý thuyết cơ sở dữ liệu. Tuy nhiên, để "đúng mọi yêu cầu" và không bị giảng viên bắt lỗi khi bảo vệ, bạn nên lưu ý vài điểm nhỏ sau:

1. **Thuộc tính dẫn xuất `NoOfFamilyMembers` trong `COLONIST`**: 
   - Về mặt lý thuyết chuẩn hóa (Normalization), thuộc tính này có thể được tính bằng cách đếm (COUNT) số người trong bảng `DEPENDENT`. Tuy nhiên, trong thực tế hệ thống lớn, người ta vẫn giữ thuộc tính này để tăng tốc độ truy vấn. Khi viết báo cáo, bạn nên ghi chú rõ đây là *Thuộc tính dẫn xuất (Derived Attribute)* để giảng viên thấy bạn hiểu bài.
2. **Khóa chính của `DEPENDENT`**:
   - Nếu `DependentID` là ID tự tăng độc lập thì không sao. Nhưng nếu `DependentID` chỉ là số thứ tự (1, 2, 3) của mỗi người phụ thuộc trong gia đình đó, thì Khóa chính phải là Composite Key: `(MarsColonistID, DependentID)`.
3. **Mối quan hệ E_JET và PILOT**:
   - Hiện tại cấu trúc là 1 phi công chỉ lái 1 tàu (`JetCode` nằm trong `PILOT`). Điều này có nghĩa phi công đó được gắn chết với tàu đó. Nếu phi công có thể đổi tàu qua lại, thì mối quan hệ này phải là N-N. Nhưng theo thiết kế của bạn, 1-N đã đủ đáp ứng yêu cầu cơ bản.
