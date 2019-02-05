const { GraphQLServer } = require('graphql-yoga');
const { posts } = require('./data');
const UserBinding = require('./userBinding');

const binding = new UserBinding();

const resolvers = {
    Query: {
        feed: () => posts,
    },
    Post: {
        owner: async (parent) => {
            return binding.query.getUser({ id: parent.owner })
                .then((user) => user)
                .catch(() => null);
            
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './service-2/schema.graphql',
    resolvers
});

server.start({ port: 4002 }, () => console.log(`Running at ::4002`));