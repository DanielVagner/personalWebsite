import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { inject as injectAnalytics } from '@vercel/analytics';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Vercel Web Analytics (cookieless); in development it only logs to the console.
injectAnalytics({ mode: isDevMode() ? 'development' : 'production' });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
