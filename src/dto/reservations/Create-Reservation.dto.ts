import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsInt()
  num_comensales: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+[1-9][0-9]{0,2}.*/)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  surname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
