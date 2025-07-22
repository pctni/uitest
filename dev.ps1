# Development script for Windows
Write-Host "Installing dependencies..." -ForegroundColor Green
deno install --allow-scripts=npm:esbuild,npm:@esbuild/win32-x64

Write-Host "Starting development server..." -ForegroundColor Green
deno task dev
