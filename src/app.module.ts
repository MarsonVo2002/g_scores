import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { Student } from './students/entity/student.entity';
import { dataSourceOptions } from 'db/data-source';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    StudentsModule,
    SeedModule,
    //TypeOrmModule.forFeature([YourEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
