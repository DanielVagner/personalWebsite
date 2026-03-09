import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>© {currentYear} Software Architect Portfolio.</span>
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>using React & TypeScript</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#home" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#home" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
