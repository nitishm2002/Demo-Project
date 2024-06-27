import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import '../../styles/HeaderStyles.css';
import { Divider, Drawer } from '@mui/material';

export default function ButtonAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    const drawer = (
        <Box onClict={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography
                color={"goldenrod"}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, my: 2 }}>
            </Typography>
            <Divider />
            <ul className="mobile-navigation">
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/about'}>About</Link>
                </li>
                <li>
                    <Link to={'/contact'}>Contact</Link>
                </li>
                <li>
                    <Link to={'/login'}>Log in</Link>
                </li>
                <li>
                    <Link to={'/register'}>Sign up</Link>
                </li>
            </ul>
        </Box>
    )
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" component={'nav'} sx={{ marginTop: "15px", marginLeft: "16px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { sm: "none" } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography color={"white"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <ul className="navigation-menu">
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link to={'/about'}>About</Link>
                            </li>
                            <li>
                                <Link to={'/contact'}>Contact</Link>
                            </li>
                            <li>
                                <Link to={'/login'}>Log in</Link>
                            </li>
                            <li>
                                <Link to={'/register'}>Sign up</Link>
                            </li>
                        </ul>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
                    sx={{
                        display: { xs: 'block', sm: 'none' }, "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: "200px"
                        }
                    }}>
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
