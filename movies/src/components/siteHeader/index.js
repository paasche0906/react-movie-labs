import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SignInButton from '../SignInButton';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { AuthContext } from '../../contexts/authContext';


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext); 

    const menuOptions = [
        { label: "Home", path: "/" },
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Watchlists", path: "/movies/watchlists" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Trending", path: "/movies/trending/today" },
        { label: "What's Popular", path: "/movies/popular" },
        { label: "Top Rated", path: "/movies/top_rated" }
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                            {currentUser ? (
                                <>
                                    <Typography variant="h6" sx={{ marginRight: 2 }}>
                                        Hello, {currentUser.displayName}
                                    </Typography>
                                    <Button color="inherit" onClick={handleLogout}>
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <SignInButton />
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
