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
  Avatar,
  Badge,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
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

      <Box sx={{ px: 3, pb: 3, pt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#10b981',
              color: '#10b981',
              boxShadow: `0 0 0 2px ${isDark ? '#11122a' : '#ffffff'}`,
              width: 10,
              height: 10,
              borderRadius: '50%',
              '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
              },
            },
            '@keyframes ripple': {
              '0%': {
                transform: 'scale(.8)',
                opacity: 1,
              },
              '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
              },
            },
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#94a3b8' : '#64748b',
            }}
          >
            <PersonIcon sx={{ fontSize: 24 }} />
          </Avatar>
        </Badge>
        <Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: isDark ? '#ffffff' : '#0f172a',
              lineHeight: 1.25,
            }}
          >
            Lithira Sasmitha
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isDark ? '#94a3b8' : '#64748b',
              fontWeight: 600,
            }}
          >
            Inventory Manager
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)' }} />

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

        <ListItemButton
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
            <LogoutIcon sx={{ fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}
