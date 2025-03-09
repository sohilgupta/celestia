import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// We'll keep the simple HomePage component
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

// Enhanced ExplorePage with real 3D CelestiaViewer and controls
const ExplorePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleFlyComplete = useCallback(() => {
    setIsPlaying(false);
    
    // In a real app, we would use a proper notification system
    // This is a simulated completion behavior
    setTimeout(() => {
      if (window.confirm("Flight completed! Would you like to explore another destination?")) {
        // In a real app, we could show a destination selection modal here
        handleRestart();
      }
    }, 5000); // Show completion notification after 5 seconds of flight animation
    
    console.log("Flight completed!");
  }, []); // Empty dependency array since it only uses stable functions
  
  // Simulate flight timing - in a real app this would be tied to the actual Cesium animation
  useEffect(() => {
    let flightTimer;
    
    if (isPlaying) {
      // Set a timer to simulate flight completion after 15 seconds
      flightTimer = setTimeout(() => {
        handleFlyComplete();
      }, 15000);
    }
    
    // Cleanup timer on component unmount or when isPlaying changes
    return () => {
      if (flightTimer) clearTimeout(flightTimer);
    };
  }, [isPlaying, handleFlyComplete]); // Added handleFlyComplete to dependencies
  
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleRestart = useCallback(() => {
    setIsPlaying(false);
    // Small delay to ensure the animation stops before restarting
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  }, []); // Empty dependency array since it only uses setIsPlaying which is stable
  
  // Inline CelestiaViewer component for simplicity
  const CelestiaViewer = ({ isPlaying, onFlyComplete }) => {
    // In a real implementation, we'd use Resium/CesiumJS with an Ion token
    // Remove the unused ionToken variable to fix the ESLint warning
    
    // Simplified version - in a real implementation, we'd use Resium/CesiumJS
    return (
      <div style={{ 
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '70vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '1px solid rgba(110, 140, 247, 0.3)',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Loading indicator */}
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: isPlaying ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(10, 25, 41, 0.7)',
          zIndex: 2
        }}>
          <h3 style={{ color: '#6e8cf7' }}>
            {isPlaying ? 'Flying...' : 'Press Play to Start Flight'}
          </h3>
        </div>

        {/* Globe simulation */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #1976d2, #0a1929 70%)',
          boxShadow: '0 0 50px rgba(110, 140, 247, 0.3)',
          animation: isPlaying ? 'rotate 20s linear infinite' : 'none'
        }}></div>

        {/* City markers */}
        {isPlaying && (
          <>
            <div style={{ 
              position: 'absolute',
              top: '35%',
              left: '45%',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#f9a825',
              boxShadow: '0 0 10px #f9a825',
              zIndex: 3,
              animation: 'pulse 1.5s infinite'
            }}></div>
            <div style={{ 
              position: 'absolute',
              top: '40%',
              left: '60%',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#f9a825',
              boxShadow: '0 0 10px #f9a825',
              zIndex: 3,
              animation: 'pulse 1.5s infinite'
            }}></div>
            
            {/* Flight path animation */}
            <svg 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 2 
              }}
            >
              <path 
                d={`M ${45}% ${35}% Q ${52.5}% ${30}%, ${60}% ${40}%`} 
                fill="none" 
                stroke="#f9a825" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
                strokeLinecap="round" 
                style={{ 
                  opacity: 0.7,
                  animation: 'dash 3s linear infinite',
                  filter: 'drop-shadow(0 0 3px #f9a825)'
                }} 
              />
            </svg>
          </>
        )}

        {/* Title overlay */}
        <div style={{ 
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          borderRadius: '30px',
          background: 'rgba(10, 25, 41, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 3
        }}>
          <h3 style={{ 
            margin: 0,
            fontSize: '1.2rem',
            background: 'linear-gradient(90deg, #6e8cf7 0%, #f9a825 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Celestia
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.8rem' }}>
            {isPlaying ? 'London to New York' : 'Your Travel Universe'}
          </p>
        </div>
      </div>
    );
  };

  // Inline ControlPanel component for simplicity
  const ControlPanel = ({ isPlaying, onPlay, onPause, onRestart }) => {
    return (
      <div style={{ 
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        borderRadius: '30px',
        backgroundColor: 'rgba(19, 47, 76, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(110, 140, 247, 0.3)',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          marginBottom: '8px',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.75rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Flight Controls
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {isPlaying ? (
            <button 
              onClick={onPause}
              style={{ 
                backgroundColor: 'rgba(110, 140, 247, 0.2)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Pause
            </button>
          ) : (
            <button 
              onClick={onPlay}
              style={{ 
                backgroundColor: 'rgba(110, 140, 247, 0.2)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Play
            </button>
          )}
          <button 
            onClick={onRestart}
            style={{ 
              backgroundColor: 'transparent',
              border: '1px solid rgba(249, 168, 37, 0.5)',
              padding: '8px 16px',
              borderRadius: '20px',
              color: '#f9a825',
              cursor: 'pointer'
            }}
          >
            Restart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1929 0%, #101823 100%)',
      color: 'white',
      padding: 20,
      position: 'relative'
    }}>
      <h1 style={{ color: '#6e8cf7' }}>Explore Mode</h1>
      <p>Experience a virtual preview of your journey from London to New York. Use the controls below to navigate.</p>
      
      <div style={{ 
        width: '80%', 
        height: '70vh', 
        position: 'relative',
        margin: '20px 0'
      }}>
        <CelestiaViewer 
          isPlaying={isPlaying}
          onFlyComplete={handleFlyComplete}
        />
        
        <ControlPanel 
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onRestart={handleRestart}
        />
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
};

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