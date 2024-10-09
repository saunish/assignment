import { Sequelize } from 'sequelize';
import { PG_CONFIG } from '../configs/index.js';
class SequelizeLoader {
    static connection;
    static init = async () => {
        SequelizeLoader.connection = new Sequelize(PG_CONFIG.development.database, PG_CONFIG.development.username, PG_CONFIG.development.password, {
            host: PG_CONFIG.development.host,
            dialect: 'postgres',
            port: PG_CONFIG.development.port,
        });
        await SequelizeLoader.connection.sync({ force: true });
        return SequelizeLoader.connection;
    };
}
export { SequelizeLoader };
