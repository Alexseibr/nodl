import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppAuthGuard } from './common/auth';
import { OrderOsController } from './order-os/order-os.controller';
import { OrderOsService } from './order-os/order-os.service';

@Module({
  controllers: [OrderOsController],
  providers: [OrderOsService, { provide: APP_GUARD, useClass: AppAuthGuard }],
})
export class AppModule {}
