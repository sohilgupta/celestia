import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Paper
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const HomePage: React.FC = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a1929 0%, #111823 100%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 8 }}>
        <Grid container spacing={6} alignItems="center" sx={{ minHeight: '80vh' }}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              component="h1"
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
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
            <Typography paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
              Experience your journey before you go. Fly from your departure city to destination,
              zoom into hotels and landmarks, explore planned activities, and visualize transportation routes—all
              in a cinematic 3D experience.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                component={Link} 
                to="/explore" 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<ExploreIcon />}
                sx={{ 
                  py: 1.5, 
                  px: 3,
                  fontSize: '1rem',
                  boxShadow: '0 0 15px rgba(110, 140, 247, 0.5)'
                }}
              >
                Start Exploring
              </Button>
              <Button 
                variant="outlined" 
                color="secondary"
                size="large"
                startIcon={<FlightTakeoffIcon />}
                sx={{ py: 1.5, px: 3, fontSize: '1rem' }}
              >
                How It Works
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={6} 
              sx={{ 
                height: 400, 
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                background: '#000',
                border: '1px solid rgba(110, 140, 247, 0.3)',
                boxShadow: '0 0 30px rgba(110, 140, 247, 0.2)'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(10, 25, 41, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h4" sx={{ textAlign: 'center', color: 'primary.main' }}>
                  Earth View Preview
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Celestia — Immersive Google Earth-Powered Virtual Travel Preview
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage; 