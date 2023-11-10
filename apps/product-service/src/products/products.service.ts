import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto, OrderDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from '@app/common/database/database.service';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class ProductsService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject('ORDER_SERVICE') private readonly orderclient: ClientKafka,
    ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id: createProductDto.userId,
        },
      })
      if(!user) {
        return "User does not exist";
      }
      return await this.databaseService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createOrder(orderDto: OrderDto) {
    try {
      this.orderclient.emit('order_created', new OrderCreatedEvent(orderDto.title, orderDto.userId, orderDto.productId));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.product.findMany({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.databaseService.product.findUnique({
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.databaseService.user.update({
        where: { id: id },
        data: updateProductDto
      });
  
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
     try {
      const product = await this.databaseService.product.findUnique({
        where: {
          id,
        },
      });

      if (!product) {
        return "Product not found"
      }
      await this.databaseService.product.delete({
        where: {
          id,
        },
      });
      return "Product deleted Successfuly";
    } catch (error) {
      throw new Error(error);
    }
  }
}
