const config = {
	development: {
		username: process.env.PG_USER || 'postgres',
		password: process.env.PG_PASSWORD || 'postgres',
		database: process.env.PG_DATABASE || 'postgres',
		host: process.env.PG_HOST || 'localhost',
		port: Number(process.env.PG_PORT) || 5432,
		dialect: 'postgres',
	},
};

export default config;
