import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, Badge, InputBase, MenuItem, Menu, Avatar, IconButton, Tooltip } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

import { signout } from "../../actions/authAction";
import { searchImgsByKey } from "../../actions/imgAction";
import { getAllRoles } from '../../actions/pricingAction';
import styles from './styles.module.css';
import StartBtn from './StartBtn.js';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default function PrimarySearchAppBar() {
    // Redirect Module
    const navigate = useNavigate()

    // Use Redux
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const img = useSelector(state => state.img);
    const pricingObj = useSelector(state => state.pricingObj)

    // Standard
    const [searchKey, setSearchKey] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        setSearchKey(img.imgSchKeyword);
    }, [img])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const searchImages = () => {
        dispatch(searchImgsByKey(searchKey));
    }

    const handleToPricingPage = () => {
        dispatch(getAllRoles()).then(res => {
            handleMenuClose();
            navigate('/pricing');
        });
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* <MenuItem onClick={handleToPricingPage}>
                <MoneyIcon fontSize='string' />&nbsp;&nbsp;&nbsp;<span className={styles.smlMenuItemSpan}>Pricing</span>
            </MenuItem> */}
            {auth.isAuthenticated &&
                <MenuItem onClick={() => {
                    handleMenuClose();
                    dispatch(signout()).then(() => navigate('/'))
                }}>
                    <LogoutOutlinedIcon fontSize='string' />&nbsp;&nbsp;&nbsp;<span className={styles.smlMenuItemSpan}>Log out</span>
                </MenuItem>}
            {
                !auth.isAuthenticated &&
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/signin');
                }}>
                    <LoginIcon fontSize='string' />&nbsp;&nbsp;&nbsp;<span className={styles.smlMenuItemSpan}>Log In</span>
                </MenuItem>
            }
        </Menu >
    );

    /**
     * @description
     *  Make navigation button
     */
    const genNavBtn = () => {
        if (!auth.isAuthenticated) {
            return (
                <Link to='/signin'>
                    <Tooltip title="Create">
                        <IconButton>
                            <AddCircleOutlineIcon fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </Link>
            )
        } else {
            const url = document.location.href;
            if (url.includes('/create')) {
                return (
                    <>
                    </>
                )
            } else {
                return (
                    <Link to='/create'>
                        <Tooltip title="Create">
                            <IconButton>
                                <AddCircleOutlineIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                )
            }
        }
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" enableColorOnDark={true} sx={{ backgroundColor: '#2A2C36' }}>
                    <Toolbar sx={{ height: '80px' }}>
                        <Link to={`/`}>
                            <img alt="" src={`./assets/images/revlogo.png`} style={{ width: '240px', height: '60px' }} />
                        </Link>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                onKeyDown={(e) => { e.key === 'Enter' && searchImages(searchKey) }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                            {
                                auth.isAuthenticated ?
                                    <Avatar {...stringAvatar(auth.user.name)} onClick={handleProfileMenuOpen} />
                                    :
                                    <Avatar onClick={handleProfileMenuOpen}>
                                        <PersonIcon />
                                    </Avatar>
                            }
                        </Box>
                        {genNavBtn()}
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </Box>
        </>
    );
}