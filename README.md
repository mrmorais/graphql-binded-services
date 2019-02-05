## Binding Services Example

This example uses [graphql-binding](https://github.com/graphql-binding/graphql-binding) to provide a fault tolerant binding API made upon a microservices architecture. The use of these services is for study-only purpose.

### Overview

There are two services: service-1 (responsible for User handling, runs at 4001) and service-2 (Posts handler, runs at 4002). In this example was not created any API Gateway (is a future improvement), also there is no Remote Schema or Stitching.

Knowing an endpoint and the schema is possible to dispatch queries to another service and combine with a response. So here we have service-1 binded to service-2 following the schema:

``` graphql
type Query {
    feed: [Post!]!
    working: String
}

type Post {
    id: ID!
    title: String!
    owner: User
}

type User {
    id: ID!
    name: String!
}
```

In the `feed` query we want to have the User been fetched from service-1. In practice we have this response:

```
{
  "data": {
    "feed": [
      {
        "id": "1",
        "title": "What are GraphQL bindings?",
        "owner": {
          "id": "1",
          "name": "Json"
        }
      },
      {
        "id": "2",
        "title": "Reusing & Composing GraphQL APIs",
        "owner": {
          "id": "2",
          "name": "Golang"
        }
      }
    ]
  }
}
```

The most interesting thing about it is that, being a microservice, we created a kind of fault tolerance: what if the service-1 goes down? We can simply have only the Post response, like this:

```
{
  "data": {
    "feed": [
      {
        "id": "1",
        "title": "What are GraphQL bindings?",
        "owner": null
      },
      {
        "id": "2",
        "title": "Reusing & Composing GraphQL APIs",
        "owner": null
      }
    ]
  }
}
```

### Running

install dependencies with:

```
$ yarn install
```

Run both services:

```
$ node ./service-1/index.js
Running at ::4001
$ node ./service-2/index.js
Running at ::4002
```