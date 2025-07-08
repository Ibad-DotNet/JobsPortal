import React from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle, ExitToApp, Lock } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleChangePassword = () => {
    // TODO: Implement change password functionality
    console.log('Change password clicked');
    handleClose();
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'primary.main', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 600 }}>
            Volmatica Admin System
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2, color: 'text.primary' }}>
              {user?.username}
            </Typography>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="primary"
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <AccountCircle sx={{ fontSize: 20 }} />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleChangePassword}>
                <Lock sx={{ mr: 1, fontSize: 18 }} />
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1, fontSize: 18 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: 'calc(100vh - 64px)', width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;