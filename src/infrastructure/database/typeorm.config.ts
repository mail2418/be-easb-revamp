import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserOrmEntity } from '../user/orm/user.orm_entity';

export const typeOrmConfig = (config: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: config.get<string>('db.host'),
    port: config.get<number>('db.port'),
    username: config.get<string>('db.username'),
    password: config.get<string>('db.password'),
    database: config.get<string>('db.name'),
    entities: [UserOrmEntity],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
