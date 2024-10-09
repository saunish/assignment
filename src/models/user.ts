import { DataTypes, Model } from 'sequelize';
import { SequelizeLoader } from '../boot/sequelize.js';

class User extends Model {
	declare id: number;
	declare username: string;
	declare email: string;
	declare password: string;

	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: await SequelizeLoader.init(),
		tableName: 'users',
		timestamps: true,
	},
);

export default User;
