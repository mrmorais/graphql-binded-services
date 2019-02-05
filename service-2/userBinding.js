const fetch = require('node-fetch');
const { Binding } = require('graphql-binding');
const { HttpLink } = require('apollo-link-http');
const { makeRemoteExecutableSchema } = require('graphql-tools');
const typeDefs = `type Query {
    status: String
    getUser(id: ID): User
}

type User {
    id: ID!
    name: String!
}`;

class UserBinding extends Binding {
    constructor() {
        const endpoint = 'http://localhost:4001';
        const link = new HttpLink({ uri: endpoint, fetch });

        const schema = makeRemoteExecutableSchema({ link, schema: typeDefs });

        super({
            schema: schema
        });
    }
}

module.exports = UserBinding;