# Northern Ireland Route Network Map

An interactive web mapping application displaying cycling route networks in Northern Ireland with volume-based styling.

## Features

- 🗺️ Interactive map with Northern Ireland geographical bounds
- 🚴 Route network visualization with cycling volume data
- 🎨 Color-coded routes based on daily trip volumes
- 📊 Interactive legend showing volume ranges
- 📱 Responsive design for mobile and desktop
- 🖱️ Click routes to see detailed volume information
- 🔍 Zoom-dependent line widths for better visibility

## Technology Stack

- **MapLibre GL JS** - Modern web mapping library
- **PMTiles** - Efficient vector tile format for route data
- **Deno** - Runtime for local development server
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated deployment

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/pctni/uitest.git
   cd uitest
   ```

2. Start the development server:
   ```bash
   deno run --allow-net --allow-read server.ts
   ```

3. Open your browser to `http://localhost:5174`

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live URL:** https://pctni.github.io/uitest/

## Data Sources

- Route network data in PMTiles format
- Cycling volume estimates based on Go Dutch scenarios
- Basemap tiles from CartoDB Positron

## Color Coding

- 🔴 **Magenta (3000+ trips/day)** - Extremely high volume
- 🔵 **Dark Blue (2000-2999 trips/day)** - Very high volume  
- 🔵 **Blue (1000-1999 trips/day)** - High volume
- 🔵 **Light Blue (500-999 trips/day)** - Medium-high volume
- 🔵 **Cyan (250-499 trips/day)** - Medium volume
- 🟢 **Light Green (100-249 trips/day)** - Medium-low volume
- 🟡 **Yellow (50-99 trips/day)** - Low volume
- ⚫ **Gray (<50 trips/day)** - Very low volume

## License

MIT License - see LICENSE file for details.
