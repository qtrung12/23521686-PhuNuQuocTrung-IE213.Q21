# Lab04 – Thiết lập Frontend với ReactJS

## 1. Mục tiêu

- Xây dựng frontend Movie Reviews bằng ReactJS
- Cài đặt React-Bootstrap, Bootstrap, React Router DOM
- Xây dựng Navbar, 4 components (MoviesList, Movie, AddReview, Login)
- Cấu hình 5 routes với state management

## 2. Thông tin sinh viên

- **Họ tên:** Phú Nữ Quốc Trung
- **MSSV:** 23521686
- **Lớp:** IE213.Q21
- **Môn học:** IE213 – Kỹ thuật phát triển hệ thống Web

## 3. Công cụ và môi trường sử dụng

- **Node.js & npm:** Runtime và package manager
- **React 19.2.5:** UI library
- **React-Bootstrap 2.10.10 & Bootstrap 5.3.8:** UI components
- **React Router DOM 7.14.1:** Client-side routing
- **MongoDB Atlas:** Backend database (Lab03)
- **Visual Studio Code:** Code editor
- **Windows 11:** Development OS

## 4. Cấu trúc thư mục

```
Lab04/
├── README.md
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── components/
│           ├── movies-list.js
│           ├── movie.js
│           ├── add-review.js
│           └── login.js
└── screenshots/
```

## 5. Nội dung thực hiện

- Cài đặt dependencies: React-Bootstrap, Bootstrap, React Router DOM
- Navbar: Logo "Movie Reviews", state user management (login/logout)
- 4 Components: MoviesList (fetch API), Movie (useParams), AddReview (auth check), Login (form login)
- 5 Routes: `/`, `/movies`, `/movies/:id`, `/movies/:id/review`, `/login`
- BrowserRouter wrapper ở index.js
- Bootstrap responsive: Navbar toggle, Grid layout responsive

## 6. Quy trình triển khai

Cài đặt dependencies và cấu hình các components theo cấu trúc thư mục đã định nghĩa. App.js được cấu hình với Navbar, 5 routes, và state management cho user login/logout. index.js bọc App bằng BrowserRouter để hỗ trợ client-side routing. Chạy `npm start` để khởi động development server tại port 3001, backend API tại port 3000.

## 7. Kết quả đạt được

Ứng dụng frontend hoàn chỉnh với:
- **Navigation:** Navbar responsive với logo "Movie Reviews" và state-based menu (Login/Logout)
- **Routing:** 5 routes tương ứng với 4 components chính, support dynamic URL parameters
- **State Management:** User authentication state quản lý ở component gốc, truyền xuống qua props
- **API Integration:** MoviesList component fetch dữ liệu từ backend MongoDB qua REST API
- **Access Control:** AddReview form yêu cầu user authentication, tự động redirect đến login nếu chưa đăng nhập
- **User Interface:** Bootstrap 5 responsive design, Grid system, Form components, Alert notifications
- **Minh chứng:** 13 ảnh documenting toàn bộ quá trình cài đặt, cấu hình, và kiểm thử functionality

## 8. Chi tiết các file chính

### App.js
- State: `user` (null | username)
- Functions: `login(username)`, `logout()`
- Navbar: Logo "Movie Reviews", links "Movies" + conditional "Login" / "Logout User"
- Routes (5): `/`, `/movies`, `/movies/:id`, `/movies/:id/review`, `/login`

### movies-list.js
- Hooks: `useState` (movies, loading, error), `useEffect` (fetch API)
- API: `GET http://localhost:3000/api/v1/movies`
- Render: Heading, error alert, Bootstrap grid with cards

### movie.js
- Hooks: `useParams()` (lấy id từ URL)
- Props: `user` (từ App)
- Render: Movie id, user status, "Add Review" button

### add-review.js
- Hooks: `useState` (review), `useParams()`, `useNavigate()`
- Props: `user` (từ App)
- Logic: Check user → if not logged in, redirect `/login`; if logged in, submit + navigate `/movies/:id`

### login.js
- Hooks: `useState` (username), `useNavigate()`
- Props: `login` callback (từ App)
- Logic: Capture username → call `props.login()` → navigate `/movies`

### index.js
- **Quan trọng:** Wrap App bằng `BrowserRouter` để enable routing
