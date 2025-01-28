import { useContext } from 'react';
import { AuthContext } from "../context/authContext";

function Homepage() {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Welcome to the Homepage</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.email}! You are logged in.</h2>
                </div>
            ) : (
                <p>No user data found. Please log in to access your account.</p>
            )}
        </div>
    );
}

export default Homepage;
