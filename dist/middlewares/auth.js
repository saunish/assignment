import jwt from 'jsonwebtoken';
import { RedisLoader } from '../boot/redis.js';
class AuthMiddleware {
    static init = (app) => {
        const authenticateJWT = async (req, res, next) => {
            const openPaths = ['/graphql'];
            const isPublic = openPaths.some((path) => req.path.startsWith(path) && (req.body?.query?.includes('register') || req.body?.query?.includes('login')));
            if (isPublic) {
                return next();
            }
            if (req.path.startsWith('/')) {
                return next();
            }
            const token = req.headers.authorization?.split(' ')[1] || '';
            try {
                const userData = JSON.parse((await RedisLoader.client.get(token)) ?? '');
                if (userData) {
                    req.user = jwt.verify(token, 'secret_key');
                    next();
                }
                else {
                    next('Token expired or invalid');
                }
            }
            catch (e) {
                next(e);
            }
        };
        app.use(authenticateJWT);
    };
}
export { AuthMiddleware };
