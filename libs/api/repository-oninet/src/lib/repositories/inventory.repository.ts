import { Injectable } from '@nestjs/common';
import { TypeOrmRepository, getPagingKey, getSkip, removeFalseyKeys } from '@onivoro/server-typeorm-postgres';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryRepository extends TypeOrmRepository<Inventory> {
  async getDashboard(
    pagingKey: string,
    search: string,
    pageSize = 10
  ) {
    const skip: number = getSkip(pagingKey, pageSize);
    let data: Inventory[];
    let total: number;

    if (search) {
      let where: string;
      const trimmedSearch = search.trim().toLowerCase();
      where = ['az_vehicle_id', 'az_vehicle_engine_name', 'az_vehicle_model_name', 'vehicle_year', 'vehicle_make_name'].map(field => `(LOWER(${field}) like '%${trimmedSearch}%')`).join(' or ');
      const [results, count] = await this.repo
        .createQueryBuilder('inventory')
        .where(where)
        // .innerJoinAndSelect('inventory.client', 'client')
        // .innerJoinAndSelect('inventory.facility', 'facility')
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      data = results as any;
      total = count;
    } else {
      const where = removeFalseyKeys<FindOptionsWhere<Inventory>>({});

      const [results, count] = await this.getManyAndCount({
        where,
        take: pageSize,
        skip,
      });

      data = results;
      total = count;
    }

    const key = getPagingKey(pageSize, skip, total);

    return {
      data,
      total,
      pagingKey: key,
    };
  }
  constructor(public entityManager: EntityManager) {
    super(Inventory, entityManager);
  }
}
