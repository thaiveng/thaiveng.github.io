import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, profile } from '../data/site.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { Button } from './ui/Button.jsx';
import { CloseIcon, MenuIcon } from './ui/Icons.jsx';

const sectionIds = ['home', 'about', 'music', 'portfolio', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock the page while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[120] transition-all duration-300 ${
        scrolled ? 'glass border-b py-3' : 'border-b border-transparent py-5'
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1240px] items-center justify-between px-6 md:px-10"
        aria-label="Main"
      >
        {/* brand */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-display text-[0.95rem] font-semibold tracking-tight text-chalk"
        >
          <span className="grid size-7 place-items-center bg-cyber font-mono text-[0.7rem] font-bold text-ink transition-transform duration-300 group-hover:rotate-[8deg]">
            {profile.initials}
          </span>
          {profile.brand.replace('Dev', '')}
          <span className="text-cyber">Dev</span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative font-mono text-[0.74rem] uppercase tracking-[0.14em] transition-colors duration-200 ${
                    isActive ? 'text-cyber' : 'text-ash hover:text-chalk'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 h-px w-full bg-cyber"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* wrapper owns the responsive display so it can't fight the
              button's own inline-flex */}
          <span className="hidden sm:block">
            <Button href="#contact" size="sm">
              Contact Me
            </Button>
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center border border-hairline text-chalk md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden border-t md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-hairline/60 py-3.5 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-ash"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <Button href="#contact" size="sm" onClick={() => setOpen(false)}>
                  Contact Me
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
