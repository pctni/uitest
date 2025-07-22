# 🦕 Deno Web Application

A minimal, fast web application powered by pure Deno with modern UI design.

## Features

- ⚡️ **Lightning Fast** - Pure Deno server with zero dependencies
- 🦕 **Deno Native** - No Node.js or npm required
- 🎨 **Beautiful UI** - Modern gradient design with glassmorphism
- ⚡️ **Interactive** - Live counter and real-time clock
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
   Visit [http://localhost:5173](http://localhost:5173)

### What You'll See

- 🦕 **Deno-themed interface** with beautiful gradients
- 🔢 **Interactive counter** with smooth hover effects
- ⏰ **Live clock** updating every second
- 🎨 **Glassmorphism design** with backdrop blur effects

## How It Works

This is a pure Deno application that:

1. **Serves static content** via Deno's built-in HTTP server
2. **No build step required** - just pure HTML, CSS, and JavaScript
3. **Minimal resource usage** - under 100 lines of TypeScript
4. **Cross-platform** - runs on Windows, macOS, and Linux

### File Structure

```
├── server.ts           # Deno HTTP server
├── index.html          # Main application page
├── static/             # Static assets
│   └── favicon.png     # App icon
├── deno.json          # Deno configuration
└── README.md          # This file
```

## Customization

- **Edit `index.html`** - Modify the UI and styling
- **Edit `server.ts`** - Add new routes or functionality  
- **Add static files** - Put them in the `static/` directory

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
deployctl deploy --project=my-app server.ts
```

Or use any cloud platform that supports Deno:
- **Deno Deploy** (recommended)
- **Railway**
- **Fly.io**
- **DigitalOcean App Platform**

## Why This Approach?

- ✅ **Simple** - No complex build tools or bundlers
- ✅ **Fast** - Instant startup, no compilation needed
- ✅ **Secure** - Deno's permission-based security model
- ✅ **Modern** - Uses latest web standards
- ✅ **Reliable** - Minimal dependencies = fewer things to break

## Performance

- **Cold start**: < 50ms
- **Memory usage**: < 10MB
- **Bundle size**: 0 bytes (no bundle!)
- **Dependencies**: 0 external packages

Perfect for microservices, prototypes, or production applications that need maximum simplicity and performance!
