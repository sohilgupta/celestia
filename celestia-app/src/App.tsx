import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// We'll create simple placeholder components for now
const HomePage = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1929 0%, #111823 100%)',
    color: 'white',
    padding: 20
  }}>
    <h1 style={{ 
      background: 'linear-gradient(90deg, #6e8cf7 0%, #f9a825 100%)', 
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: 10
    }}>
      Celestia
    </h1>
    <h2 style={{ color: '#aaa', marginTop: 0 }}>Your Travel Universe Awaits</h2>
    <p style={{ maxWidth: 600, textAlign: 'center' }}>
      Experience your journey before you go. Fly from your departure city to destination,
      zoom into hotels and landmarks, explore planned activities, and visualize transportation routes—all
      in a cinematic 3D experience.
    </p>
    <a 
      href="/explore" 
      style={{ 
        background: '#6e8cf7', 
        color: 'white', 
        padding: '12px 24px', 
        borderRadius: 30, 
        textDecoration: 'none', 
        fontWeight: 'bold',
        boxShadow: '0 0 15px rgba(110, 140, 247, 0.5)'
      }}
    >
      Start Exploring
    </a>
  </div>
);

const ExplorePage = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1929 0%, #101823 100%)',
    color: 'white',
    padding: 20
  }}>
    <h1 style={{ color: '#6e8cf7' }}>Explore Mode</h1>
    <p>This is where the Celestia Viewer would be displayed.</p>
    <div style={{ 
      width: '80%', 
      height: 400, 
      backgroundColor: 'rgba(19, 47, 76, 0.4)', 
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid rgba(110, 140, 247, 0.3)',
      marginBottom: 20
    }}>
      Celestia Viewer Placeholder
    </div>
    <div style={{
      position: 'absolute',
      bottom: 20,
      padding: 10,
      borderRadius: 30,
      backgroundColor: 'rgba(19, 47, 76, 0.8)',
      display: 'flex',
      gap: 10
    }}>
      <button style={{ 
        backgroundColor: 'rgba(110, 140, 247, 0.3)',
        border: 'none',
        padding: '8px 16px',
        borderRadius: 20,
        color: 'white',
        cursor: 'pointer'
      }}>
        Play
      </button>
      <button style={{ 
        backgroundColor: 'transparent',
        border: '1px solid rgba(249, 168, 37, 0.5)',
        padding: '8px 16px',
        borderRadius: 20,
        color: '#f9a825',
        cursor: 'pointer'
      }}>
        Restart
      </button>
    </div>
    <a 
      href="/" 
      style={{ 
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white', 
        textDecoration: 'none',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        padding: '6px 12px',
        borderRadius: 20,
        fontSize: 14
      }}
    >
      Back to Home
    </a>
  </div>
);

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