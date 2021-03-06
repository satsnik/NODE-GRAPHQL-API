import * as express from 'express';
import * as graphqlHttp from 'express-graphql';
import db from './models/index';
import schema from './graphql/schema';
class App {
	public express: express.Application;
	constructor() {
		this.express = express();
		this.middleware();
	}

	private middleware(): void {
		this.express.use(
			'/graphql',
			(req, res, next) => {
				req['context'] = {};
				req['context'].db = db;				
				next();
			},
			graphqlHttp((req) => ({
				schema: schema,
				graphiql: true,
				context: req['context']
			}))
		);
	}
}

export default new App().express;
