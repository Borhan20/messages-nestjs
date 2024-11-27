import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../src/users/entity/user.entity';
import { Message } from '../src/messages/entity/messages.entity';
import * as path from 'path';

export const DataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // schema: 'core',
  entities: [User, Message],
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  synchronize: false,
  logging: true,
};

export const dataSource = new DataSource(DataSourceOption);

export default dataSource;