import { Module } from '@nestjs/common';
import { DoScgModule } from './app/doScg/doScg.module';
@Module({
  imports: [DoScgModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
