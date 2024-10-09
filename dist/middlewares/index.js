import { BaseMiddleware } from './base.js';
import { AuthMiddleware } from './auth.js';
import { GraphqlMiddleware } from './graphql.js';
class Middleware {
    static load = async (app) => {
        BaseMiddleware.init(app);
        await GraphqlMiddleware.init(app);
        AuthMiddleware.init(app);
    };
}
export { Middleware };
