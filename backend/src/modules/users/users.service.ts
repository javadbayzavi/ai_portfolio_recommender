import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserCreateDTO } from "./dto/user.create.dto";
import { UserUpdateDTO } from "./dto/user.update.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async getUser(id: string){
        this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async getUsers(){
        return this.prisma.user.findMany()
    }

    async create(dto: UserCreateDTO){
        return this.prisma.user.create(
            {
                data: dto
            }
        )
    }

    async update(dto: UserUpdateDTO){
        return this.prisma.user.update(
            {
                where: {
                    id: dto.id
                },
                data: dto
            }
        )
    }

    async delete(id: string){
        return this.prisma.user.delete(
            {
                where: {
                    id
                }
            }
        )   
    }
    
}
