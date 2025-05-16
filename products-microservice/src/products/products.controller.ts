import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_PATTERNS } from 'src/utils/types';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: PRODUCT_PATTERNS.Create })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.FindAll })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.FindOne })
  findOne(@Payload() id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({ cmd: PRODUCT_PATTERNS.Update })
  update(@Payload() updatePayload: { id: number; data: UpdateProductDto }) {
  return this.productsService.update(updatePayload.id, updatePayload.data);
}

  @MessagePattern({ cmd: PRODUCT_PATTERNS.Remove })
  remove(@Payload() id: number) {
    return this.productsService.remove(id);
  }
}
