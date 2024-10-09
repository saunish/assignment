import express from 'express';
import { logger } from '../utils/index.js';
import { Middleware } from '../middlewares/index.js';
import { SequelizeLoader } from './sequelize.js';
import { RedisLoader } from './redis.js';
import { Socket } from './socket.js';
import '../models/user.js';

class Server {
	public static app: express.Application;

	public static init = async (): Promise<express.Application> => {
		const className = Server.name;
		const functionName = this.init.name;
		try {
			Server.app = express();

			await Middleware.load(Server.app);
			logger.info({ functionName, message: 'Middleware loaded successfully', className });

			await SequelizeLoader.init();
			logger.info({ functionName, message: 'Sequelize loaded successfully', className });
			await SequelizeLoader.connection.sync({ alter: true, force: true });

			await RedisLoader.init();
			logger.info({ functionName, message: 'Redis loaded successfully', className });

			logger.info({ functionName, message: 'Routes loaded successfully', className });

			return Server.app;
		} catch (error) {
			logger.error({ functionName, message: 'Error while initializing server', className, error });
			throw error;
		}
	};
}

export { Server };
