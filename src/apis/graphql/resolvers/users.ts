import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/user.js';
import { Socket } from '../../../boot/socket.js';
import { RedisLoader } from '../../../boot/redis.js';

const resolvers = {
	Query: {
		me: (parent: unknown, args: unknown, context: { user: { id: string; name: string } }) => {
			if (!context.user) throw new Error('Not authenticated');
			return User.findByPk(context.user.id);
		},
	},
	Mutation: {
		register: async (parent: unknown, { username, email, password }: { username: string; email: string; password: string }) => {
			const hashedPassword = await bcrypt.hash(password, 10);
			const save = await User.create({ username, email, password: hashedPassword });
			return { username, password, email, id: save.id };
		},
		login: async (parent: unknown, { username, password }: { username: string; password: string }) => {
			const user = await User.findOne({ where: { username } });
			if (!user) throw new Error('No user with that username');

			const valid = await bcrypt.compare(password, user.password);
			if (!valid) throw new Error('Incorrect password');

			const token = jwt.sign({ id: user.id, username: user.username }, 'Some_Strong_secret', { expiresIn: '1h' });

			await RedisLoader.client.set(token, JSON.stringify({ username }), 'EX', 3600);

			return token;
		},
	},
	Subscription: {
		userRegistered: {
			subscribe: () => Socket.pubsub.asyncIterator(['USER_REGISTERED']),
		},
	},
};

export { resolvers };
