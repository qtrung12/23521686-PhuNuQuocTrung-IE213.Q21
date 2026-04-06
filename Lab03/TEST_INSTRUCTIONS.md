# HƯỚNG DẪN TEST LAB03 - Movie Reviews Backend API

Sinh viên: Phú Nữ Quốc Trung - 23521686

## Chuẩn bị

1. Cập nhật `.env` với MongoDB URI
2. Chạy `npm install`
3. Chạy `npm run dev` -> Server chạy tại `http://localhost:3000`

---

## TEST 6 APIs

### 1. GET /api/v1/movies - Lấy danh sách phim

Method: GET  
URL: `http://localhost:3000/api/v1/movies`

Response: 20 phim đầu tiên

---

### 2. GET /api/v1/movies/ratings - Lấy tất cả ratings

Method: GET  
URL: `http://localhost:3000/api/v1/movies/ratings`

Response: Array ratings (PG, R, PG-13, etc.)

---

### 3. POST /api/v1/movies/review - Thêm review

Method: POST  
URL: `http://localhost:3000/api/v1/movies/review`

Headers: `Content-Type: application/json`

Body (JSON):
```json
{
  "movie_id": "573a1390f29313caabcd6223",
  "review": "great movie",
  "user_id": "23521686",
  "name": "Phú Nữ Quốc Trung"
}
```

Response: 
```json
{ "status": "success" }
```

---

### 4. PUT /api/v1/movies/review - Sửa review

Method: PUT  
URL: `http://localhost:3000/api/v1/movies/review`

Headers: `Content-Type: application/json`

Body (JSON):
```json
{
  "review_id": "<copy from test 3>",
  "user_id": "23521686",
  "review": "bad movie"
}
```

Response: 
```json
{ "status": "success " }
```

---

### 5. DELETE /api/v1/movies/review - Xoá review

Method: DELETE  
URL: `http://localhost:3000/api/v1/movies/review`

Headers: `Content-Type: application/json`

Body (JSON):
```json
{
  "review_id": "<copy from test 3>",
  "user_id": "23521686"
}
```

Response: 
```json
{ "status": "success " }
```

---

### 6. GET /api/v1/movies/id/:id - Lấy phim + reviews

Method: GET  
URL: `http://localhost:3000/api/v1/movies/id/573a1390f29313caabcd6223`

Response: 
```json
{
  "_id": "573a1390f29313caabcd6223",
  "title": "...",
  "reviews": [
    {
      "_id": "...",
      "name": "Phú Nữ Quốc Trung",
      "user_id": "23521686",
      "review": "...",
      "date": "..."
    }
  ]
}
```


