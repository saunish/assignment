import { Application, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RedisLoader } from '../boot/redis.js';

class AuthMiddleware {
	public static init = (app: Application): void => {
		const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
			const openPaths = ['/graphql'];
			const isPublic = openPaths.some((path) => req.path.startsWith(path) && (req.body?.query?.includes('register') || req.body?.query?.includes('login')));
			if (isPublic) {
				return next();
			}

			if (req.path.startsWith('/')) {
				return next();
			}

			const token: string = req.headers.authorization?.split(' ')[1] || '';

			try {
				const userData = JSON.parse((await RedisLoader.client.get(token)) ?? '');
				if (userData) {
					req.user = jwt.verify(token, 'secret_key');
					next();
				} else {
					next('Token expired or invalid');
				}
			} catch (e: unknown) {
				next(e);
			}
		};
		app.use(authenticateJWT);
	};
}

export { AuthMiddleware };
