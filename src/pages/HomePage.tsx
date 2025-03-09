import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0a1929 0%, #111823 100%)',
      padding: 4
    }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '4rem' },
            mb: 2,
            background: 'linear-gradient(90deg, #6e8cf7 0%, #f9a825 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Celestia
        </Typography>
        
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: { xs: '1.5rem', md: '2rem' }, 
            mb: 4, 
            color: 'grey.300' 
          }}
        >
          Your Travel Universe Awaits
        </Typography>
        
        <Typography paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto', fontSize: '1.1rem' }}>
          Experience your journey before you go. Fly from your departure city to destination,
          zoom into hotels and landmarks, explore planned activities, and visualize transportation routes—all
          in a cinematic 3D experience.
        </Typography>
        
        <Button 
          component={Link} 
          to="/explore" 
          variant="contained" 
          color="primary"
          size="large"
          sx={{ 
            py: 1.5, 
            px: 4,
            fontSize: '1.2rem',
            borderRadius: '30px',
            boxShadow: '0 0 15px rgba(110, 140, 247, 0.5)'
          }}
        >
          Start Exploring
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage; 