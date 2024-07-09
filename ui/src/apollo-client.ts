import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "./constants";

const createApolloClient = () => {
  return new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
};

export const apolloClient = createApolloClient();
