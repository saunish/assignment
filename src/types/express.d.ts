import { User } from '../models/User'; // Update with the correct path of your User model

declare module 'express-serve-static-core' {
	interface Request {
		user?: User; // Define user type or use any
	}
}
