# Railway Deployment Guide

## Quick Deploy to Railway

1. **Connect your GitHub repository** to Railway
2. **Set the following environment variables** in Railway dashboard:
   - `PORT` (Railway will set this automatically)
   - `ASPNETCORE_ENVIRONMENT=Production`
   - `ASPNETCORE_URLS=http://*:8080`

3. **Deploy** - Railway will automatically detect the Dockerfile and build

## Common Railway Issues & Solutions

### Issue 1: Build Fails with Node.js
**Error**: `npm ci --only=production` fails
**Solution**: Changed to `npm ci` (includes dev dependencies needed for build)

### Issue 2: Port Configuration
**Error**: Application doesn't start
**Solution**: Updated Program.cs to handle Railway's PORT environment variable

### Issue 3: Static Files Not Found
**Error**: Frontend assets not loading
**Solution**: Ensure frontend build completes and files are copied to `/wwwroot`

### Issue 4: Health Check Fails
**Error**: Railway health check timeout
**Solution**: Health check endpoint is available at `/health`

## Railway-Specific Configuration

### Environment Variables
Railway automatically provides:
- `PORT` - The port your app should listen on
- `RAILWAY_STATIC_URL` - Your app's public URL

### Health Check
- **Path**: `/health`
- **Timeout**: 300 seconds
- **Interval**: Railway will check every 30 seconds

### Build Process
1. **Frontend Stage**: Builds React app with Node.js
2. **Backend Stage**: Builds .NET application
3. **Final Stage**: Combines both in production-ready image

## Troubleshooting

### If Build Fails:
1. Check Railway logs for specific error messages
2. Ensure all dependencies are properly specified
3. Verify Dockerfile syntax

### If App Doesn't Start:
1. Check if PORT environment variable is set
2. Verify the application is listening on the correct port
3. Check health check endpoint at `/health`

### If Frontend Doesn't Load:
1. Verify frontend build completed successfully
2. Check if static files are served from `/wwwroot`
3. Ensure `MapFallbackToFile("index.html")` is configured

## Monitoring

- **Logs**: Available in Railway dashboard
- **Health**: Check `/health` endpoint
- **Metrics**: Railway provides basic metrics in dashboard

## Rollback

If deployment fails, Railway allows you to:
1. Rollback to previous successful deployment
2. View detailed logs for debugging
3. Restart the service

## Support

If you continue to have issues:
1. Check Railway's status page
2. Review Railway documentation
3. Check application logs for specific errors 