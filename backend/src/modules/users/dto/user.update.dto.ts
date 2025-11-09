import { IsOptional, IsUUID } from "class-validator";
import { UserCreateDTO } from "./user.create.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UserUpdateDTO extends PartialType(UserCreateDTO) {
  @IsOptional()
  @IsUUID()
  id!: string;
}
