import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "https://crm-s.herokuapp.com/graphql"
});



const client = new ApolloClient({
    cache,
    link
});

client
    .query({
        query: gql`
        query {
          contact (id: 10) {
            firstName
          }
        }
    `
    })
    .then(result => console.log(result));