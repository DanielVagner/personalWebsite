import { Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-xs text-zinc-600">
          © {currentYear} Daniel Vágner · Built with React & TypeScript
        </span>
        <a
          href="https://github.com/DanielVagner/personalWebsite"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-400 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          Source Code
        </a>
      </div>
    </footer>
  );
}
