import { createClient } from 'redis';
import { REDIS_CONFIG } from '../configs/index.js';
class RedisLoader {
    static client;
    static init = async () => {
        RedisLoader.client = createClient(REDIS_CONFIG);
        await RedisLoader.client.connect();
        await RedisLoader.client.select(REDIS_CONFIG.db);
        return RedisLoader.client;
    };
}
export { RedisLoader };
