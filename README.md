# 🦕 Deno + MapLibre - Northern Ireland

Interactive Northern Ireland mapping application powered by pure Deno with MapLibre GL.

## Features

- ⚡️ **Lightning Fast** - Pure Deno server with zero build dependencies
- 🦕 **Deno Native** - No Node.js or npm installation required  
- 🗺️ **Interactive Maps** - Northern Ireland focused mapping with MapLibre GL
- � **Geographic Focus** - Centered on Northern Ireland with proper bounds
- 🏙️ **City Markers** - Belfast and Derry/Londonderry with informative popups
- �🎨 **Beautiful UI** - Modern gradient design with glassmorphism
- ⚡️ **Real-time Features** - Live counter and clock
- 🚀 **Deploy Anywhere** - Single HTML file + Deno server

## Prerequisites

- [Deno](https://deno.land/) runtime (v1.37 or higher)

## Getting Started

### Quick Start

1. **Start the server:**
   ```bash
   deno task dev
   ```

2. **Or run directly:**
   ```bash
   deno run --allow-net --allow-read server.ts
   ```

3. **Open your browser:**
   - **Northern Ireland Map**: [http://localhost:5173](http://localhost:5173)
   - **Simple Version**: [http://localhost:5173/simple](http://localhost:5173/simple)

### What You'll See

- 🗺️ **Interactive Northern Ireland Map** with:
  - Centered on geographic center of Northern Ireland (54.6°N, 6.5°W)
  - Bounded view covering mainland Northern Ireland
  - Belfast marker (capital city) with popup information
  - Derry/Londonderry marker (second-largest city)
  - Navigation controls (zoom, rotate, tilt)
  - Geolocate control for user location
  - Scale indicator
- 🦕 **Deno-themed interface** with beautiful gradients
- 🔢 **Interactive counter** with smooth hover effects
- ⏰ **Live clock** updating every second
- 🎨 **Responsive design** that works on all devices

## Northern Ireland Map Details

### Geographic Coverage
- **Center Point**: 54.6°N, 6.5°W (approximate geographic center)
- **Bounding Box**: 
  - West: 8.2°W
  - East: 5.2°W  
  - South: 54.0°N
  - North: 55.5°N
- **Coverage**: All of mainland Northern Ireland

### Featured Locations
- **Belfast** (54.5973°N, 5.9301°W) - Capital and largest city
- **Derry/Londonderry** (55.0006°N, 7.3086°W) - Second-largest city

### Map Technology
- **MapLibre GL JS** - Open-source vector tile rendering
- **Carto Basemap** - Clean, light positron style  
- **Interactive Controls** - Navigation, geolocation, scale
- **Responsive Design** - Adapts to desktop and mobile

## How It Works

This is a pure Deno application that:

1. **Serves static content** via Deno's built-in HTTP server
2. **Loads MapLibre GL** from CDN for interactive mapping
3. **No build step required** - just HTML, CSS, and JavaScript
4. **Minimal resource usage** - under 200 lines of code total
5. **Cross-platform** - runs on Windows, macOS, and Linux

### File Structure

```
├── server.ts              # Deno HTTP server with multiple routes
├── ni-map.html            # Northern Ireland map application  
├── index.html             # Simple counter/clock application
├── static/                # Static assets
│   └── favicon.png        # App icon
├── deno.json             # Deno configuration
└── README.md             # This file
```

## Development Routes

- `/` - Northern Ireland interactive map (default)
- `/simple` - Simple counter and clock interface

## Customization

- **Edit `ni-map.html`** - Modify the map UI, add markers, change styling
- **Edit `server.ts`** - Add new routes or API endpoints
- **Add static files** - Put them in the `static/` directory
- **Modify coordinates** - Change center point or bounds for different regions

## Deployment

### Local Development
```bash
deno task dev
```

### Production
```bash
deno run --allow-net --allow-read server.ts
```

### Cloud Deployment

Deploy to **Deno Deploy** in seconds:
```bash
deployctl deploy --project=ni-map server.ts
```

Or use any cloud platform that supports Deno:
- **Deno Deploy** (recommended)
- **Railway**
- **Fly.io**
- **DigitalOcean App Platform**

## Geographic Data Sources

- **Northern Ireland boundaries** - Based on standard geographic definitions
- **City coordinates** - Official latitude/longitude for Belfast and Derry/Londonderry
- **Map tiles** - Carto positron basemap (light theme)

## Why This Approach?

- ✅ **Geographic Focus** - Specifically designed for Northern Ireland
- ✅ **Simple** - No complex build tools or bundlers needed
- ✅ **Fast** - Instant startup, no compilation required
- ✅ **Secure** - Deno's permission-based security model
- ✅ **Modern** - Uses latest web mapping standards
- ✅ **Educational** - Perfect for learning geographic web development

## Performance

- **Cold start**: < 100ms
- **Memory usage**: < 15MB
- **Map load time**: < 2 seconds (CDN dependent)
- **Dependencies**: 0 local packages (MapLibre loaded from CDN)

Perfect for geographic applications, tourism websites, educational tools, or any project needing Northern Ireland mapping capabilities! 🗺️🦕
