# Lab03 – Hoàn thiện Back-end cho ứng dụng Movie Reviews

## 1. Mục tiêu

- Xây dựng hệ thống quản lý reviews cho phim (CRUD: Create, Read, Update, Delete)
- Tạo ReviewsController và ReviewsDAO với xử lý ObjectId conversion
- Mở rộng MoviesAPI: lấy phim kèm reviews liên quan (MongoDB $lookup aggregation)
- Lấy danh sách tất cả ratings (MongoDB distinct())
- Đảm bảo chỉ user tạo review mới được sửa/xoá (user ownership validation)

## 2. Thông tin sinh viên

- **Họ tên:** Phú Nữ Quốc Trung
- **MSSV:** 23521686
- **Lớp:** IE213.Q21
- **Môn học:** IE213 – Kỹ thuật phát triển hệ thống Web

## 3. Công cụ và môi trường sử dụng

- **Node.js**: Runtime chạy backend
- **Express.js**: Framework xây dựng REST API
- **MongoDB Atlas**: Cơ sở dữ liệu cloud (sample_mflix)
- **MongoDB Node.js Driver v6.0.0**: Kết nối và thao tác dữ liệu
- **Dotenv**: Quản lý biến môi trường
- **CORS**: Cho phép gọi API từ frontend
- **Nodemon**: Hỗ trợ phát triển (auto-reload)
- **Postman**: Kiểm thử API endpoint

## 4. Cấu trúc thư mục

```
Lab03/
├── README.md
├── TEST_INSTRUCTIONS.md        # Hướng dẫn test 6 API
├── screenshots/                 # Minh chứng test thành công
│   ├── 1_get_movies.png
│   ├── 2_get_ratings.png
│   ├── 3_post_review.png
│   ├── 4_put_review.png
│   ├── 5_get_movie_by_id.png
│   └── 6_delete_review.png
└── movie-reviews/backend/
    ├── package.json            # Khai báo dependencies
    ├── package-lock.json       # Lock version
    ├── .env                    # Biến môi trường
    ├── index.js                # Điểm khởi chạy server
    ├── server.js               # Cấu hình Express
    ├── node_modules/           # Thư viện dependencies
    ├── api/
    │   ├── movies.controller.js    # Controller cho Movie API
    │   ├── movies.route.js         # Route định nghĩa endpoint
    │   └── reviews.controller.js   # Controller cho Review API
    └── dao/
        ├── moviesDAO.js        # DAO cho movies collection
        └── reviewsDAO.js       # DAO cho reviews collection
```

## 5. Nội dung thực hiện

### Bài 1: Thiết lập Routes cho Review

Định nghĩa 3 endpoint CRUD trong `api/movies.route.js`:
- **POST /api/v1/movies/review** – Tạo review mới
- **PUT /api/v1/movies/review** – Cập nhật review (chỉ user tạo ra mới được sửa)
- **DELETE /api/v1/movies/review** – Xoá review (chỉ user tạo ra mới được xoá)

Cộng thêm 2 endpoint mở rộng:
- **GET /api/v1/movies/id/:id** – Lấy phim + reviews liên quan (Bài 4)
- **GET /api/v1/movies/ratings** – Lấy danh sách ratings (Bài 4)

### Bài 2: Tạo ReviewsController

Xử lý HTTP request/response trong `api/reviews.controller.js`:

- **apiPostReview(req, res)**: Nhận movie_id, review, user_id, name → gọi DAO
- **apiUpdateReview(req, res)**: Nhận review_id, user_id, review → cập nhật + kiểm tra ownership
- **apiDeleteReview(req, res)**: Nhận review_id, user_id → xoá + kiểm tra ownership

### Bài 3: Tạo ReviewsDAO

Tầng truy cập dữ liệu trong `dao/reviewsDAO.js`:

- **addReview(movieId, user, review, date)**: 
  - Chuyển movieId thành ObjectId bằng `new ObjectId(movieId)`
  - Lưu review + user info + date vào collection "reviews"
  
- **updateReview(reviewId, userId, review, date)**:
  - Kiểm tra user_id và _id trước update
  - Chỉ cập nhật nếu user là tác giả review
  
- **deleteReview(reviewId, userId)**:
  - Kiểm tra user_id và _id trước delete
  - Chỉ xoá nếu user là tác giả review

**Lưu ý quan trọng:** Sử dụng `new ObjectId(movieId)` chứ không phải `ObjectId(movieId)` do MongoDB driver v6.0.0 yêu cầu `new` keyword

### Bài 4: Mở rộng MoviesAPI

**Phương thức getMovieById() trong moviesDAO.js**:
- Sử dụng MongoDB aggregation pipeline
- **$match**: Tìm phim theo _id
- **$lookup**: Join với collection "reviews" dựa trên movie_id
- Trả về phim + danh sách reviews nested

**Phương thức getRatings() trong moviesDAO.js**:
- Sử dụng MongoDB `distinct("rated")`
- Trả về array các rating unique (PG, R, PG-13, etc.)

**Controller methods trong movies.controller.js**:
- **apiGetMovieById(req, res)**: Lấy id từ params → gọi DAO → trả JSON
- **apiGetRatings(req, res)**: Gọi DAO → trả array ratings

## 6. Cách chạy

### 6.1 Chuẩn bị môi trường

```bash
# Bước 1: Di chuyển vào thư mục backend
cd Lab03/movie-reviews/backend

# Bước 2: Cài đặt dependencies
npm install

# Bước 3: Cấu hình .env
# Tạo file .env (nếu chưa có) với nội dung:
PORT=3000
MOVIEREVIEWS_DB_URI=<mongodb_atlas_uri>
MOVIEREVIEWS_NS=sample_mflix
```

### 6.2 Khởi chạy server

```bash
# Phát triển (auto-reload với nodemon)
npm run dev

# Hoặc sản xuất (production)
npm start
```

Server sẽ chạy tại `http://localhost:3000`

### 6.3 Kiểm thử API

Xem file [TEST_INSTRUCTIONS.md](TEST_INSTRUCTIONS.md) để hướng dẫn test 6 API chi tiết (có code JSON sẵn)

## 7. Kết quả

Backend API hoạt động thành công trên `http://localhost:3000`

**Các endpoint đã test:**
- GET /api/v1/movies – Lấy danh sách phim (20/trang, phân trang)
- GET /api/v1/movies/ratings – Lấy array ratings
- POST /api/v1/movies/review – Tạo review → MongoDB insert
- PUT /api/v1/movies/review – Sửa review → MongoDB update
- DELETE /api/v1/movies/review – Xoá review → MongoDB delete
- GET /api/v1/movies/id/:id – Lấy phim kèm reviews ($lookup aggregation)

**Test responses:**
- Tất cả API trả về **HTTP 200 OK**
- POST/PUT/DELETE trả `{ "status": "success" }`
- GET trả dữ liệu JSON đúng format
- Reviews được lưu/cập nhật/xoá thành công trên MongoDB
- User ownership validation hoạt động (chỉ user tạo review mới được sửa/xoá)

## 8. Hình ảnh minh họa

Đính kèm 6 screenshots Postman chứng minh tất cả API test thành công:

1. [1_get_movies.png](./screenshots/1_get_movies.png) – GET /api/v1/movies – 200 OK
2. [2_get_ratings.png](./screenshots/2_get_ratings.png) – GET /api/v1/movies/ratings – 200 OK
3. [3_post_review.png](./screenshots/3_post_review.png) – POST /api/v1/movies/review – 200 OK
4. [4_put_review.png](./screenshots/4_put_review.png) – PUT /api/v1/movies/review – 200 OK
5. [5_get_movie_by_id.png](./screenshots/5_get_movie_by_id.png) – GET /api/v1/movies/id/:id – 200 OK
6. [6_delete_review.png](./screenshots/6_delete_review.png) – DELETE /api/v1/movies/review – 200 OK

## 9. Ghi chú sử dụng AI

- **Công cụ sử dụng:** ChatGPT, GitHub Copilot.
- **Mục đích sử dụng:** Hỗ trợ gợi ý cấu trúc Routes/Controllers/DAOs, chuẩn hóa README, rà soát cú pháp MongoDB operations và Express middleware.
- **Phạm vi:** Cấu trúc code backend (ReviewsController, ReviewsDAO, aggregation pipeline $lookup/$match, distinct()), hướng dẫn test - toàn bộ thao tác triển khai, viết code CRUD operations và test API được thực hiện thủ công bởi sinh viên.
