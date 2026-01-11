import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// Added 'withFetch' to the imports
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { AuthInterceptor } from './core/interceptors/AuthInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimizes performance by grouping events together
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configures the application routes defined in app.routes.ts
    provideRouter(routes), 

    // Enables Server-Side Rendering (SSR) hydration for better performance
    provideClientHydration(withEventReplay()), 
    
    // Configures how the app handles HTTP requests
    provideHttpClient(
      // Enables modern Fetch API (Fixes NG02801 warning and improves SSR performance)
      withFetch(), 
      
      // Plugs in the AuthInterceptor to automatically add tokens to outgoing requests
      withInterceptors([AuthInterceptor])
    )
  ]
};