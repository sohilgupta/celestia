import React, { useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import CelestiaViewer from '../components/CelestiaViewer/CelestiaViewer';
import ControlPanel from '../components/Controls/ControlPanel';

const ExplorePage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Flight control handlers
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleRestart = () => {
    setIsPlaying(false);
    // Small delay to ensure the animation stops before restarting
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };
  
  const handleFlyComplete = () => {
    setIsPlaying(false);
  };
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0a1929 0%, #101823 100%)',
        padding: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #6e8cf7 0%, #f9a825 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Celestia Explorer
          </Typography>
          
          <Button 
            component={Link} 
            to="/" 
            variant="outlined"
            size="small"
          >
            Back to Home
          </Button>
        </Box>
        
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Experience a virtual preview of your journey from London to New York. Use the controls below to navigate.
        </Typography>
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            position: 'relative',
            minHeight: '500px',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 3
          }}
        >
          {/* CelestiaViewer with flight controls */}
          <CelestiaViewer 
            isPlaying={isPlaying}
            onFlyComplete={handleFlyComplete}
          />
          
          {/* Control panel */}
          <ControlPanel 
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onRestart={handleRestart}
          />
        </Box>
        
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
          Phase 1 Demo: Basic Earth rendering and London to New York flyover
        </Typography>
      </Container>
    </Box>
  );
};

export default ExplorePage; 