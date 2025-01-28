import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            Harout's Login
                        </Link>
                    </Typography>
                    <Box sx={{ textAlign: "right" }}>
                        {user ? (
                            <Button
                                onClick={handleLogout}
                                sx={{ textDecoration: "none", color: "white" }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        marginRight: "10px",
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;