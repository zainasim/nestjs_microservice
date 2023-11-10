import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '@app/common/database/database.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.databaseService.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.user.findMany({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.user.findUnique({
        where: {
          id,
        },
      });
      if (!product) {
        return "Product not found"
      }
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.databaseService.user.update({
        where: { id: id },
        data: updateUserDto
      });
  
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return "User not found"
      }
      await this.databaseService.user.delete({
        where: {
          id,
        },
      });
      return "User deleted Successfuly";
    } catch (error) {
      throw new Error(error);
    }
  }
}
