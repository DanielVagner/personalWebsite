import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Coverage } from './components/Coverage';
import { AngularSection } from './components/AngularSection';
import { Clients } from './components/Clients';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CV } from './components/CV';
import { ThemeProvider } from './providers/theme-provider';

function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Coverage />
        <AngularSection />
        <Clients />
        <Work />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const { i18n } = useTranslation();

  // Keep <html lang> honest — screen readers and search engines both read it.
  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('cs') ? 'cs' : 'en';
  }, [i18n.language]);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
