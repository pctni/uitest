# Northern Ireland Interactive Map

A clean, fast interactive map application showing Northern Ireland cycling routes using PMTiles and MapLibre GL.

## 🚀 Features

- **Interactive Map**: MapLibre GL with custom styling
- **PMTiles Support**: Efficient vector tile delivery for cycling routes
- **Responsive Design**: Works on desktop and mobile
- **Fast Loading**: Optimized static site generation
- **Netlify Ready**: Simple deployment configuration

## 🛠️ Technology Stack

- **Deno**: Modern JavaScript runtime
- **MapLibre GL**: Open-source mapping library
- **PMTiles**: Efficient map tile format
- **Static HTML**: No framework overhead, just fast performance

## 📦 Project Structure

```
├── build-simple.ts     # Simple build script
├── static/              # Static assets (PMTiles, favicon)
├── netlify.toml        # Netlify deployment config
├── deno.json           # Deno configuration
└── build/              # Generated site (created by build)
```

## 🏃‍♂️ Quick Start

### Prerequisites
- [Deno](https://deno.land/) installed

### Development

```bash
# Build the site
deno task build

# Preview locally
deno task preview
```

Visit `http://localhost:4173` to see the map.

## 🌐 Deployment

### Netlify (Recommended)

The site is configured for automatic Netlify deployment:

1. Connect your GitHub repo to Netlify
2. Netlify will automatically:
   - Run `deno run -A build-simple.ts`
   - Deploy the `build/` directory
   - Apply proper headers for PMTiles

### Manual Deployment

```bash
# Build the site
deno task build

# Upload the build/ directory to any static host
```

## 📁 PMTiles Data

Place your PMTiles file at `static/route_network_fastest.pmtiles`. The map will automatically load and display vector data from this file.

## 🎨 Customization

Edit `build-simple.ts` to customize:
- Map style and center point
- PMTiles layer styling  
- HTML template and CSS
- Additional map features

## 📄 License

This project is open source and available under the MIT License.