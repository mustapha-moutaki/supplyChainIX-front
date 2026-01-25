import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/AuthInterceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { customerReducer } from './features/customer/state/customer.reducer';
import { CustomerEffects } from './features/customer/state/customer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor])
    ),

    
    provideStore({
      customers: customerReducer
    }),
    provideEffects([CustomerEffects])
  ]
};
