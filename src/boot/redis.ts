import { createClient, RedisClientType } from 'redis';
import { REDIS_CONFIG } from '../configs/index.js';

class RedisLoader {
	public static client: RedisClientType;

	public static init = async (): Promise<RedisClientType> => {
		RedisLoader.client = createClient(REDIS_CONFIG);
		await RedisLoader.client.connect();
		await RedisLoader.client.select(REDIS_CONFIG.db);
		return RedisLoader.client;
	};
}

export { RedisLoader };
