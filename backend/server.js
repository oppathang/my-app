const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// API Tra cứu phong thủy
app.post('/api/v1/calculate', (req, res) => {
const { birthYear, gender } = req.body;
// Ở bước này ta dùng dữ liệu giả lập (mock data) để test hệ thống K8s trước
// Khi luồng CI/CD trơn tru, ta sẽ ráp công thức tính toán thật vào đây.
let kua = "Khảm"; // Mặc định
if (gender === 'female') kua = "Cấn";
res.json({
status: "success",
data: {
birthYear: birthYear,
element: "Lộ Bàng Thổ", // Giả lập ngũ hành
kua: kua,
good_directions: ["Đông Nam (Sinh Khí)", "Đông (Thiên Y)"],
bad_directions: ["Tây Nam (Tuyệt Mệnh)", "Tây (Họa Hại)"]
}
});
});

// Mở cổng 8080 cho K8s gọi vào
const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
console.log(`Backend App Phong Thuy dang chay tai port ${PORT}`);
});
