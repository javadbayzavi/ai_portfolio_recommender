import { Body, Controller, Param, Query } from "@nestjs/common";
import { Get, Post, Delete, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDTO } from "./dto/user.create.dto";
import { UserUpdateDTO } from "./dto/user.update.dto";

@Controller("users")
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  @Get(":id")
  getUser(@Param("id") id: string) {
    return this.service.getUser(id);
  }

  @Post()
  createUser(@Body() user: UserCreateDTO) {
    return this.service.create(user);
  }

  @Put()
  updateUser(@Body() user: UserUpdateDTO) {
    return this.service.update(user);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.service.delete(id);
  }

  @Get(":id/portfolios")
  getUserPortfolios(@Param("id") id: string) {
    return this.service.getUserPortfolios(id);
  }

  @Get(":id/assets")
  getUserAssets(@Param("id") id: string) {
    return this.service.getUserAssets(id);
  }
}
