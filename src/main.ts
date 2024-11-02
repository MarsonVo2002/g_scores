import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const seedService = app.get(SeedService);
  // await seedService.seed('src/dataset/diem_thi_thpt_2024.csv');
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
