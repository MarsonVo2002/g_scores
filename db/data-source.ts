import { Student } from "src/students/entity/student.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  //Change the database url as instruction in env.txt
  url: process.env.DATABASE_URL,
  entities: [Student],
  //Change to true
  synchronize: false,
  //Comment the ssl
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ["dist/db/migrations/*.js"],
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;