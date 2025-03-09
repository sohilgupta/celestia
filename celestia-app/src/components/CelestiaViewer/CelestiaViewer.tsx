import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Scene, Globe, Camera } from 'resium';
import {
  Cartesian3,
  Color,
  Ion,
  Math as CesiumMath,
  createWorldTerrain,
  Cartographic,
  HeightReference
} from 'cesium';
import { Box, Typography, CircularProgress } from '@mui/material';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './CelestiaViewer.css';

// Use the environment variable for Cesium's base URL
window.CESIUM_BASE_URL = process.env.REACT_APP_CESIUM_BASE_URL || '/cesium';

// Replace with your own Cesium Ion access token if needed
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjY0NjQ5NH0.XcKpgANiY22ejJvPUsPHZ1LZ5c0-8RAxfWQ_F_I_p8s';

interface CelestiaViewerProps {
  isPlaying: boolean;
  onFlyComplete?: () => void;
}

const CelestiaViewer: React.FC<CelestiaViewerProps> = ({ 
  isPlaying, 
  onFlyComplete 
}) => {
  const viewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [flightInProgress, setFlightInProgress] = useState(false);

  // Define city coordinates
  const LONDON = Cartesian3.fromDegrees(-0.1, 51.5, 5000); // lon, lat, height(m)
  const NEW_YORK = Cartesian3.fromDegrees(-74.0, 40.7, 5000);
  
  // Initialize the viewer
  useEffect(() => {
    if (!viewerRef.current) return;
    
    // Configure the globe
    if (viewerRef.current.scene && viewerRef.current.scene.globe) {
      // Enable lighting based on sun/moon positions
      viewerRef.current.scene.globe.enableLighting = true;
      
      // Adjust atmosphere
      viewerRef.current.scene.globe.atmosphereLightIntensity = 5.0;
      viewerRef.current.scene.globe.atmosphereHueShift = 0.1;
      
      // Set the background color
      viewerRef.current.scene.backgroundColor = Color.BLACK;
      
      // Remove fog (optional)
      viewerRef.current.scene.fog.enabled = false;
    }
    
    // Set initial view to show full Earth
    viewerRef.current.camera.flyHome(2.0);
    
    // Loading complete
    setIsLoading(false);
    
    // Clean up function
    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
      }
    };
  }, []);
  
  // Handle play/pause state
  useEffect(() => {
    if (!viewerRef.current) return;
    
    if (isPlaying && !flightInProgress) {
      // Start the flight animation
      startFlight();
    } else if (!isPlaying && flightInProgress) {
      // Pause the flight
      viewerRef.current.camera.cancelFlight();
      setFlightInProgress(false);
    }
  }, [isPlaying, flightInProgress]);
  
  // Start the flight animation
  const startFlight = () => {
    if (!viewerRef.current) return;
    
    setFlightInProgress(true);
    
    // First zoom out to see the Earth's curvature
    viewerRef.current.camera.flyTo({
      destination: Cartesian3.fromDegrees(-30, 25, 25000000), // Position above Atlantic to see both cities
      duration: 3.0,
      complete: () => {
        // Then fly to London (origin)
        viewerRef.current.camera.flyTo({
          destination: LONDON,
          orientation: {
            heading: CesiumMath.toRadians(0),
            pitch: CesiumMath.toRadians(-30), // Looking down at 30 degrees
            roll: 0
          },
          duration: 4.0,
          complete: () => {
            // Then fly to New York (destination)
            viewerRef.current.camera.flyTo({
              destination: NEW_YORK,
              orientation: {
                heading: CesiumMath.toRadians(0),
                pitch: CesiumMath.toRadians(-30),
                roll: 0
              },
              duration: 5.0,
              complete: () => {
                // Flight complete
                setFlightInProgress(false);
                if (onFlyComplete) onFlyComplete();
              }
            });
          }
        });
      }
    });
  };
  
  // Handle viewer ready callback
  const handleReady = (viewer: any) => {
    viewerRef.current = viewer;
  };
  
  return (
    <Box className="celestia-viewer-container">
      {isLoading && (
        <Box className="celestia-loading-overlay">
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" color="primary" sx={{ ml: 2 }}>
            Initializing Earth View...
          </Typography>
        </Box>
      )}
      
      <Box className="celestia-title-overlay">
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #6e8cf7 0%, #f9a825 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          Celestia
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'rgba(255,255,255,0.8)',
            mt: -1
          }}
        >
          {flightInProgress ? 'London to New York' : 'Your Travel Universe'}
        </Typography>
      </Box>
      
      <Viewer 
        full
        timeline={false}
        animation={false}
        baseLayerPicker={false}
        fullscreenButton={false}
        homeButton={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        terrainProvider={createWorldTerrain()}
        onReady={handleReady}
      >
        <Scene 
          skyBox={false} 
          backgroundColor={Color.BLACK}
          globe={{ enableLighting: true }}
        />
        <Globe enableLighting />
        <Camera />
      </Viewer>
    </Box>
  );
};

export default CelestiaViewer; 