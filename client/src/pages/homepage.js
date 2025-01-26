// import { useContext } from 'react';
// import { AuthContext } from "../context/authContext";

// function Homepage() {
//     const { user, logout } = useContext(AuthContext);

//     return (
//         <>
//             <h1>This is the homepage</h1>
//             {user ? 
//                 <>
//                     <h2>Welcome, {user.email}is logged in !</h2>
//                     {/* <button onClick={logout}>Logout</button> */}
//                 </>
//             : 
//                 <>
//                     <p>There is no user data.</p>
//                 </>
//             }
//         </>
//     )
// }

// export default Homepage;










import { useContext } from 'react';
import { AuthContext } from "../context/authContext";

function Homepage() {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <h1>This is the homepage</h1>
            {user ? 
                <>
                    <h2>Welcome, {user.email} is logged in!</h2>
                    <button onClick={logout}>Logout</button>
                </>
            : 
                <>
                    <p>There is no user data.</p>
                </>
            }
        </>
    );
}

export default Homepage;
