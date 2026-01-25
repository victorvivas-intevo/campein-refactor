import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DIRECT_DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        'DIRECT_DATABASE_URL no está definida. Revisa tu archivo .env',
      );
    }

    // 2. Crea primero el Pool de conexión
    const pool = new Pool({ connectionString });

    // 3. Pasa el pool al adaptador
    const adapter = new PrismaPg(pool);

    // const adapter = new PrismaPg({ connectionString });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
