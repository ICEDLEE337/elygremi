import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Inventory } from '@oninet/api/repository-oninet';
import { InventorySearchDto } from '../dtos/inventory-search.dto';
import { InventoryService } from '../services/inventory.service';
import {v4} from 'uuid';

@Controller('public/inventory')
export class PublicInventoryController {
  constructor(
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
  async get(@Param('id') azVehicleId: string): Promise<Inventory> {
    return await this.inventorySvc.get(azVehicleId);
  }

  @Get()
  @ApiResponse({ type: Inventory, isArray: true })
  async index(): Promise<Inventory[]> {
    return await this.inventorySvc.index();
  }

  @Post()
  @ApiBody({ type: Inventory })
  @ApiResponse({ type: Inventory })
  async post(@Body() body: any): Promise<Inventory> {

    let vehicle: Inventory;

    if(body.azVehicleId) {
      vehicle = body;
    } else {
      console.log(body);
      const [year, make, model, ...engine] = (body.vehicleDisplayName || '').split(' ');
      vehicle = {
        id: v4(),
        azVehicleId: body.azVehicleId || body.vehicleId,
        vehicleYear: year || 'Year N/A',
        vehicleMakeName: make || 'Make N/A',
        azVehicleModelName: model || 'Model N/A',
        azVehicleEngineName: engine?.length ? engine.join(' ') : 'Engine N/A'
      } as any
    }
    return await this.inventorySvc.post(vehicle, undefined)
  }
}
