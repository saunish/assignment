import { gql } from 'graphql-tag';
const typeDefs = gql `
	type User {
		id: ID!
		username: String!
		email: String!
		token: String
	}

	type Query {
		me: User
	}

	type Mutation {
		login(username: String!, password: String!): String!
		register(username: String!, email: String!, password: String!): User!
	}

	type Subscription {
		userRegistered: User
	}
`;
export { typeDefs };
