import { User } from '../users/users.model'
import { Sequelize } from 'sequelize-typescript'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        logging: false
      })
      sequelize.addModels([User])
      await sequelize.sync()
      return sequelize
    }
  }
]
