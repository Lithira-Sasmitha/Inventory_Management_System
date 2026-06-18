import React from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import { NAV_MENU_ITEMS } from '../../constants/navigation';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Inventory2Outlined as BoxIcon,
} from '@mui/icons-material';

export default function Sidebar({ onNavItemClick }) {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#11122a', color: '#ffffff' }}>
      {/* Header / Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
        >
          <BoxIcon sx={{ color: '#ffffff', fontSize: 24 }} />
        </Box>
        <Typography variant="h5" component="div" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em' }}>
          InvenTrack
        </Typography>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
      
      {/* Menu List */}
      <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>
        <List disablePadding>
          {NAV_MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={onNavItemClick}
                  sx={{
                    borderRadius: '10px',
                    py: 1.5,
                    px: 2,
                    color: '#94a3b8',
                    transition: 'all 0.2s ease-in-out',
                    borderLeft: '4px solid transparent',
                    '&.active': {
                      bgcolor: 'rgba(99, 102, 241, 0.15)',
                      color: '#ffffff',
                      borderLeftColor: '#14b8a6',
                      '& .MuiListItemIcon-root': {
                        color: '#ffffff',
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: 700,
                      },
                    },
                    '&:hover:not(.active)': {
                      bgcolor: 'rgba(255, 255, 255, 0.04)',
                      color: '#ffffff',
                      '& .MuiListItemIcon-root': {
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      {/* Bottom Toggler */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={toggleTheme}
          sx={{
            borderRadius: '10px',
            py: 1.5,
            px: 2,
            color: '#94a3b8',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.04)',
              color: '#ffffff',
              '& .MuiListItemIcon-root': {
                color: '#ffffff',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText 
            primary={mode === 'dark' ? 'Light Mode' : 'Dark Mode'} 
            primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}
