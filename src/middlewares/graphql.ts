import { Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../apis/graphql/schemas/users.js';
import { resolvers } from '../apis/graphql/resolvers/users.js';
import { expressMiddleware } from '@apollo/server/express4';
import jwt from 'jsonwebtoken';

class GraphqlMiddleware {
	public static init = async (app: Application): Promise<void> => {
		const apolloServer = new ApolloServer({
			typeDefs,
			resolvers,
		});
		await apolloServer.start();

		app.use(
			'/graphql',
			expressMiddleware(apolloServer, {
				context: async ({ req }) => {
					const token = req.headers.authorization || '';
					try {
						const user = jwt.verify(token.replace('Bearer ', ''), 'secret_key');
						return { user };
					} catch {
						return { user: null };
					}
				},
			}),
		);
	};
}

export { GraphqlMiddleware };
