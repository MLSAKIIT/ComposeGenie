import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const moveBubbleTo = (el: HTMLElement | null) => {
    const container = navContainerRef.current;
    if (!container || !el) return setBubbleStyle((s) => ({ ...s, opacity: 0 }));
    const cRect = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const left = r.left - cRect.left - 6; // small padding
    const width = r.width + 12; // small padding
    setBubbleStyle({ left, width, opacity: 1 });
  };

  useEffect(() => {
    // Find and track the active link after navigation
    const container = navContainerRef.current;
    if (container) {
      const activeLink = container.querySelector(
        'a[aria-current="page"]'
      ) as HTMLAnchorElement;
      if (activeLink) {
        activeRef.current = activeLink;
        moveBubbleTo(activeLink);
      }
    }
  }, [location.pathname]); // Only run when route changes

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-link-base ${
      isActive ? "navbar-link-active" : "navbar-link-inactive"
    }`;

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/catalog", label: "Catalog" },
    { to: "/templates", label: "Templates" },
    { to: "/security", label: "Security" },
  ];

  return (
    <nav className="navbar-container">
      {/* Tech-style background layers */}
      <div aria-hidden={true} className="navbar-bg-overlay">
        {/* Subtle grid */}
        <div className="navbar-grid-pattern" />
        {/* Radial glow accents */}
        <div className="navbar-glow-left" />
        <div className="navbar-glow-right" />
      </div>

      <div className="navbar-content">
        <div className="navbar-grid">
          {/* Left: Brand */}
          <div className="navbar-brand-container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-brand-link">
                <span>ComposeGenie</span>
              </Link>
            </div>
          </div>
          {/* Center: Nav links (desktop) */}
          <div className="navbar-links-container">
            <div
              className="navbar-links-wrapper"
              ref={navContainerRef}
              onMouseLeave={() => moveBubbleTo(activeRef.current)}
            >
              {/* Animated bubble */}
              <span
                className="navbar-bubble"
                style={{
                  left: bubbleStyle.left,
                  width: bubbleStyle.width,
                  opacity: bubbleStyle.opacity,
                }}
              />
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={(args) => getNavClass(args)}
                  onMouseEnter={(e) => moveBubbleTo(e.currentTarget)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          {/* Right: Mobile menu button */}
          <div className="navbar-mobile-button-container">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar-mobile-button"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="navbar-mobile-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="navbar-mobile-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "navbar-mobile-link-active"
                    : "navbar-mobile-link-inactive"
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
