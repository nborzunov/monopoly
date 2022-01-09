import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface UserCreationOptions {
  email: string
  apiSource: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationOptions> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  apiSource: string

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean
}
