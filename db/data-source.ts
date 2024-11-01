import { Student } from "src/students/entity/student.entity";
import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "123456",
  database: "G-scores",
  entities: [Student], 
  synchronize: true, 
  migrations: ["dist/db/migrations/*.js"],
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;