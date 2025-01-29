import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define the server URI
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:4005", // Use environment variable for flexibility
});

// Add authentication token to headers
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "", // Include 'Bearer' prefix for standard practice
        },
    };
});

// Create Apollo Client instance
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(), // Configure cache options here if needed
});

export default client;


