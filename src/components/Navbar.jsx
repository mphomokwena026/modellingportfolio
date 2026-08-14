import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isOpen]);

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <a href="#cover" className="nav-logo" aria-label="Mpho Mokwena home">
          MM
        </a>

        <button
          className={`menu-button ${isOpen ? 'open' : ''}`}
          id="menuButton"
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="navLinks"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#featured" onClick={closeMenu}>
              Shoots
            </a>
          </li>
          <li>
            <a href="#gallery" onClick={closeMenu}>
              Gallery
            </a>
          </li>
          <li>
            <a href="#services" onClick={closeMenu}>
              Work with me
            </a>
          </li>
          <li>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
