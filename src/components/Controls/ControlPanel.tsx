import React from 'react';
import { 
  Box, 
  IconButton, 
  Paper, 
  Tooltip,
  Typography
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import './ControlPanel.css';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  isPlaying,
  onPlay,
  onPause,
  onRestart
}) => {
  return (
    <Paper className="celestia-control-panel">
      <Typography 
        variant="subtitle2" 
        className="celestia-control-label"
      >
        Flight Controls
      </Typography>
      
      <Box className="celestia-button-group">
        {isPlaying ? (
          <Tooltip title="Pause Flight">
            <IconButton 
              color="primary" 
              onClick={onPause}
              className="celestia-control-button"
            >
              <PauseIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Start Flight">
            <IconButton 
              color="primary" 
              onClick={onPlay}
              className="celestia-control-button"
            >
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        )}
        
        <Tooltip title="Restart Flight">
          <IconButton 
            color="secondary" 
            onClick={onRestart}
            className="celestia-control-button"
          >
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default ControlPanel; 