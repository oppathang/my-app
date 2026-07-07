# Database Schema - Feng Shui App
## 1. Table: users
| Column Name | Data Type | Constraints | Description |
| :---------- | :----------- | :--------------------------- | :-------------------------- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | ID định danh người dùng |
| full_name | VARCHAR(100) | NOT NULL | Họ và tên người dùng |
| gender | ENUM | ('male', 'female') | Giới tính |
| dob | DATE | NOT NULL | Ngày tháng năm sinh dương |
## 2. Table: consultation_history
| Column Name | Data Type | Constraints | Description |
| :--------------- | :----------- | :--------------------------- | :------------------------------ |
| id | INT | PRIMARY KEY, AUTO_INCREMENT | ID lượt tra cứu |
| birth_year | INT | NOT NULL | Năm sinh âm lịch dùng để tính |
| destiny_element | VARCHAR(50) | NOT NULL | Mệnh ngũ hành (VD: Đại
Lâm Mộc)|
| kua_number | VARCHAR(50) | NOT NULL | Cung mệnh (VD: Cung Khảm)
|
