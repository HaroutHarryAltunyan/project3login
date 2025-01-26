import { useContext } from 'react';
import { AuthContext } from "../context/authContext";

function Homepage() {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <h1>This is the homepage</h1>
            {user ? 
                <>
                    <p>Welcome, {user.email}is logged in !</p>
                    {/* <button onClick={logout}>Logout</button> */}
                </>
            : 
                <>
                    <p>There is no user data.</p>
                </>
            }
        </>
    )
}

export default Homepage;
