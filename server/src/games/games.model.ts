import { Column, DataType, Model, Table } from "sequelize-typescript"

interface GameCreationOptions {
	owner: any
}

@Table({ tableName: "users" })
export class Game extends Model<Game, GameCreationOptions> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({ type: DataType.STRING, allowNull: false })
	content: string

	//   @Column({ type: DataType.STRING, unique: true, allowNull: false })
	//   email: string

	//   @Column({ type: DataType.BOOLEAN, defaultValue: false })
	//   banned: boolean
}
