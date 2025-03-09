import axios from 'axios';
import { LocationData, LocationType } from '../types/celestia';

// A mock service that simulates geocoding
// In a real application, this would use a geocoding API like Google Maps or Mapbox
export class GeocodeService {
  // Mock geocoding data for common cities
  private static mockCityCoordinates: Record<string, [number, number]> = {
    'tokyo': [139.6917, 35.6895],
    'new york': [-74.0060, 40.7128],
    'rome': [12.4964, 41.9028],
    'paris': [2.3522, 48.8566],
    'london': [-0.1278, 51.5074],
    'sydney': [151.2093, -33.8688],
    'cairo': [31.2357, 30.0444],
    'rio de janeiro': [-43.1729, -22.9068],
    'beijing': [116.4074, 39.9042],
    'los angeles': [-118.2437, 34.0522],
    'dubai': [55.2708, 25.2048],
    'moscow': [37.6173, 55.7558],
    'madrid': [-3.7038, 40.4168],
    'toronto': [-79.3832, 43.6532],
    'singapore': [103.8198, 1.3521]
  };

  // Mock landmarks for cities
  private static mockLandmarks: Record<string, Record<string, [number, number]>> = {
    'rome': {
      'colosseum': [12.4922, 41.8902],
      'trevi fountain': [12.4833, 41.9009],
      'vatican': [12.4534, 41.9022],
      'pantheon': [12.4768, 41.8986],
      'spanish steps': [12.4823, 41.9057]
    },
    'paris': {
      'eiffel tower': [2.2945, 48.8584],
      'louvre museum': [2.3376, 48.8606],
      'notre dame': [2.3499, 48.8530],
      'arc de triomphe': [2.2950, 48.8738],
      'sacre coeur': [2.3431, 48.8867]
    },
    'new york': {
      'statue of liberty': [-74.0445, 40.6892],
      'times square': [-73.9855, 40.7580],
      'central park': [-73.9665, 40.7812],
      'empire state building': [-73.9857, 40.7484],
      'brooklyn bridge': [-73.9969, 40.7061]
    }
  };

  /**
   * Get coordinates for a city
   * @param address City name
   * @returns Promise with location data
   */
  public static async getCoordinatesForCity(address: string): Promise<LocationData> {
    // Normalize the address
    const normalizedAddress = address.toLowerCase().trim();
    
    // Check if we have mock data for this city
    if (normalizedAddress in this.mockCityCoordinates) {
      const [longitude, latitude] = this.mockCityCoordinates[normalizedAddress];
      return {
        name: address,
        latitude,
        longitude,
        altitude: 15000, // City view altitude (in meters)
        type: LocationType.City
      };
    }
    
    // If not in our mock data, return default coordinates for demo purposes
    console.warn(`No mock data for city: ${address}. Using default coordinates.`);
    return {
      name: address,
      latitude: 0,
      longitude: 0,
      altitude: 15000,
      type: LocationType.City
    };
  }
  
  /**
   * Get coordinates for a landmark
   * @param landmark Landmark name
   * @param city City where the landmark is located
   * @returns Promise with location data
   */
  public static async getCoordinatesForLandmark(landmark: string, city?: string): Promise<LocationData> {
    // Normalize the inputs
    const normalizedLandmark = landmark.toLowerCase().trim();
    const normalizedCity = city?.toLowerCase().trim() || '';
    
    // Check if we have the city and landmark in our mock data
    if (normalizedCity && 
        this.mockLandmarks[normalizedCity] && 
        this.mockLandmarks[normalizedCity][normalizedLandmark]) {
      
      const [longitude, latitude] = this.mockLandmarks[normalizedCity][normalizedLandmark];
      return {
        name: landmark,
        latitude,
        longitude,
        altitude: 500, // Landmark view altitude (in meters)
        type: LocationType.Landmark
      };
    }
    
    // Try to find the landmark in any city
    if (!normalizedCity) {
      for (const city in this.mockLandmarks) {
        if (this.mockLandmarks[city][normalizedLandmark]) {
          const [longitude, latitude] = this.mockLandmarks[city][normalizedLandmark];
          return {
            name: landmark,
            latitude,
            longitude,
            altitude: 500,
            type: LocationType.Landmark
          };
        }
      }
    }
    
    // If not found, return default for demo purposes
    console.warn(`No mock data for landmark: ${landmark}. Using default coordinates.`);
    return {
      name: landmark,
      latitude: 0,
      longitude: 0,
      altitude: 500,
      type: LocationType.Landmark
    };
  }
  
  /**
   * Get coordinates for a hotel address
   * @param address Hotel address
   * @param city City where the hotel is located
   * @returns Promise with location data
   */
  public static async getCoordinatesForHotel(address: string, city?: string): Promise<LocationData> {
    // In a real app, we would call a geocoding service here
    // For now, we'll just return mock data near the city center
    
    if (city) {
      const cityData = await this.getCoordinatesForCity(city);
      // Add a small offset to simulate a hotel near the city center
      return {
        name: address,
        latitude: cityData.latitude + (Math.random() * 0.01 - 0.005),
        longitude: cityData.longitude + (Math.random() * 0.01 - 0.005),
        altitude: 300, // Hotel view altitude (in meters)
        type: LocationType.Hotel,
        description: `Hotel in ${city}`
      };
    }
    
    // Default fallback
    return {
      name: address,
      latitude: 0,
      longitude: 0,
      altitude: 300,
      type: LocationType.Hotel,
      description: "Hotel"
    };
  }
  
  /**
   * Get coordinates for an activity
   * @param activity Activity name or description
   * @param city City where the activity takes place
   * @returns Promise with location data
   */
  public static async getCoordinatesForActivity(activity: string, city?: string): Promise<LocationData> {
    // Similar to hotel, we'd use a real geocoding service
    // For now, we'll just return mock data
    
    if (city) {
      const cityData = await this.getCoordinatesForCity(city);
      // Add a small offset
      return {
        name: activity,
        latitude: cityData.latitude + (Math.random() * 0.02 - 0.01),
        longitude: cityData.longitude + (Math.random() * 0.02 - 0.01),
        altitude: 300,
        type: LocationType.Activity,
        description: activity
      };
    }
    
    // Default fallback
    return {
      name: activity,
      latitude: 0,
      longitude: 0,
      altitude: 300,
      type: LocationType.Activity,
      description: activity
    };
  }
} 