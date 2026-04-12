export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span>© {currentYear} Daniel Vágner</span>

          <a
            href="https://github.com/DanielVagner/personalWebsite"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Source Code
          </a>
        </div>
      </div>
    </footer>
  );
}
