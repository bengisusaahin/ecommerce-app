import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, Put, UsePipes, ValidationPipe, Req, Query } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCartDto, UpdateCartDto } from '@ecommerce/types';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('add')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ 
    status: 201, 
    description: 'Item successfully added to cart',
    schema: {
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              name: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' }
            }
          }
        },
        total: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  addToCart(@Body() dto: CreateCartDto, @Req() req) {
    dto.userId = req.user.sub;
    return this.cartService.addToCart(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the user cart',
    schema: {
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              name: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' }
            }
          }
        },
        total: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.sub);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear user cart' })
  @ApiResponse({ status: 200, description: 'Cart successfully cleared' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.sub);
  }

  @Put('update')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cart item successfully updated',
    schema: {
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              name: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' }
            }
          }
        },
        total: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  updateCart(@Request() req, @Body() dto: UpdateCartDto) {
    dto.userId = req.user.sub;
    return this.cartService.updateCart(dto);
  }

  @Delete('remove')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiQuery({ 
    name: 'productId', 
    required: true, 
    type: String, 
    description: 'ID of the product to remove' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Item successfully removed from cart',
    schema: {
      properties: {
        id: { type: 'string' },
        userId: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              name: { type: 'string' },
              price: { type: 'number' },
              quantity: { type: 'number' }
            }
          }
        },
        total: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  removeItem(@Req() req, @Query('productId') productId: string) {
    return this.cartService.removeItem({
      userId: req.user.sub,
      productId,
    });
  }
}
