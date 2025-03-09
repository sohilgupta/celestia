import React, { useEffect, useRef, useState } from 'react';
import { 
  Viewer, 
  Entity, 
  GeoJsonDataSource, 
  Cesium3DTileset, 
  Globe, 
  Camera,
  Scene
} from 'resium';
import {
  Cartesian3,
  Color,
  HeadingPitchRoll,
  HeadingPitchRange,
  Ion,
  Math as CesiumMath,
  createWorldTerrain,
  createOsmBuildings,
  IonResource,
  PolylineGlowMaterialProperty,
  JulianDate
} from 'cesium';
import { Box, CircularProgress, Typography } from '@mui/material';
import 'cesium/Build/Cesium/Widgets/widgets.css';

// Set up your Cesium ion access token
// You would need to get your own token from https://cesium.com/ion/
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjY0NjQ5NH0.XcKpgANiY22ejJvPUsPHZ1LZ5c0-8RAxfWQ_F_I_p8s';

interface CelestiaViewerProps {
  departureCity: string;
  destinationCity: string;
  hotelAddress: string;
  landmarks: string[];
  activities: string[];
  isFlying: boolean;
}

const CelestiaViewer: React.FC<CelestiaViewerProps> = ({
  departureCity,
  destinationCity,
  hotelAddress,
  landmarks,
  activities,
  isFlying
}) => {
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Helper function to get coordinates from address (mock)
  // In a real app, use a geocoding service like Google Maps Geocoding API
  const getCoordinatesFromAddress = (address: string): Cartesian3 => {
    // Mock coordinates (New York City)
    return Cartesian3.fromDegrees(-74.0060, 40.7128, 500);
  };
  
  // Initialize the viewer once on component mount
  useEffect(() => {
    if (viewerRef.current) {
      setIsLoading(false);
      
      // Configure the globe appearance
      if (viewerRef.current.scene && viewerRef.current.scene.globe) {
        viewerRef.current.scene.globe.enableLighting = true;
        viewerRef.current.scene.globe.atmosphereLightIntensity = 5.0;
        viewerRef.current.scene.globe.atmosphereHueShift = 0.1;
      }
      
      // Set initial view
      viewerRef.current.camera.flyHome(3.0);
    }
  }, []);
  
  // Handle flying between cities when isFlying changes
  useEffect(() => {
    if (!viewerRef.current || !isFlying) return;
    
    try {
      // In a real implementation, geocode the cities to get coordinates
      // For now, use mock coordinates
      const departurePosition = departureCity === 'Tokyo' ? 
        Cartesian3.fromDegrees(139.6917, 35.6895, 15000) : 
        Cartesian3.fromDegrees(-74.0060, 40.7128, 15000);
        
      const destinationPosition = destinationCity === 'Rome' ? 
        Cartesian3.fromDegrees(12.4964, 41.9028, 15000) : 
        Cartesian3.fromDegrees(-118.2437, 34.0522, 15000);
      
      // Start the flyover animation
      startFlyover(departurePosition, destinationPosition);
    } catch (err) {
      console.error('Error starting flyover:', err);
      setError('Failed to start the flight animation. Please try again.');
    }
  }, [isFlying, departureCity, destinationCity]);
  
  // Function to start the flyover animation
  const startFlyover = (departure: Cartesian3, destination: Cartesian3) => {
    if (!viewerRef.current) return;
    
    // Initial high-altitude view showing both points (Earth's curvature visible)
    viewerRef.current.camera.flyTo({
      destination: Cartesian3.fromDegrees(0, 20, 25000000),
      duration: 3.0,
      complete: () => {
        // Fly to departure city
        viewerRef.current?.camera.flyTo({
          destination: departure,
          orientation: {
            heading: 0,
            pitch: CesiumMath.toRadians(-30), // Looking down at 30 degrees
            roll: 0
          },
          duration: 4.0,
          complete: () => {
            // Fly across the globe to the destination (curved path)
            flyAcrossGlobe(destination);
          }
        });
      }
    });
  };
  
  // Function to fly across the globe with a curved path
  const flyAcrossGlobe = (destination: Cartesian3) => {
    if (!viewerRef.current) return;
    
    // Calculate a position high above the Earth between origin and destination
    // This creates the curved path effect
    viewerRef.current.camera.flyTo({
      destination: Cartesian3.fromDegrees(0, 40, 12000000),
      orientation: {
        heading: 0,
        pitch: CesiumMath.toRadians(-50),
        roll: 0
      },
      duration: 4.0,
      complete: () => {
        // Fly to destination city
        viewerRef.current?.camera.flyTo({
          destination: destination,
          orientation: {
            heading: 0,
            pitch: CesiumMath.toRadians(-45),
            roll: 0
          },
          duration: 4.0,
          complete: () => {
            // Animation complete
            // Here you would start the landmarks and hotel zooms
            console.log("Flight animation complete");
          }
        });
      }
    });
  };
  
  const handleReady = (viewer: Cesium.Viewer) => {
    viewerRef.current = viewer;
  };
  
  if (error) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        p: 3
      }}>
        <Typography color="error" variant="h6" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      </Box>
    );
  }
  
  return (
    <>
      {isLoading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 10,
          backgroundColor: 'rgba(10, 25, 41, 0.7)'
        }}>
          <CircularProgress size={60} color="primary" />
          <Typography variant="h6" color="primary" sx={{ ml: 2 }}>
            Preparing Your Cosmos...
          </Typography>
        </Box>
      )}
      
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <Viewer 
          full
          homeButton={false}
          timeline={false}
          animation={false}
          baseLayerPicker={false}
          geocoder={false}
          navigationHelpButton={false}
          terrainProvider={createWorldTerrain()}
          onReady={handleReady}
        >
          <Globe enableLighting />
          <Scene
            skyBox={false}
            backgroundColor={Color.BLACK}
            globe={{ enableLighting: true }}
          />
          <Camera />
          
          {/* In a full implementation, you would add entities and 3D models here
              based on the user's input (landmarks, hotels, etc.) */}
        </Viewer>
      </Box>
    </>
  );
};

export default CelestiaViewer; 