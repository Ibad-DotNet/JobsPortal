# Jobs Portal Docker Setup

This Docker setup builds and deploys both the backend (.NET) and frontend (React) applications together, ensuring proper routing and authentication handling.

## Features

- **Unified Deployment**: Both frontend and backend are served from a single container
- **No Refresh Issues**: Proper client-side routing handled by the backend
- **Authentication Persistence**: JWT tokens are properly validated and persisted
- **Role-based Access**: Proper role checking and redirection

## Building and Running

### Option 1: Using the build script
```bash
chmod +x build-and-run.sh
./build-and-run.sh
```

### Option 2: Manual Docker commands
```bash
# Build the image
docker build -t jobs-portal .

# Run the container
docker run -d -p 8080:8080 --name jobs-portal-container jobs-portal
```

### Option 3: Using Docker Compose (if you prefer)
```bash
docker-compose up -d
```

## Accessing the Application

- **Frontend**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger
- **Health Check**: http://localhost:8080/health

## Key Improvements Made

### 1. Multi-stage Docker Build
- Frontend build stage using Node.js
- Backend build stage using .NET SDK
- Final stage combines both applications

### 2. Static File Serving
- Backend serves frontend static files from `/wwwroot`
- `app.UseStaticFiles()` middleware configured
- `app.MapFallbackToFile("index.html")` handles client-side routing

### 3. Authentication Improvements
- JWT token validation and expiration checking
- Proper session restoration on page refresh
- Automatic logout on token expiration
- Role-based route protection

### 4. Routing Fixes
- No more redirects to login on page refresh
- Proper handling of deep links (e.g., `/administrator`)
- Loading states during authentication checks

## Troubleshooting

### If you get authentication errors:
1. Clear browser localStorage
2. Check that the JWT token is valid
3. Verify the backend is running properly

### If static files aren't loading:
1. Ensure the frontend build completed successfully
2. Check that files are copied to `/wwwroot` in the container
3. Verify the `app.UseStaticFiles()` middleware is configured

### If routing doesn't work:
1. Ensure `app.MapFallbackToFile("index.html")` is configured
2. Check that the frontend is using relative paths (`base: './'` in vite.config.js)
3. Verify the `_redirects` file is present in the frontend build

## Development vs Production

- **Development**: Use separate frontend and backend servers
- **Production**: Use this Docker setup for unified deployment

## Environment Variables

The application uses the following environment variables:
- `PORT`: Backend port (default: 8080)
- `VITE_API_BASE_URL`: Frontend API base URL (for development)

For production, the frontend will automatically use the same domain as the backend. 