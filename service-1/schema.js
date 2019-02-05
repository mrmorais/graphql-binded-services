const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const { makeRemoteExecutableSchema } = require('graphql-tools');

const typeDefs = `type Query {
    status: String
    get(id: ID): User
}

type User {
    id: ID!
    name: String!
}`;

const endpoint = 'http://localhost:4001';
const link = new HttpLink({ uri: endpoint, fetch });

module.exports = makeRemoteExecutableSchema({ link, schema: typeDefs });
