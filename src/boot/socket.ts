import { Server as SocketServer } from 'socket.io';
import { createServer } from 'http';
import { logger } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

class Socket {
	public static pubsub: PubSub;

	public static async init(server: ReturnType<typeof createServer>): Promise<void> {
		const className = Socket.name;
		const functionName = this.init.name;
		Socket.pubsub = new PubSub();

		const io = new SocketServer(server, {
			cors: {
				origin: '*',
			},
		});

		// JWT authentication for Socket.IO
		io.use((socket, next) => {
			const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.replace('Bearer ', '');
			if (token) {
				try {
					const user = jwt.verify(token, 'secret_key');
					socket.data.user = user;
					next();
				} catch (err) {
					logger.error({ className, functionName, message: 'Invalid token', error: err });
					next(new Error('Authentication error'));
				}
			} else {
				logger.error({ className, functionName, message: 'No token provided. Ensure the token is being sent correctly in the handshake.auth or headers.authorization.' });
				next(new Error('Authentication error'));
			}
		});

		io.on('connection', (socket) => {
			logger.info({ className, functionName, message: 'New client connected', result: { user: socket.data.user } });

			socket.on('joinRoom', (room) => {
				socket.join(room);
				logger.info({ className, functionName, message: `User joined room ${room}`, result: { user: socket.data.user } });
			});

			socket.on('message', (room, message) => {
				io.to(room).emit('message', { user: socket.data.user, message });
			});

			socket.on('disconnect', () => {
				logger.info({ className, functionName, message: 'Client disconnected', result: { user: socket.data.user } });
			});
		});
	}
}

export { Socket };
