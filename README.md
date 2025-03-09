# Celestia - Google Earth-Powered Virtual Travel Preview

Celestia is an immersive, Google Earth-powered virtual travel preview that lets users experience their trip in 3D before they go—and relive it afterward. Fly from your departure city to your destination, zoom into hotels and landmarks, explore planned activities, and trace transportation routes, all in a cinematic journey.

![Celestia](https://via.placeholder.com/1200x600/0a1929/6e8cf7?text=Celestia+-+Your+Travel+Universe+Awaits)

## Features

- **Immersive Fly-In Experience**: Soar from your departure city to your destination with a stellar 3D animation
- **Landmark Exploration**: Zoom into key locations with smooth, cosmic flyovers
- **Activity Showcases**: Preview your planned activities with virtual tours
- **Transportation Visualization**: See your travel routes displayed in orbit-like paths
- **Cinematic Controls**: Pause, restart, skip sections, and capture screenshots of your journey
- **Post-Trip Highlight Reel** (Coming Soon): Overlay photos and videos on your travel path synced to music

## Getting Started

### Prerequisites

- Node.js (v14.0 or later)
- NPM (v6.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/celestia.git
   cd celestia
   ```

2. Install dependencies:
   ```
   cd celestia-app
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Enter your departure and destination cities
2. Add your hotel details
3. Enter landmarks you plan to visit
4. Add activities you plan to do
5. Click "Launch Celestia Preview" to start your virtual journey

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **CesiumJS/Resium**: 3D globe rendering
- **Material UI**: User interface components
- **React Router**: Navigation
- **Axios**: API requests (for geocoding in future versions)

## Project Structure

```
celestia-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── CelestiaViewer/ # 3D viewer components
│   │   ├── Controls/       # UI controls
│   │   └── UI/             # Generic UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and utility services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── assets/             # Local assets
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Roadmap

- [x] Initial prototype
- [x] Fly-in animation
- [x] Basic landmark exploration
- [ ] Geocoding integration
- [ ] Activity previews
- [ ] Transportation visualization
- [ ] Post-trip highlight reel

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Cesium](https://cesium.com/) for the 3D globe visualization
- [Material UI](https://mui.com/) for the UI components
- [Google Earth](https://earth.google.com/) for inspiration

## Contact

Your Travel Universe Awaits!
