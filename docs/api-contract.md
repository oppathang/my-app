# API Contract - Feng Shui App
## API Tra cứu Phong Thủy Bát Trạch
- **Endpoint:** `/api/v1/calculate`
- **Method:** `POST`

### Request Payload
```json
{
"birthYear": 1990,
"gender": "male"
}
```

### Response Payload (Success)
```json
{
"status": "success",
"data": {
"birthYear": 1990,
"element": "Lộ Bàng Thổ",
"kua": "Khảm",
"good_directions": ["Đông Nam - Sinh Khí", "Đông - Thiên Y"]
}
}
```
