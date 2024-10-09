const REDIS_CONFIG = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    db: Number(process.env.COMMON_REDIS_DB) || 0,
};
export { REDIS_CONFIG };
