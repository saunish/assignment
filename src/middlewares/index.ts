import { Application } from 'express';
import { BaseMiddleware } from './base.js';
import { AuthMiddleware } from './auth.js';
import { GraphqlMiddleware } from './graphql.js';

class Middleware {
	public static load = async (app: Application): Promise<void> => {
		BaseMiddleware.init(app);
		await GraphqlMiddleware.init(app);
		AuthMiddleware.init(app);
	};
}

export { Middleware };
