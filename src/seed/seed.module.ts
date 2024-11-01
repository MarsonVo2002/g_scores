import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entity/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [SeedService]
})
export class SeedModule {}
