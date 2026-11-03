import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Vercel Web Analytics (cookieless) and Speed Insights; in development they only log to the console.
injectAnalytics({ mode: isDevMode() ? 'development' : 'production' });
injectSpeedInsights({ debug: isDevMode() });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
