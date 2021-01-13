import { HttpModule, Module } from '@nestjs/common';
import { DoScgController } from './doScg.controller';
import { DoScgService } from './doScg.service';

@Module({
  imports: [HttpModule],
  providers: [DoScgService],
  controllers: [DoScgController],
})
export class DoScgModule {}
