import { Student } from "src/students/entity/student.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Student],
  synchronize: false,
  migrations: ["dist/db/migrations/*.js"],
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;