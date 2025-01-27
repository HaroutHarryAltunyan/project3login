import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "http://localhost:4001", // /////////////////////////////////////Replace with your server's URI if different /////////////////////////////////////////
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("token") || ""
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;






//////////////////////////                  this is an updated version of above with token security practices that will be used soon 


// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { onError } from '@apollo/client/link/error';
// import { RetryLink } from '@apollo/client/link/retry';
// import { jwtDecode } from 'jwt-decode';

// // Function to check if a token is valid
// const isTokenValid = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//         const decoded = jwtDecode(token);
//         return decoded.exp * 1000 > Date.now(); // Check if token is expired
//     } catch (error) {
//         console.error("Invalid token:", error);
//         return false;
//     }
// };

// // HTTP Link to connect to the GraphQL server
// const httpLink = createHttpLink({
//     uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:3001", // Use environment variable or fallback
//     credentials: 'include', // Include cookies with requests for authentication
// });

// // Authentication Link to add Authorization header
// const authLink = setContext((_, { headers }) => {
//     const token = isTokenValid() ? localStorage.getItem("token") : "";
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         },
//     };
// });

// // Error Handling Link
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//         graphQLErrors.forEach(({ message, locations, path }) => {
//             console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
//         });
//     }
//     if (networkError) {
//         console.error(`[Network error]: ${networkError}`);
//     }
// });

// // Retry Link for handling transient network errors
// const retryLink = new RetryLink({
//     delay: {
//         initial: 300, // Initial retry delay in ms
//         max: Infinity, // No limit on delay time
//         jitter: true, // Add randomization to delays
//     },
//     attempts: {
//         max: 3, // Retry up to 3 times
//         retryIf: (error) => !!error, // Retry on any error
//     },
// });

// // Combine Links: error handling, retry, authentication, and HTTP
// const link = errorLink.concat(retryLink).concat(authLink).concat(httpLink);

// // Apollo Client Setup
// const client = new ApolloClient({
//     link,
//     cache: new InMemoryCache({
//         typePolicies: {
//             Query: {
//                 fields: {
//                     // Customize cache behavior for specific fields if needed
//                 },
//             },
//         },
//     }),
// });

// export default client;
























































// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { onError } from '@apollo/client/link/error';
// import { RetryLink } from '@apollo/client/link/retry';

// // Create HTTP Link
// const httpLink = createHttpLink({
//     uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:3001", // Use environment variable
//     credentials: 'include', // Include cookies with requests
// });

// // Authentication Link (if using tokens)
// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem("token");
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         },
//     };
// });

// // Error Handling Link
// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//         graphQLErrors.forEach(({ message, locations, path }) => {
//             console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
//         });
//     }
//     if (networkError) console.error(`[Network error]: ${networkError}`);
// });

// // Retry Link for Failed Requests
// const retryLink = new RetryLink();

// // Create Apollo Client
// const client = new ApolloClient({
//     link: errorLink.concat(retryLink).concat(authLink.concat(httpLink)),
//     cache: new InMemoryCache(),
// });

// export default client;







































//////////////////////////                  this is an updated version of above with token security practices that will be used soon 

// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import CryptoJS from 'crypto-js';

// // Encryption Key (You can generate this dynamically or store it securely)
// const secretKey = "your-secure-key";

// // Encrypt Function
// const encryptToken = (token) => CryptoJS.AES.encrypt(token, secretKey).toString();

// // Decrypt Function
// const decryptToken = (encryptedToken) =>
//   CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(CryptoJS.enc.Utf8);

// // Function to get token securely
// const getToken = () => {
//   // Check if token is stored in HttpOnly cookies (handled automatically by the server)
//   const tokenFromCookie = null; // HttpOnly cookies are automatically sent with requests

//   // Fallback to encrypted localStorage
//   const encryptedToken = localStorage.getItem("encryptedToken");
//   return encryptedToken ? decryptToken(encryptedToken) : "";
// };

// // Function to set token securely
// const setToken = (token) => {
//   if (!token) {
//     localStorage.removeItem("encryptedToken");
//   } else {
//     const encryptedToken = encryptToken(token);
//     localStorage.setItem("encryptedToken", encryptedToken);
//   }
// };

// // Create HTTP Link
// const httpLink = createHttpLink({
//   uri: "http://localhost:3001", // Replace with your server's URI if different
//   credentials: "include", // Ensure cookies are included
// });

// // Authentication Link for Headers
// const authLink = setContext((_, { headers }) => {
//   const token = getToken();
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// // Initialize Apollo Client
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// // Set Token Example Usage (Call this when a user logs in)
// const token = "your-jwt-token"; // Replace with actual token
// setToken(token);

// export default client;