import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Courier New' }}>
      <div className={`menu ${menuOpen ? '' : 'hidden'}`}>
        <div className="menu-button" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col space-y-2">
            <a href="#home">Home</a>
            <a href="#about">About Me</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
          </div>
          <div className="flex justify-center mb-2">
            <button onClick={toggleDarkMode} className="p-2 text-current rounded hover:bg-opacity-10 hover:bg-white">
              <img src={darkMode ? "/night_mode.png" : "/light_mode.png"} alt="Dark Mode Toggle" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
      <main className="flex-grow">{children}</main>
      <footer className="p-4 text-center relative z-30 mt-auto">
        @ Jackson Vondemkamp | Video material provided by <a href="https://www.hikingfex.com/videos" className="underline">HikingFex.com</a>
      </footer>
    </div>
  );
}
