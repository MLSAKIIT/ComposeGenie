import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleStyle, setBubbleStyle] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);

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

  const linkBase =
    "relative z-10 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-indigo-500 after:transition-all after:duration-300 after:content-[''] after:hidden md:after:block";
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? "text-white after:w-full after:opacity-100" : "text-gray-300 hover:text-white after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-100"}`;

  const moveBubbleTo = (el: HTMLElement | null) => {
    const container = navContainerRef.current;
    if (!container || !el) return setBubbleStyle((s) => ({ ...s, opacity: 0 }));
    const cRect = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const left = r.left - cRect.left - 6; // small padding
    const width = r.width + 12; // small padding
    setBubbleStyle({ left, width, opacity: 1 });
  };

  return (
    <nav className="sticky top-0 z-50 relative overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-black/90 text-white backdrop-blur border-b border-white/10">
      {/* Tech-style background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "top left",
          }}
        />
        {/* Radial glow accents */}
        <div className="absolute -top-16 left-24 h-40 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-3rem] right-[-2rem] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
                <span>ComposeGenie</span>
              </Link>
            </div>
          </div>
          {/* Center: Nav links (desktop) */}
          <div className="hidden md:block">
            <div
              className="relative mx-auto flex items-baseline justify-center gap-1"
              ref={navContainerRef}
              onMouseLeave={() => moveBubbleTo(activeRef.current)}
            >
                {/* Animated bubble */}
                <span
                  className="absolute top-1/2 -translate-y-1/2 h-8 rounded-md bg-white/10 blur-[0.2px] transition-all duration-300 ease-out pointer-events-none"
                  style={{ left: bubbleStyle.left, width: bubbleStyle.width, opacity: bubbleStyle.opacity }}
                />

                <NavLink
                  to="/dashboard"
                  className={(args) => {
                    const cls = getNavClass(args);
                    return cls;
                  }}
                  onMouseEnter={(e) => moveBubbleTo(e.currentTarget)}
                  ref={(el) => {
                    if (el && el.getAttribute("aria-current") === "page") {
                      activeRef.current = el;
                      moveBubbleTo(el);
                    }
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/catalog"
                  className={(args) => getNavClass(args)}
                  onMouseEnter={(e) => moveBubbleTo(e.currentTarget)}
                  ref={(el) => {
                    if (el && el.getAttribute("aria-current") === "page") {
                      activeRef.current = el;
                      moveBubbleTo(el);
                    }
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Catalog
                </NavLink>
                <NavLink
                  to="/templates"
                  className={(args) => getNavClass(args)}
                  onMouseEnter={(e) => moveBubbleTo(e.currentTarget)}
                  ref={(el) => {
                    if (el && el.getAttribute("aria-current") === "page") {
                      activeRef.current = el;
                      moveBubbleTo(el);
                    }
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Templates
                </NavLink>
                <NavLink
                  to="/security"
                  className={(args) => getNavClass(args)}
                  onMouseEnter={(e) => moveBubbleTo(e.currentTarget)}
                  ref={(el) => {
                    if (el && el.getAttribute("aria-current") === "page") {
                      activeRef.current = el;
                      moveBubbleTo(el);
                    }
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  Security
                </NavLink>
            </div>
          </div>
          {/* Right: Mobile menu button */}
          <div className="col-start-3 justify-self-end md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
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
                  className="block h-6 w-6"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/dashboard" className={({ isActive }) => `${isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/catalog" className={({ isActive }) => `${isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setIsOpen(false)}>
              Catalog
            </NavLink>
            <NavLink to="/templates" className={({ isActive }) => `${isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setIsOpen(false)}>
              Templates
            </NavLink>
            <NavLink to="/security" className={({ isActive }) => `${isActive ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/10"} block px-3 py-2 rounded-md text-base font-medium`} onClick={() => setIsOpen(false)}>
              Security
            </NavLink>
          </div>
          {/* Mobile user profile section removed */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
