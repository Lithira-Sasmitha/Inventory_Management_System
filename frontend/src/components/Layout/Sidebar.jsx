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
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: isDark ? '#11122a' : '#ffffff',
        color: isDark ? '#ffffff' : '#334155',
        borderRight: isDark ? 'none' : '1px solid',
        borderColor: 'divider',
        transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
          }}
        >
          <BoxIcon sx={{ color: '#ffffff', fontSize: 20 }} />
        </Box>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 800,
            color: isDark ? '#ffffff' : '#0f172a',
            letterSpacing: '-0.025em',
          }}
        >
          InvenTrack
        </Typography>
      </Box>



      <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>
        <List disablePadding>
          {NAV_MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={onNavItemClick}
                  sx={{
                    borderRadius: '8px',
                    py: 1.25,
                    px: 2,
                    color: isDark ? '#94a3b8' : '#64748b',
                    transition: 'all 0.2s ease-in-out',
                    borderLeft: '4px solid transparent',
                    '&.active': {
                      bgcolor: isDark ? 'rgba(99, 102, 241, 0.15)' : '#eef2ff',
                      color: isDark ? '#ffffff' : '#4f46e5',
                      borderLeftColor: isDark ? '#6366f1' : '#4f46e5',
                      '& .MuiListItemIcon-root': {
                        color: isDark ? '#ffffff' : '#4f46e5',
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: 700,
                      },
                    },
                    '&:hover:not(.active)': {
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                      color: isDark ? '#ffffff' : '#0f172a',
                      '& .MuiListItemIcon-root': {
                        color: isDark ? '#ffffff' : '#0f172a',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                    <IconComponent sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }} />

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <ListItemButton
          onClick={toggleTheme}
          sx={{
            borderRadius: '8px',
            py: 1.25,
            px: 2,
            color: isDark ? '#94a3b8' : '#64748b',
            '&:hover': {
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
              color: isDark ? '#ffffff' : '#0f172a',
              '& .MuiListItemIcon-root': {
                color: isDark ? '#ffffff' : '#0f172a',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            {isDark ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
          </ListItemIcon>
          <ListItemText
            primary={isDark ? 'Light Mode' : 'Dark Mode'}
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
          />
        </ListItemButton>


      </Box>
    </Box>
  );
}
