import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './apolloClient'; 
import { ApolloProvider } from '@apollo/react-hooks'; 
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext'; // Ensure the path is correct

// React 18: Use ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();





















// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// //import client from '/apolloClient';


// import client from './context/apolloClient'



// // import client from './utils/apolloClient'; 
// // import { ApolloProvider } from '@apollo/client';



// import { ApolloProvider } from '@apollo/react-hooks';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './authContext';


// //Our React application needs access to...
// // Client
// // Authorization Context                     //
// // Browser Router (React ROuter) /logIn /register

// ReactDOM.render(
//   <AuthProvider>
//   <ApolloProvider client={client}>
//     <BrowserRouter>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </BrowserRouter>
// </ApolloProvider>
// </AuthProvider>,
// document.getElementById('root')
// );

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();







