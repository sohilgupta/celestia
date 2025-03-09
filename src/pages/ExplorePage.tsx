import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import ExploreIcon from '@mui/icons-material/Explore';
import DirectionsIcon from '@mui/icons-material/Directions';
import CelestiaViewer from '../components/CelestiaViewer/CelestiaViewer';
import ControlPanel from '../components/Controls/ControlPanel';

const steps = ['Departure & Destination', 'Accommodations', 'Activities', 'Transportation', 'Preview'];

const ExplorePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [landmarks, setLandmarks] = useState(['']);
  const [activities, setActivities] = useState(['']);
  const [isFlying, setIsFlying] = useState(false);
  
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleStartFlight = () => {
    setIsFlying(true);
    // In a real implementation, this would trigger the flight animation
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Where are you traveling from and to?
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Departure City"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination City"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Where will you be staying?
            </Typography>
            <TextField
              fullWidth
              label="Hotel Address"
              value={hotelAddress}
              onChange={(e) => setHotelAddress(e.target.value)}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: <HotelIcon color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What landmarks would you like to visit?
            </Typography>
            {landmarks.map((landmark, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Landmark ${index + 1}`}
                value={landmark}
                onChange={(e) => {
                  const newLandmarks = [...landmarks];
                  newLandmarks[index] = e.target.value;
                  setLandmarks(newLandmarks);
                }}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: <MapIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            ))}
            <Button 
              variant="outlined" 
              onClick={() => setLandmarks([...landmarks, ''])}
              sx={{ mt: 2 }}
            >
              Add Another Landmark
            </Button>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              What activities do you plan to do?
            </Typography>
            {activities.map((activity, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Activity ${index + 1}`}
                value={activity}
                onChange={(e) => {
                  const newActivities = [...activities];
                  newActivities[index] = e.target.value;
                  setActivities(newActivities);
                }}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: <ExploreIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            ))}
            <Button 
              variant="outlined" 
              onClick={() => setActivities([...activities, ''])}
              sx={{ mt: 2 }}
            >
              Add Another Activity
            </Button>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ready for takeoff! Your travel universe awaits.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleStartFlight}
              startIcon={<FlightTakeoffIcon />}
              sx={{ mt: 2 }}
            >
              Launch Celestia Preview
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Celestia
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your Travel Universe
        </Typography>
      </Box>
      <Divider />
      <List>
        {steps.map((text, index) => (
          <ListItem 
            button 
            key={text} 
            onClick={() => setActiveStep(index)}
            selected={activeStep === index}
          >
            <ListItemIcon>
              {index === 0 && <FlightTakeoffIcon />}
              {index === 1 && <HotelIcon />}
              {index === 2 && <MapIcon />}
              {index === 3 && <DirectionsIcon />}
              {index === 4 && <ExploreIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          background: 'linear-gradient(135deg, #0a1929 0%, #101823 100%)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Box 
          component="header" 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Celestia Explorer
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Box 
            sx={{ 
              width: '100%', 
              height: '100%', 
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            {/* Left Panel - Form */}
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                m: 2, 
                width: { xs: 'auto', md: '400px' },
                height: { xs: 'auto', md: 'calc(100vh - 100px)' },
                overflowY: 'auto',
                backgroundColor: 'background.paper',
                borderRadius: 2
              }}
            >
              <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 3 }}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              {renderStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
                  {activeStep === steps.length - 2 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Paper>
            
            {/* Right Panel - CelestiaViewer */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                m: 2, 
                position: 'relative',
                minHeight: { xs: '400px', md: 'calc(100vh - 100px)' },
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(110, 140, 247, 0.3)',
              }}
            >
              <CelestiaViewer 
                departureCity={departureCity}
                destinationCity={destinationCity}
                hotelAddress={hotelAddress}
                landmarks={landmarks.filter(l => l !== '')}
                activities={activities.filter(a => a !== '')}
                isFlying={isFlying}
              />
              
              <ControlPanel 
                onStartFlight={handleStartFlight}
                isFlying={isFlying}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExplorePage; 