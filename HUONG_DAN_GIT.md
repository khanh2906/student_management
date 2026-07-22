# Huong dan chia viec & Commit Git cho Nhom (2 nguoi / 1 nguoi)

Tai lieu nay huong dan cach lam viec voi Git sao cho **lich su commit tren GitHub** the hien ro rang dong gop cua tung thanh vien — dung yeu cau cua giao vien la "xem lich su tren GitHub".

---

## 0. Nguyen tac chung (ap dung cho ca 2 truong hop)

1. **KHONG commit 1 lan duy nhat toan bo code.** Hay chia nho thanh nhieu commit co y nghia, di theo tung buoc lam bai (dung tinh than de bai: "Tao Entity" la 1 cot moc/1 commit rieng).
2. **Commit message ro rang, dung tieng Viet khong dau hoac co dau deu duoc**, mieu ta dung viec da lam. Vi du:
   - `Tao Entity` (dung y nhu de bai yeu cau cho cot moc dau tien)
   - `Them Service va Controller cho module Sinh vien`
   - `Sua loi validate DTO Khoa`
3. **Cau hinh dung ten/email GitHub cua ban** truoc khi commit, de GitHub gan dung commit do cho tai khoan cua ban (quan trong nhat doi voi viec tinh diem ca nhan!):
   ```bash
   git config --global user.name "Ten cua ban tren GitHub"
   git config --global user.email "email_dang_ky_GitHub@gmail.com"
   ```
   Kiem tra lai bang lenh: `git config --global --list`

4. Quy trinh chuan cho MOI lan commit (dung lenh thay bang cua co):
   ```bash
   git add .                        # gom cac thay doi
   git commit -m "Thong diep commit"  # tao commit
   git pull --ff                     # cap nhat code moi nhat, tranh xung dot
   git push                          # day len GitHub
   ```

---

## 1. Truong hop LAM NHOM 2 NGUOI

### 1.1. Chia module theo tung nguoi

Du an nay da chia san thanh 7 module doc lap, rat de chia doi cong viec:

| Nhom module | Thanh phan | Goi y giao cho |
|---|---|---|
| **Nhom A - "To chuc"** | `departments/` (Khoa), `teachers/` (Giang vien), `classes/` (Lop) | Thanh vien 1 |
| **Nhom B - "Hoc vu"** | `students/` (Sinh vien), `subjects/` (Mon hoc), `enrollments/` (Ket qua hoc tap) | Thanh vien 2 |
| **Dung chung** | `users/`, `auth/`, `common/`, `app.module.ts` | Ca 2 cung thong nhat, hoac 1 nguoi lam roi nguoi kia review |

> Vi cac module deu doc lap (moi module co Entity/DTO/Service/Controller/Module rieng trong 1 thu muc), 2 ban co the sua song song ma **it xay ra xung dot file (conflict)**.

### 1.2. Quy trinh lam viec (khuyen nghi dung nhanh — branch)

Moi nguoi lam tren 1 nhanh (branch) rieng, xong roi gop (merge) vao `main`:

```bash
# Buoc 1: Ca 2 clone repo ve may (chi lam 1 lan dau)
git clone <link-repo-nhom>
cd <ten-repo>

# Buoc 2: Thanh vien 1 tao nhanh rieng
git checkout -b thanhvien1-to-chuc

# Buoc 3: Sua code trong pham vi duoc giao (vi du: departments/, teachers/, classes/)
# ... code ...

# Buoc 4: Commit tren nhanh cua minh
git add .
git commit -m "Tao Entity Khoa, Giang vien, Lop"
git push -u origin thanhvien1-to-chuc
```

Tuong tu, **Thanh vien 2**:
```bash
git checkout -b thanhvien2-hoc-vu
# ... code trong students/, subjects/, enrollments/ ...
git add .
git commit -m "Tao Entity Sinh vien, Mon hoc, Ket qua hoc tap"
git push -u origin thanhvien2-hoc-vu
```

Sau do, vao GitHub, tao **Pull Request** tu moi nhanh vao `main`, roi bam **Merge**. Cach nay giup GitHub ghi nhan ro rang: nhanh nao, commit nao la cua ai.

### 1.3. Neu nhom muon lam don gian hon (khong dung nhanh)

Neu 2 ban thong nhat **lam vao gio khac nhau** (khong dung 1 luc) va **chi sua file trong thu muc duoc giao**, co the commit thang vao `main`:

```bash
git pull --ff        # luon lay code moi nhat truoc khi bat dau
# ... code phan cua minh ...
git add .
git commit -m "Tao Entity Khoa"   # hoac thong diep phu hop voi viec da lam
git pull --ff        # cap nhat lai truoc khi push, phong truong hop ban kia vua push
git push
```

⚠️ **Luu y quan trong:** Neu ca 2 cung sua 1 file (vi du `app.module.ts`) cung luc, se de bi **conflict**. Nen thong bao cho nhau truoc khi sua cac file dung chung.

### 1.4. Kiem tra lich su commit da hien thi dung nguoi

Vao GitHub → tab **Insights** → **Contributors**, hoac vao tab **Commits** cua repo, kiem tra avatar/ten hien thi dung tung thanh vien. Neu thay commit hien "ten la unknown" hoac sai nguoi, kiem tra lai `git config user.email` co khop voi email dang ky GitHub khong (Buoc 0.3 o tren).

---

## 2. Truong hop CHI CON 1 MINH LAM (ban cung nhom nghi)

Day la tinh huong ngoai y muon, nhung van co the xu ly on thoa:

### 2.1. Viec dau tien: bao voi giang vien

Hay lien he voi co/giao vien phu trach de trinh bay tinh huong (ban cung nhom rut khoi nhom). Nhieu truong/lop co chinh sach rieng cho truong hop nay (giam khoi luong, tach nhom, hoac ghi nhan diem ca nhan). Day la buoc **quan trong nhat**, nen lam truoc/song song voi viec code.

### 2.2. Van commit binh thuong bang tai khoan that cua minh

- **KHONG** tao tai khoan GitHub gia mao ten ban cung nhom de "gia vo" co 2 nguoi cung lam — day la hanh vi khong trung thuc, co the bi coi la gian lan hoc thuat neu bi phat hien.
- Cu dung dung tai khoan GitHub that cua ban, commit binh thuong.

### 2.3. Van nen chia nho commit theo tung phan, dung don 1 cuc

De lich su Git van the hien qua trinh lam viec ro rang (khong bi nghi ngo la "code co san roi day len 1 lan"), hay commit theo tung buoc nho, vi du:

```bash
git add src/departments
git commit -m "Tao Entity Khoa"

git add src/teachers
git commit -m "Tao Entity Giang vien"

git add src/classes
git commit -m "Tao Entity Lop"

git add src/students
git commit -m "Tao Entity Sinh vien"

git add src/subjects
git commit -m "Tao Entity Mon hoc"

git add src/enrollments
git commit -m "Tao Entity Ket qua hoc tap"

git add src/users src/auth
git commit -m "Tao Entity Tai khoan va module xac thuc"

git push
```

Sau do o cac cot moc tiep theo (neu de bai yeu cau them Service, Controller...), tiep tuc commit tuong tu — **cu lam xong phan nao thi commit phan do**, khong don het vao cuoi ky.

### 2.4. Ghi chu trong README de giang vien nam duoc boi canh

Ban co the them 1 dong vao dau file `README.md` (hoac file rieng `GHI_CHU.md`) de giai trinh ro rang, vi du:

```markdown
> Ghi chu: Ban [ten thanh vien] da roi nhom tu ngay .../.../2026.
> Tu thoi diem do, toan bo cong viec do minh [ten ban] thuc hien.
> Da bao cao voi giang vien phu trach.
```

Day la cach lam minh bach nhat, tranh hieu lam khi cham bai.

---

## 3. Tom tat lenh Git hay dung

| Lenh | Y nghia |
|---|---|
| `git status` | Xem file nao da doi, chua commit |
| `git add .` | Gom tat ca thay doi de chuan bi commit |
| `git add <thu-muc>` | Chi gom thay doi trong 1 thu muc cu the |
| `git commit -m "..."` | Tao 1 commit voi thong diep mo ta |
| `git pull --ff` | Lay code moi nhat tu GitHub ve (fast-forward) |
| `git push` | Day commit len GitHub |
| `git checkout -b <ten-nhanh>` | Tao va chuyen sang nhanh moi |
| `git log --oneline` | Xem lai lich su cac commit da tao |
| `git config --global --list` | Kiem tra ten/email dang cau hinh cho Git |
