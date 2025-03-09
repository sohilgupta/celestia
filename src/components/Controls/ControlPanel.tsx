import React from 'react';
import { 
  Box, 
  Button, 
  IconButton, 
  Paper, 
  Tooltip, 
  Typography,
  Zoom,
  Fade 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface ControlPanelProps {
  onStartFlight: () => void;
  isFlying: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  onStartFlight,
  isFlying
}) => {
  // Handlers (would be implemented in a real app)
  const handlePause = () => {
    console.log("Paused");
    // In a real app, would pause the animation
  };
  
  const handleRestart = () => {
    console.log("Restarted");
    // In a real app, would restart the animation
  };
  
  const handleFullscreen = () => {
    console.log("Fullscreen toggled");
    // In a real app, would toggle fullscreen
  };
  
  const handleScreenshot = () => {
    console.log("Screenshot taken");
    // In a real app, would capture the current view
  };
  
  const handleSkipToNext = () => {
    console.log("Skipped to next section");
    // In a real app, would skip to the next part of the animation
  };
  
  return (
    <>
      {/* Floating control panel */}
      <Paper
        elevation={3}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          p: 1,
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'rgba(19, 47, 76, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(110, 140, 247, 0.3)',
          zIndex: 10
        }}
      >
        <Tooltip title={isFlying ? "Pause" : "Start Flight"}>
          <IconButton 
            color="primary" 
            onClick={isFlying ? handlePause : onStartFlight}
            size="large"
            sx={{ 
              backgroundColor: 'rgba(110, 140, 247, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(110, 140, 247, 0.3)',
              }
            }}
          >
            {isFlying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Restart">
          <IconButton 
            onClick={handleRestart} 
            color="primary"
            size="medium"
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Skip to Next">
          <IconButton 
            onClick={handleSkipToNext} 
            color="primary"
            size="medium"
          >
            <SkipNextIcon />
          </IconButton>
        </Tooltip>
        
        <Box sx={{ height: '24px', width: '1px', bgcolor: 'rgba(255,255,255,0.3)' }} />
        
        <Tooltip title="Fullscreen">
          <IconButton 
            onClick={handleFullscreen} 
            color="primary"
            size="medium"
          >
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Take Screenshot">
          <IconButton 
            onClick={handleScreenshot} 
            color="primary"
            size="medium"
          >
            <PhotoCameraIcon />
          </IconButton>
        </Tooltip>
      </Paper>
      
      {/* Top Info Panel */}
      <Fade in={isFlying}>
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            p: 2,
            borderRadius: 2,
            minWidth: 200,
            textAlign: 'center',
            backgroundColor: 'rgba(19, 47, 76, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(110, 140, 247, 0.3)',
            zIndex: 10,
            display: isFlying ? 'block' : 'none'
          }}
        >
          <Typography variant="body1" color="primary.light">
            Currently Viewing
          </Typography>
          <Typography variant="h6">
            Tokyo to Rome
          </Typography>
        </Paper>
      </Fade>
    </>
  );
};

export default ControlPanel; 