import { Body, Controller, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Inventory, InventoryRepository } from '@oninet/api/repository-oninet';
import { SuccessDto, parseBody } from '@onivoro/server-common';
import { InventorySearchDto } from '../dtos/inventory-search.dto';
import { AuthGuard } from '@onivoro/server-aws-auth';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from '../services/image-upload.service';
import { InventoryService } from '../services/inventory.service';

@UseGuards(AuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(
    private inventoryRepo: InventoryRepository,
    private imageUploadSvc: ImageUploadService,
    private inventorySvc: InventoryService) { }

  @Get('dashboard')
  @ApiQuery({ name: 'pagingkey', required: false })
  @ApiQuery({ name: 'pagesize', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ type: InventorySearchDto })
  async getDashboard(
    @Query('pagingkey') pagingKey: any,
    @Query('pagesize') pageSize: any,
    @Query('search') search: any,
  ) {
    return await this.inventorySvc.getDashboard(
      pagingKey,
      search,
      pageSize
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ type: Inventory })
  async get(@Param('id') id: string): Promise<Inventory> {
    return await this.inventorySvc.get(id);
  }

  @Get()
  @ApiResponse({ type: Inventory, isArray: true })
  async index(): Promise<Inventory[]> {
    return await this.inventorySvc.index();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files[]', 1))
  @ApiBody({ type: Inventory })
  @ApiResponse({ type: Inventory })
  async post(@Body() rawBody: any, @UploadedFiles() files?: Array<Express.Multer.File>): Promise<Inventory> {
    const body = parseBody<Inventory>(rawBody);

    return await this.inventorySvc.post(body, files?.length ? files[0] : undefined)
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('files[]', 1))
  @ApiBody({ type: Inventory })
  @ApiResponse({ type: Inventory })
  async put(@Param('id') id: string, @Body() rawBody: any, @UploadedFiles() files?: Array<Express.Multer.File>): Promise<Inventory> {
    const body = parseBody<Inventory>(rawBody);

    return await this.inventorySvc.put(id, body, files?.length ? files[0] : undefined)
  }
}
