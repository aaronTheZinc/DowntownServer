import { User } from '../entity/user'
export const DatabaseConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "downtown-db",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*"],
  migrations: [],
  subscribers: [ User ],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
