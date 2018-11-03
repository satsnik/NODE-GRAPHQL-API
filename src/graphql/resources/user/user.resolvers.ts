import { GraphQLResolveInfo } from 'graphql';
import { Dbconnection } from '../../../interfaces/DbConnectionInterface';
import { UserInstance } from '../../../models/UserModel';
import { Transaction } from 'sequelize';

export const userResolvers = {

    User:{
        posts:(parent, { first = 10, offset = 10 }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.Post.findAll({
                where:{author:parent.get('id')},
				limit: first,
				offset: offset
			});
		},
    },

	Query: {
		users: (parent, { first = 10, offset = 10 }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.User.findAll({
				limit: first,
				offset: offset
			});
		},
		user: (parent, { id }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.User.findById(id).then((user: UserInstance) => {
				if (!user) throw new Error(`User with id ${id} not found!`);
				return user;
			});
		}
	},
	Mutation: {
		createUser: (parent, { input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			return db.sequelize.transaction((t: Transaction) => {
				return db.User.create(input, { transaction: t });
			});
		},
		updateUser: (parent, { id, input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.User.findById(id).then((user: UserInstance) => {
					if (!user) throw new Error(`User with id ${id} not found!`);
					return user.update(input, { transaction: t });
				});
			});
		},
		updateUserPassword: (parent, { id, input }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.User.findById(id).then((user: UserInstance) => {
					if (!user) throw new Error(`User with id ${id} not found!`);
					return user.update(input, { transaction: t }).then((user: UserInstance) => !!user);
				});
			});
		},

		deleteUser: (parent, { id }, { db }: { db: Dbconnection }, info: GraphQLResolveInfo) => {
			id = parseInt(id);
			return db.sequelize.transaction((t: Transaction) => {
				return db.User.findById(id).then((user: UserInstance) => {
					if (!user) throw new Error(`User with id ${id} not found!`);
					return user.destroy({ transaction: t }).then((user) => user);
				});
			});
		}
	}
};
