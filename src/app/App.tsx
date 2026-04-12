import { Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CV } from './components/CV';
import { ThemeProvider } from './providers/theme-provider';

function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Skills />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
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
