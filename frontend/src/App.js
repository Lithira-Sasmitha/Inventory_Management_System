import logo from './logo.svg';
import './App.css';
import { useThemeContext } from './context/ThemeContext';
import { Box, Container, Paper, Typography, Button, Stack, useTheme } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function App() {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            bgcolor: 'background.paper',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          <img src={logo} className="App-logo" style={{ height: 120, pointerEvents: 'none' }} alt="logo" />
          
          <Typography variant="h4" component="h1" color="primary.main">
            MUI & Tailwind CSS Theme System
          </Typography>
          
          <Typography variant="body1" color="text.secondary">
            Your inventory management system theme configuration is complete. You can toggle between light and dark modes. Dark mode also updates Tailwind's dark class on the HTML element!
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ w: '100%', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              onClick={toggleTheme}
            >
              Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              href="https://mui.com"
              target="_blank"
            >
              MUI Docs
            </Button>
          </Stack>
          
          <Box className="mt-4 p-4 rounded-lg bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 transition">
            <Typography variant="body2" className="text-indigo-600 dark:text-indigo-300 font-mono">
              Tailwind CSS styled block: Mode is '{mode}'
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
