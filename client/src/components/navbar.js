
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const context = useContext 
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div">
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}> Harout's Login </Link>
                    </Typography>
                    <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
                        <Link to="/login" style={{ textDecoration: "none", color: "white", marginRight: "10px" }}>Login</Link>
                        <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register</Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;