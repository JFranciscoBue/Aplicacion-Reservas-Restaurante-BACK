import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @Length(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(50)
  surname: string;

  @IsNotEmpty()
  @IsString()
  @Length(11)
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  dni: string;

  @IsNotEmpty()
  @IsString()
  @Length(50)
  key: string;
}
