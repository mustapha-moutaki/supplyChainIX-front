import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AuthInterceptor } from './core/interceptors/AuthInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // router provider = routing configuration
    provideClientHydration(withEventReplay()), // ssr hydration provider

    // HttpClient + Interceptor 
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ]
};
