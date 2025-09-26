# PhotoGalleryPro

## Phase 1: Initial Angular Project Setup
```
# Step 1: Create new Angular project with all features
ng new photo-gallery-pro --routing --style=scss --standalone

# Step 2: Navigate to project directory
cd photo-gallery-pro

# Step 3: Verify basic Angular setup
ng serve
# Should run on http://localhost:4200
```

## Phase 2: Add PWA Support
```
# Step 4: Add PWA capabilities (Service Worker + Manifest)
ng add @angular/pwa

# This command automatically:
# - Installs @angular/service-worker
# - Creates manifest.webmanifest
# - Adds service worker configuration
# - Generates app icons
# - Updates angular.json and index.html
```

## Phase 3: Add Server-Side Rendering(SSR)
```
# Step 5: Add Angular Universal for SSR
ng add @nguniversal/express-engine

# This command automatically:
# - Installs @nguniversal/express-engine
# - Creates server.ts file
# - Adds SSR build scripts to package.json
# - Updates angular.json with server configurations
```


