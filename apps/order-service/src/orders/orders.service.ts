import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from '@app/common/database/database.service';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id: createOrderDto.userId,
        },
      })
      if(!user) {
        return "User does not exist";
      }
      const product = await this.databaseService.product.findUnique({
        where: {
          id: createOrderDto.productId,
        },
      })

      if(!product) {
        return "Product does not exist";
      } else if(!product.inStock){
        return "Product is out of stock";
      }

      return await this.databaseService.order.create({
        data: createOrderDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.order.findMany({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.databaseService.order.findUnique({
        where: {
          id,
        },
      });
      if (!order) {
        return "Order not found"
      }
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.databaseService.order.update({
        where: { id: id },
        data: updateOrderDto
      });
  
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    try {
      const order = await this.databaseService.order.create({
        data: orderCreatedEvent,
      });
      console.log('Order Details', order);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const order = await this.databaseService.order.findUnique({
        where: {
          id,
        },
      });

      if (!order) {
        return "Order not found"
      }
      
      await this.databaseService.order.delete({
        where: {
          id,
        },
      });
      
      return "Order deleted Successfuly";
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}
