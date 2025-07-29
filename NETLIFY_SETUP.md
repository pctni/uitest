# Netlify Deployment Setup

## Quick Setup (5 minutes)

### 1. Connect to Netlify
1. Go to [https://netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select `pctni/uitest` repository
5. Netlify will auto-detect the `netlify.toml` configuration
6. Click "Deploy site"

### 2. Get Your Site ID (for GitHub Actions)
After the first deployment:
1. Go to your Netlify site dashboard
2. Go to Site settings → General
3. Copy the "Site ID" (looks like: `abc123def-456g-789h-ijk1-23456789lmno`)

### 3. Create Netlify Personal Access Token
1. Go to [https://app.netlify.com/user/applications](https://app.netlify.com/user/applications)
2. Click "New access token"
3. Give it a name like "GitHub Actions"
4. Copy the token (starts with `nfp_`)

### 4. Add GitHub Secrets
In your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:
   - **Name:** `NETLIFY_AUTH_TOKEN` **Value:** Your access token (nfp_...)
   - **Name:** `NETLIFY_SITE_ID` **Value:** Your site ID

### 5. Disable GitHub Pages (Optional)
If you want to stop using GitHub Pages:
1. Go to your repository Settings → Pages
2. Select "Deploy from a branch" → "None"

## What This Setup Provides

### ✅ Firefox PMTiles Support
The `netlify.toml` includes crucial headers for Firefox compatibility:
- `Accept-Ranges: bytes` for Range requests
- `Access-Control-Allow-Headers: Range, Content-Range`
- Proper CORS headers for cross-origin requests

### ✅ Automatic Deployments
- Every push to `main` triggers a deployment
- Pull requests get preview deployments
- GitHub comments show deployment status

### ✅ Better Performance
- Global CDN for faster loading
- Proper caching headers
- Optimized for static sites

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the site
chmod +x build.sh
./build.sh

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --dir=build --prod
```

## Troubleshooting

### PMTiles Not Loading in Firefox
1. Check browser console for CORS errors
2. Verify the PMTiles file is in `build/static/`
3. Test in Chrome first to isolate Firefox-specific issues

### Deployment Fails
1. Check GitHub Actions logs
2. Verify secrets are set correctly
3. Ensure `build.sh` is executable

### Site Not Updating
1. Check if deployment succeeded in Netlify dashboard
2. Try hard refresh (Ctrl+F5)
3. Check if you're viewing the correct URL
