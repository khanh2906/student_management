import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Ten dang nhap khong duoc de trong' })
  tenDangNhap: string;

  @IsString()
  @IsNotEmpty({ message: 'Mat khau khong duoc de trong' })
  matKhau: string;
}
