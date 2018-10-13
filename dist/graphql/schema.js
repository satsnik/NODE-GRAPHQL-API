"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const users = [
    {
        id: 1,
        name: 'Jon',
        email: 'jon@mail'
    },
    {
        id: 1,
        name: 'Jontrava',
        email: 'Jontrava@mail'
    }
];
const typeDefs = `
    type User{
        id:ID!
        name:String!
        email:String!
    }

    type Query {
        allUsers:[User!]!
    }

    type Mutation{
        createUser(name:String!, email:String!):User
    }


    
`;
const resolvers = {
    Query: {
        allUsers: () => users
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = Object.assign({ id: users.length + 1 }, args);
            users.push(newUser);
            return newUser;
        }
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
