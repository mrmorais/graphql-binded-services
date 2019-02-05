const { GraphQLServer } = require('graphql-yoga');
const { users } = require('./data');

const resolvers = {
    Query: {
        status: () => `Running`,
        getUser: (_, { id }) => users.find((curr) => curr.id == id)
    },
}

const server = new GraphQLServer({
    typeDefs: './service-1/schema.graphql',
    resolvers
});

server.start({ port: 4001 }, () => console.log(`Running at ::4001`));
