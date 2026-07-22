/**
 * Script tao du lieu mau + tai khoan Admin dau tien.
 * Chay bang lenh: npm run seed
 */
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from './data-source';
import { Department } from '../departments/department.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Class } from '../classes/class.entity';
import { Student, GioiTinh } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { User } from '../users/user.entity';
import { Role } from '../common/enums/role.enum';

async function seed() {
  const dataSource = await AppDataSource.initialize();
  console.log('Da ket noi Database, bat dau seed du lieu mau...');

  const khoaRepo = dataSource.getRepository(Department);
  const teacherRepo = dataSource.getRepository(Teacher);
  const classRepo = dataSource.getRepository(Class);
  const studentRepo = dataSource.getRepository(Student);
  const subjectRepo = dataSource.getRepository(Subject);
  const enrollmentRepo = dataSource.getRepository(Enrollment);
  const userRepo = dataSource.getRepository(User);

  // 1. Khoa
  const khoaCNTT = await khoaRepo.save(
    khoaRepo.create({ khoaId: 'CNTT', tenKhoa: 'Cong nghe thong tin' }),
  );

  // 2. Giang vien
  const gv1 = await teacherRepo.save(
    teacherRepo.create({
      giangVienId: 'GV001',
      hoTen: 'Nguyen Van A',
      email: 'nva@truong.edu.vn',
      soDienThoai: '0900000001',
      khoaId: khoaCNTT.khoaId,
    }),
  );

  // 3. Lop
  const lop1 = await classRepo.save(
    classRepo.create({
      lopId: 'DHKTPM17A',
      tenLop: 'DH KTPM 17A',
      khoaHoc: '2023-2027',
      khoaId: khoaCNTT.khoaId,
      coVanId: gv1.giangVienId,
    }),
  );

  // 4. Sinh vien
  const sv1 = await studentRepo.save(
    studentRepo.create({
      sinhVienId: 'SV0001',
      hoTen: 'Tran Thi B',
      email: 'sv0001@student.edu.vn',
      ngaySinh: '2005-05-10',
      gioiTinh: GioiTinh.NU,
      diaChi: 'Ha Noi',
      soDienThoai: '0900000002',
      lopId: lop1.lopId,
    }),
  );

  const sv2 = await studentRepo.save(
    studentRepo.create({
      sinhVienId: 'SV0002',
      hoTen: 'Le Van C',
      email: 'sv0002@student.edu.vn',
      ngaySinh: '2005-08-20',
      gioiTinh: GioiTinh.NAM,
      diaChi: 'Ha Noi',
      soDienThoai: '0900000003',
      lopId: lop1.lopId,
    }),
  );

  // 5. Mon hoc
  const mh1 = await subjectRepo.save(
    subjectRepo.create({
      monHocId: 'MH001',
      tenMonHoc: 'Lap trinh Web',
      soTinChi: 3,
      khoaId: khoaCNTT.khoaId,
    }),
  );

  // 6. Ket qua hoc tap
  await enrollmentRepo.save(
    enrollmentRepo.create({
      sinhVienId: sv1.sinhVienId,
      monHocId: mh1.monHocId,
      hocKy: 'HK1 2025-2026',
      diemSo: 8.5,
    }),
  );
  await enrollmentRepo.save(
    enrollmentRepo.create({
      sinhVienId: sv2.sinhVienId,
      monHocId: mh1.monHocId,
      hocKy: 'HK1 2025-2026',
      diemSo: 7.0,
    }),
  );

  // 7. Tai khoan Admin mac dinh
  const adminExisted = await userRepo.findOne({
    where: { tenDangNhap: 'admin' },
  });
  if (!adminExisted) {
    await userRepo.save(
      userRepo.create({
        tenDangNhap: 'admin',
        matKhau: await bcrypt.hash('admin123', 10),
        email: 'admin@truong.edu.vn',
        role: Role.ADMIN,
      }),
    );
  }

  console.log('Seed du lieu mau thanh cong!');
  console.log('Tai khoan Admin: username=admin | password=admin123');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed that bai:', err);
  process.exit(1);
});
