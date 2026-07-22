# He thong Quan ly Sinh vien (Student Management System)

Bai tap lon mon Lap trinh Web - Xay dung Backend API bang **NestJS + TypeORM + MySQL**, co xac thuc JWT va phan quyen theo vai tro (Admin / Giang vien / Sinh vien).

> Tai lieu nay co 2 phan: **(A)** Gioi thieu he thong & so do lop, **(B)** Huong dan cai dat chi tiet tung buoc.
> Rieng phan huong dan chia cong viec & commit Git cho nhom, xem file **`HUONG_DAN_GIT.md`**.

---

## A. Gioi thieu he thong

### 1. Bieu do lop (Class Diagram / ERD)

Truoc khi code Entity, nhom da phan tich va thong nhat so do quan he giua cac thuc the nhu sau:

```
KHOA (Department)                     GIANG_VIEN (Teacher)
 - khoaId (PK)                         - giangVienId (PK)
 - tenKhoa                             - hoTen
 - moTa                                - email
                                        - soDienThoai
       | 1                             - khoaId (FK -> KHOA)
       |
       | N                                    | 1
   LOP (Class)  --------- N:1 (coVanId) -------
    - lopId (PK)
    - tenLop
    - khoaHoc
    - khoaId (FK -> KHOA)
    - coVanId (FK -> GIANG_VIEN)   [Giang vien lam Co van hoc tap / Chu nhiem]
       |
       | 1
       |
       | N
  SINH_VIEN (Student)                  MON_HOC (Subject)
   - sinhVienId (PK, MSSV)              - monHocId (PK)
   - hoTen                              - tenMonHoc
   - email                              - soTinChi
   - ngaySinh                           - khoaId (FK -> KHOA)
   - gioiTinh
   - diaChi
   - soDienThoai
   - lopId (FK -> LOP)
       |  N                                N |
       -------------------  ------------------
                          \/
              KET_QUA_HOC_TAP (Enrollment)      <-- bang lien ket N-N
               - id (PK)
               - sinhVienId (FK -> SINH_VIEN)
               - monHocId (FK -> MON_HOC)
               - hocKy
               - diemSo

TAI_KHOAN (User - dang nhap he thong)
 - id (PK)
 - tenDangNhap (unique)
 - matKhau (hash)
 - email
 - role (admin | giangvien | sinhvien)
 - sinhVienId (FK -> SINH_VIEN, nullable)  -- 1-1, danh cho tai khoan Sinh vien
 - giangVienId (FK -> GIANG_VIEN, nullable) -- 1-1, danh cho tai khoan Giang vien
```

**Quan he chinh:**
| Quan he | Loai |
|---|---|
| Khoa - Giang vien | 1 - N |
| Khoa - Lop | 1 - N |
| Khoa - Mon hoc | 1 - N |
| Giang vien - Lop (co van) | 1 - N |
| Lop - Sinh vien | 1 - N |
| Sinh vien - Mon hoc | N - N (qua bang `KetQuaHocTap`) |
| Tai khoan - Sinh vien | 1 - 1 (tuy chon) |
| Tai khoan - Giang vien | 1 - 1 (tuy chon) |

### 2. Cong nghe su dung

- **NestJS 10** (Node.js framework, kien truc module hoa)
- **TypeORM 0.3** + **MySQL** (qua driver `mysql2`)
- **JWT (JSON Web Token)** + **Passport** cho xac thuc dang nhap
- **class-validator / class-transformer** de validate du lieu dau vao
- **Swagger** de sinh tai lieu API tu dong
- **Jest** cho unit test / e2e test

### 3. Cau truc thu muc

```
student-management/
├── src/
│   ├── auth/                 # Dang ky, dang nhap, JWT strategy
│   ├── common/                # Guard, Decorator, Enum, Exception filter dung chung
│   ├── database/               # Cau hinh ket noi DB + script seed du lieu mau
│   ├── departments/           # Module Khoa
│   ├── teachers/              # Module Giang vien
│   ├── classes/                # Module Lop
│   ├── students/               # Module Sinh vien
│   ├── subjects/               # Module Mon hoc
│   ├── enrollments/           # Module Ket qua hoc tap (bang lien ket N-N)
│   ├── users/                  # Module Tai khoan dang nhap
│   ├── app.module.ts           # Module goc, import tat ca cac module tren
│   └── main.ts                 # Diem khoi dong ung dung
├── test/                       # e2e test
├── .env.example                 # Mau bien moi truong (copy thanh .env)
├── package.json
└── README.md
```

Moi module (vi du `students/`) deu theo dung mau cua NestJS:
- `*.entity.ts` — dinh nghia bang du lieu (TypeORM)
- `dto/create-*.dto.ts`, `dto/update-*.dto.ts` — validate du lieu dau vao
- `*.service.ts` — xu ly nghiep vu, truy van Database
- `*.controller.ts` — dinh nghia API endpoint (route)
- `*.module.ts` — ket noi Controller + Service + Entity lai voi nhau

---

## B. Huong dan cai dat (tung buoc)

### Buoc 0: Cai dat cong cu can thiet

1. **Node.js** (khuyen nghi ban 18 hoac 20 tro len) — tai tai https://nodejs.org
   Kiem tra da cai dat thanh cong:
   ```bash
   node -v
   npm -v
   ```
2. **XAMPP** (de co san MySQL + phpMyAdmin) — tai tai https://www.apachefriends.org
   Sau khi cai, mo **XAMPP Control Panel** va bam **Start** o dong `MySQL`.
3. **Git** — tai tai https://git-scm.com
4. (Khuyen nghi) **VS Code** de mo va sua code.

### Buoc 1: Lay code ve may

Neu repo nhom da co san tren GitHub:
```bash
git clone <link-repo-cua-nhom>
cd <ten-repo>
```

Neu ban dang cam file zip nay: giai nen ra, mo thu muc do bang VS Code hoac terminal.

### Buoc 2: Tao Database tren phpMyAdmin

1. Mo trinh duyet, vao `http://localhost/phpmyadmin`
2. Bam **New** (Tao moi CSDL) o cot ben trai
3. Dat ten database la: `student_management`
4. Chon **Collation**: `utf8mb4_general_ci` (de go duoc tieng Viet co dau)
5. Bam **Create**

> Luu y: Ban **KHONG can tao bang thu cong**. Ung dung dung `synchronize: true` cua TypeORM, se **tu dong tao toan bo bang** dua tren cac file Entity khi chay lan dau.

### Buoc 3: Cau hinh bien moi truong

Trong thu muc goc cua project, copy file `.env.example` thanh file moi ten la `.env`:

```bash
# Windows (PowerShell)
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Mo file `.env` vua tao, kiem tra lai cho khop voi cau hinh XAMPP cua ban (mac dinh XAMPP dung user `root`, khong mat khau, port `3306` nen thuong khong can sua gi ca):

```
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=student_management

JWT_SECRET=doi_chuoi_nay_thanh_bat_ky_chuoi_bi_mat_nao
JWT_EXPIRES_IN=1d
```

### Buoc 4: Cai dat thu vien (node_modules)

Trong terminal, tai thu muc goc project:
```bash
npm install
```
Cho den khi chay xong (co the mat 1-3 phut tuy toc do mang). Buoc nay se tao ra thu muc `node_modules` (thu muc nay **khong can push len GitHub**, da duoc khai bao trong `.gitignore`).

### Buoc 5: Chay ung dung

```bash
npm run start:dev
```

Neu thanh cong, ban se thay dong chu:
```
Server dang chay tai: http://localhost:3000
Swagger API docs tai: http://localhost:3000/api-docs
```

Mo trinh duyet vao `http://localhost:3000` se thay:
```json
{"status":"ok","message":"He thong Quan ly Sinh vien dang hoat dong"}
```

=> Nhu vay la ung dung da ket noi Database va chay thanh cong!
Vao `http://localhost:3000/api-docs` de xem **toan bo danh sach API** duoi dang giao dien Swagger truc quan, co the bam thu ("Try it out") ngay tren trinh duyet.

### Buoc 6 (Tuy chon): Tao du lieu mau + tai khoan Admin

De khong phai tu tay tao du lieu de test, chay lenh:
```bash
npm run seed
```
Lenh nay se tao san: 1 Khoa, 1 Giang vien, 1 Lop, 2 Sinh vien, 1 Mon hoc, ket qua hoc tap mau, va **1 tai khoan Admin**:
- **Tai khoan:** `admin`
- **Mat khau:** `admin123`

### Buoc 7: Thu goi API (dang nhap va tao du lieu)

Cach de nhat la vao `http://localhost:3000/api-docs` (Swagger UI), nhung neu muon dung Postman/curl:

**1. Dang nhap de lay Token:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"tenDangNhap":"admin","matKhau":"admin123"}'
```
Ket qua tra ve co `access_token` — copy gia tri nay lai.

**2. Goi API can xac thuc (vi du xem danh sach Sinh vien), gan Token vao header `Authorization`:**
```bash
curl http://localhost:3000/students \
  -H "Authorization: Bearer <access_token_vua_copy>"
```

### Danh sach API chinh

| Method | Endpoint | Mo ta | Quyen |
|---|---|---|---|
| POST | `/auth/register` | Dang ky tai khoan | Cong khai |
| POST | `/auth/login` | Dang nhap, tra ve JWT | Cong khai |
| GET | `/auth/profile` | Xem thong tin tai khoan dang dang nhap | Da dang nhap |
| GET/POST/PATCH/DELETE | `/departments` | CRUD Khoa | Admin (xem: ai cung duoc) |
| GET/POST/PATCH/DELETE | `/teachers` | CRUD Giang vien | Admin (xem: ai cung duoc) |
| GET/POST/PATCH/DELETE | `/classes` | CRUD Lop | Admin/Giang vien |
| GET/POST/PATCH/DELETE | `/students` | CRUD Sinh vien | Admin (xem: Admin/Giang vien) |
| GET/POST/PATCH/DELETE | `/subjects` | CRUD Mon hoc | Admin (xem: ai cung duoc) |
| GET/POST/PATCH/DELETE | `/enrollments` | CRUD Ket qua hoc tap | Admin/Giang vien |
| GET/DELETE | `/users` | Quan ly tai khoan | Admin |

### Cac loi thuong gap

| Loi | Nguyen nhan | Cach sua |
|---|---|---|
| `Access denied for user 'root'` | Sai user/password MySQL trong `.env` | Kiem tra lai `DB_USERNAME`, `DB_PASSWORD` cho khop voi XAMPP |
| `connect ECONNREFUSED 127.0.0.1:3306` | Chua bat MySQL trong XAMPP | Mo XAMPP Control Panel, bam Start o dong MySQL |
| `Unknown database 'student_management'` | Chua tao database | Lam lai **Buoc 2** |
| `Cannot find module '...'` | Chua chay `npm install` | Chay lai **Buoc 4** |
| Port 3000 da duoc su dung | Ung dung khac dang chiem port 3000 | Doi `PORT` trong file `.env` sang so khac, vi du `3001` |

---

## Ghi chu quan trong

- File `.env` chua thong tin cau hinh rieng cua tung may, **KHONG duoc commit/push len Git** (da co san trong `.gitignore`). Moi thanh vien tu tao file `.env` rieng bang cach copy tu `.env.example`.
- `synchronize: true` trong TypeORM chi nen dung khi **hoc tap/lam do an**. Khi trien khai thuc te (production) can chuyen sang dung **migration** de tranh mat du lieu khi thay doi cau truc bang.
- Du an da viet san **Swagger** (`/api-docs`) va **script seed du lieu mau** (`npm run seed`) de thay/co giao viec cham bai de dang test nhanh.
