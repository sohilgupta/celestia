// Type definitions for Celestia

// Main viewer props
export interface CelestiaViewerProps {
  departureCity: string;
  destinationCity: string;
  hotelAddress: string;
  landmarks: string[];
  activities: string[];
  isFlying: boolean;
}

// Control panel props
export interface ControlPanelProps {
  onStartFlight: () => void;
  isFlying: boolean;
  onPause?: () => void;
  onRestart?: () => void;
  onSkipToNext?: () => void;
  onFullscreen?: () => void;
  onScreenshot?: () => void;
}

// Location data
export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
  description?: string;
  type: LocationType;
}

// Location types
export enum LocationType {
  City = 'city',
  Hotel = 'hotel',
  Landmark = 'landmark',
  Activity = 'activity',
  Transportation = 'transportation'
}

// Transportation route
export interface TransportationRoute {
  type: TransportationType;
  startLocation: LocationData;
  endLocation: LocationData;
  waypoints?: LocationData[];
  color?: string;
  description?: string;
  travelTime?: number; // in minutes
}

// Transportation types
export enum TransportationType {
  Flight = 'flight',
  Train = 'train',
  Metro = 'metro',
  Bus = 'bus',
  Taxi = 'taxi',
  Car = 'car',
  Walking = 'walking'
}

// Flight animation state
export interface FlightState {
  isPlaying: boolean;
  currentStep: FlightStep;
  progress: number; // 0 to 1
  currentLocation?: LocationData;
}

// Flight steps
export enum FlightStep {
  NotStarted = 'not_started',
  DepartureZoom = 'departure_zoom',
  EarthCurvature = 'earth_curvature',
  CrossGlobe = 'cross_globe',
  DestinationZoom = 'destination_zoom',
  HotelZoom = 'hotel_zoom',
  LandmarkTour = 'landmark_tour',
  ActivityTour = 'activity_tour',
  TransportationRoutes = 'transportation_routes',
  FlyOut = 'fly_out',
  Completed = 'completed'
}

// Post-trip highlight media
export interface HighlightMedia {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  location: LocationData;
  timestamp: Date;
  title?: string;
  description?: string;
}

// Highlight reel configuration
export interface HighlightReelConfig {
  title: string;
  mediaItems: HighlightMedia[];
  musicTrack?: string;
  duration?: number; // in seconds
  transitions?: 'fade' | 'zoom' | 'slide';
}

// User preferences
export interface UserPreferences {
  skipFlyIn: boolean;
  skipFlyOut: boolean;
  focusAreas: ('landmarks' | 'activities' | 'transportation' | 'food')[];
  animationSpeed: 'slow' | 'normal' | 'fast';
  showLabels: boolean;
  showInformation: boolean;
} 