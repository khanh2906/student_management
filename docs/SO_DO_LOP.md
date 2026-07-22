# So do lop (Class Diagram / ERD) - He thong Quan ly Sinh vien

Day la ket qua buoc **phan tich & thao luan** cua nhom truoc khi tien hanh code Entity,
dap ung yeu cau cua giao vien: *"phai thuc hien thao luan, phan tich de dua ra duoc bieu do lop cua Project truoc khi thuc hien Entity"*.

```mermaid
erDiagram
    KHOA ||--o{ GIANG_VIEN : "quan ly"
    KHOA ||--o{ LOP : "quan ly"
    KHOA ||--o{ MON_HOC : "quan ly"
    GIANG_VIEN ||--o{ LOP : "co van (chu nhiem)"
    LOP ||--o{ SINH_VIEN : "gom cac"
    SINH_VIEN ||--o{ KET_QUA_HOC_TAP : "co ket qua"
    MON_HOC ||--o{ KET_QUA_HOC_TAP : "duoc dang ky"
    SINH_VIEN ||--o| TAI_KHOAN : "dang nhap bang"
    GIANG_VIEN ||--o| TAI_KHOAN : "dang nhap bang"

    KHOA {
        string khoaId PK
        string tenKhoa
        string moTa
    }
    GIANG_VIEN {
        string giangVienId PK
        string hoTen
        string email
        string soDienThoai
        string khoaId FK
    }
    LOP {
        string lopId PK
        string tenLop
        string khoaHoc
        string khoaId FK
        string coVanId FK
    }
    SINH_VIEN {
        string sinhVienId PK
        string hoTen
        string email
        date ngaySinh
        string gioiTinh
        string diaChi
        string soDienThoai
        string lopId FK
    }
    MON_HOC {
        string monHocId PK
        string tenMonHoc
        int soTinChi
        string khoaId FK
    }
    KET_QUA_HOC_TAP {
        int id PK
        string sinhVienId FK
        string monHocId FK
        string hocKy
        decimal diemSo
    }
    TAI_KHOAN {
        int id PK
        string tenDangNhap
        string matKhau
        string email
        string role
        string sinhVienId FK
        string giangVienId FK
    }
```

## Giai thich cac quyet dinh thiet ke

1. **KET_QUA_HOC_TAP** la bang lien ket (associative entity) giai quyet quan he N-N giua
   `SINH_VIEN` va `MON_HOC` — 1 sinh vien hoc nhieu mon, 1 mon co nhieu sinh vien hoc,
   moi cap (sinh vien, mon hoc, hoc ky) co 1 diem so rieng.
2. **LOP** co quan he N-1 toi `GIANG_VIEN` thong qua `coVanId`, dai dien cho vai tro
   Co van hoc tap / Giao vien chu nhiem — 1 giang vien co the phu trach nhieu lop,
   nhung 1 lop chi co 1 co van tai 1 thoi diem.
3. **TAI_KHOAN** duoc tach rieng khoi `SINH_VIEN`/`GIANG_VIEN` de mo hinh dung dung nghiep vu:
   khong phai Sinh vien/Giang vien nao cung can (hoac da co) tai khoan dang nhap he thong
   ngay tu dau, va 1 nguoi chi nen co dung 1 tai khoan (quan he 1-1 tuy chon).
