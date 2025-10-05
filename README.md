# 📸 Photo Gallery Application

A modern, feature-rich photo gallery built with Angular 17+, showcasing advanced frontend development concepts including signals, reactive programming, and component architecture.

![Angular](https://img.shields.io/badge/Angular-17+-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.0+-purple?style=flat-square&logo=reactivex)
![Signals](https://img.shields.io/badge/Signals-Enabled-green?style=flat-square)

<img width="946" height="496" alt="image" src="https://github.com/user-attachments/assets/a7770dae-33e1-4ebd-919c-7eca60d7c2ad" />


---

## 🚀 Project Overview

A responsive photo gallery application that fetches images from an external API, with features including search, infinite scroll, favorites management, and detailed photo viewing. Built as a learning project to master modern Angular patterns and best practices.

**Live Demo:** [Live](https://photo-gallery-rho-gray.vercel.app/)
<br>
**Repository:** [GitHub link](https://github.com/pk170970/photo-gallery)

---

## ✨ Key Features

### 📋 Core Functionality
- **Dynamic Photo Loading:** Fetch photos from Picsum Photos API with pagination
- **Infinite Scroll:** Load more photos automatically as user scrolls
- **Search Functionality:** Real-time search with debouncing (500ms delay)
- **Photo Details Modal:** View full-size images with metadata and navigation
- **Favorites System:** Like/unlike photos with persistent storage
- **Filter by Favorites:** Toggle between all photos and favorites only
- **Responsive Grid Layout:** Adaptive CSS Grid (1-4 columns based on screen size)

### 💡 User Experience
- **Optimistic UI Updates:** Instant feedback on all interactions
- **Error Handling:** Graceful degradation with retry mechanisms
- **Loading States:** Clear indicators for data fetching
- **Empty States:** Helpful messages when no content available
- **Keyboard Navigation:** Arrow keys in modal for photo browsing
- **Accessibility:** Semantic HTML and ARIA labels

### 💾 Data Persistence
- **LocalStorage Integration:** Favorites survive browser refresh
- **Merged State Management:** User preferences merged with API data
- **Efficient Storage:** Only stores liked photo IDs (lightweight)

---

## 🛠️ Technologies & Concepts

### Angular 17+ Features
- **Standalone Components:** No NgModules, simplified architecture
- **Signals API:** Reactive state management without RxJS boilerplate
  - `signal()` - Writable reactive state
  - `computed()` - Derived reactive values
  - `effect()` - Side effects on signal changes
- **New Control Flow:** `@if`, `@for`, `@else` syntax
- **Signal Inputs:** `input.required<T>()` for component inputs
- **Signal Outputs:** `output<T>()` for event emission

### Core Angular Concepts Covered
1. **Component Architecture**
   - Smart vs Presentational components
   - Component communication (inputs/outputs)
   - Lifecycle hooks (ngOnInit, OnDestroy)
   - ViewChild for DOM access

2. **Services & Dependency Injection**
   - `inject()` function for field-level DI
   - Singleton services with `providedIn: 'root'`
   - Service composition and delegation pattern
   - HTTP client integration

3. **Reactive Programming**
   - RxJS Observables, Operators, and Subjects
   - Operators: `map`, `tap`, `catchError`, `debounceTime`, `distinctUntilChanged`
   - Signal-based reactivity vs Observable patterns
   - Async pipe for template subscriptions

4. **State Management**
   - Centralized state with PhotoService
   - Immutable state updates with signals
   - Computed values for derived state
   - LocalStorage persistence strategy

5. **Forms & User Input**
   - Template-driven search with reactive updates
   - Input debouncing for performance
   - Form state management with signals

6. **HTTP & API Integration**
   - HttpClient for REST API calls
   - Error handling with catchError
   - Retry logic and timeout strategies
   - Response transformation and mapping

7. **Styling & Responsive Design**
   - SCSS/SASS with component-scoped styles
   - CSS Grid and Flexbox layouts
   - Media queries for responsive breakpoints
   - CSS transitions and animations

---

## 📁 Project Structure

### Main Folders

- **src/app/components/** - UI Components
  - `photo-card/` - Individual photo card display component
  - `photo-dialog/` - Modal for detailed photo view
  - `search-photo/` - Search input with debouncing

- **src/app/services/** - Business Logic
  - `photo.service.ts` - Photo data management and API calls
  - `like.service.ts` - Favorites/likes management

- **src/app/models/** - TypeScript Interfaces
  - `photo.interface.ts` - Photo and ApiPhoto types

- **Root Components**
  - `app.component.ts` - Main application component
  - `app.html` - Main template
  - `app.scss` - Global styles

### Key Files

- `package.json` - Dependencies and scripts
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
