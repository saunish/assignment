import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
class BaseMiddleware {
    static init = (app) => {
        const corsWhitelistedUrls = process.env.CORS_WHITELISTED_URLS ? process.env.CORS_WHITELISTED_URLS.split(',') : ['*'];
        app.use(helmet());
        app.use(cors({
            origin: corsWhitelistedUrls,
            credentials: true,
        }));
        app.use(json());
        app.use(urlencoded({ extended: false }));
    };
}
export { BaseMiddleware };
