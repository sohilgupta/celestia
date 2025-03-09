import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import './App.css';

// Define a dark theme with cosmic styling
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6e8cf7', // Cosmic blue
    },
    secondary: {
      main: '#f9a825', // Star gold
    },
    background: {
      default: '#0a1929', // Deep space blue
      paper: '#132f4c',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 