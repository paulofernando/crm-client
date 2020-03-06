import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";

import {PROD_API_URL, LOCAL_API_URL} from "./utils/constants"

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: (process.env.NODE_ENV === 'production') ? PROD_API_URL : LOCAL_API_URL
});

const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);