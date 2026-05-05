# Lab05 - Movie Reviews Frontend

## Thông tin sinh viên

- **Họ tên:** Phú Nữ Quốc Trung
- **MSSV:** 23521686
- **Lớp:** IE213.Q21
- **Môn học:** IE213 - Kỹ thuật phát triển hệ thống Web

## Mục tiêu

- Kết nối React frontend tới backend Movie Reviews thông qua axios.
- Xây dựng service gọi API cho movies, ratings và reviews.
- Xây dựng trang danh sách phim có chức năng tìm kiếm theo title và rating.
- Xây dựng trang chi tiết phim, hiển thị reviews, hỗ trợ Add Review, Edit và Delete.
- Sử dụng momentjs để định dạng ngày review.

## Cấu trúc thư mục

```
Lab05/
├── .gitignore
├── README.md
├── screenshots/
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── index.css
        ├── reportWebVitals.js
        ├── services/
        │   └── movies.js
        └── components/
            ├── movies-list.js
            ├── movie.js
            ├── add-review.js
            └── login.js
```

## Cài đặt

Cài đặt dependencies trong thư mục frontend bằng lệnh:

```bash
cd Lab05/frontend
npm install
```

## Chạy ứng dụng

Backend của các bài trước cần được chạy tại địa chỉ:

```bash
http://localhost:80/api/v1/movies
```

Frontend của Lab05 được khởi động bằng lệnh:

```bash
npm start
```

## Chức năng đã thực hiện

- Hiển thị danh sách phim bằng Card của React-Bootstrap.
- Tìm phim theo title.
- Tìm phim theo rating.
- Xem trang chi tiết phim.
- Hiển thị poster, title, plot và danh sách reviews.
- Khi đã đăng nhập thì hiển thị Add Review.
- Khi review thuộc user hiện tại thì hiển thị Edit và Delete.
- Ngày review được format bằng moment.

## Hình ảnh minh chứng

- `01_movies_home.png`: Trang danh sách phim.
- `02_search_by_title.png`: Tìm kiếm phim theo title.
- `03_search_by_rating.png`: Tìm kiếm phim theo rating.
- `04_movie_detail.png`: Trang chi tiết phim.
- `05_reviews_list.png`: Danh sách reviews của phim.
- `06_logged_in_add_review.png`: Trạng thái đã đăng nhập và có thể thêm review.
- `07_review_edit_delete.png`: Nút Edit/Delete cho review của user hiện tại.
- `08_login_page.png`: Trang đăng nhập.
- `09_add_review_form.png`: Form Add Review.
- `10_edit_review_form.png`: Form Edit Review với nội dung cũ được đổ sẵn.
- `11_delete_review_result.png`: Kết quả sau khi xóa review thành công.

