import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, Github, Linkedin, ShieldAlert, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active hash based on scroll position
      const sections = navLinks.map(link => document.querySelector(link.href)).filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        if (section.offsetTop <= scrollPosition) {
          setActiveHash(`#${section.id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveHash(href);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-card-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="flex items-center gap-2 group relative z-10">
          <Terminal className="text-primary group-hover:text-accent transition-colors" size={26} />
          <span className="font-mono font-bold text-xl tracking-tight hidden sm:block">nchedo<span className="text-primary">.dev</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeHash === link.href ? "text-primary" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {activeHash === link.href && (
                    <motion.div layoutId="navIndicator" className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-primary rounded-full" />
                  )}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Resume
              </a>
            </li>
          </ul>
          
          <div className="flex items-center gap-4 pl-8 border-l border-card-border">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://github.com/Nchennaji" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/nchedo-nnaji/" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </a>
            <Link to="/admin/login" className="text-muted hover:text-primary transition-colors flex items-center gap-1">
              <ShieldAlert size={20} />
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle & Actions */}
        <div className="flex items-center gap-4 lg:hidden relative z-10">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-0 left-0 w-full bg-background border-b border-card-border pt-24 px-6 flex flex-col lg:hidden"
          >
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`block text-2xl font-bold transition-colors ${
                      activeHash === link.href ? "text-primary" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="block text-2xl font-bold text-muted hover:text-foreground transition-colors"
                >
                  Resume
                </a>
              </li>
            </ul>
            
            <div className="mt-12 pt-8 border-t border-card-border grid grid-cols-4 gap-4 max-w-sm">
              <a href="https://github.com/Nchennaji" target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-card rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/nchedo-nnaji/" target="_blank" rel="noreferrer" className="flex items-center justify-center p-4 bg-card rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <Link to="/admin/login" className="flex items-center justify-center p-4 bg-card rounded-xl text-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                <ShieldAlert size={24} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
