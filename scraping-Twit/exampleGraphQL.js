//http://facebook.github.io/graphql/October2016/
//https://www.youtube.com/watch?v=NWfnmBguhew&t=504s
//https://www.howtographql.com/advanced/0-clients/
//https://github.com/kimobrian/GraphQL-Express
//https://github.com/kimobrian/GraphQL-React-Apollo

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');