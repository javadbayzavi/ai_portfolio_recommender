import { IsEmail, IsString } from "class-validator";

export class UserCreateDTO {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;
}
