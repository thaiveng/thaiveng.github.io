import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, profile } from '../data/site.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { Button } from './ui/Button.jsx';
import { CloseIcon, MenuIcon } from './ui/Icons.jsx';

const sectionIds = ['home', 'about', 'skills', 'projects', 'music', 'experience', 'contact'];

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

  // lock the page while the mobile sheet is open; Escape closes it
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,border-color,padding] duration-300 ${
        open
          ? 'border-b border-line bg-paper py-3 shadow-paper'
          : scrolled
            ? 'border-b border-line bg-paper/95 py-3'
            : 'border-b border-transparent py-5'
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1240px] items-center justify-between px-4 sm:px-6 md:px-10"
        aria-label="Main"
      >
        {/* brand */}
        <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.firstName} ${profile.lastName} — home`}>
          <span className="grid size-8 place-items-center rounded-[7px] bg-shu font-serif text-[0.8rem] font-semibold text-paper transition-transform duration-300 group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="font-serif text-[1.08rem] text-ink">
            {profile.firstName} <span className="italic text-ink-soft">{profile.lastName}</span>
          </span>
        </a>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative text-[0.9rem] transition-colors duration-200 ${
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-[1.5px] w-full rounded-full bg-shu"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Button href="#contact" size="sm" variant="secondary">
              Say hello
            </Button>
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line-strong bg-card/70 text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto flex max-w-[1240px] flex-col px-4 pb-5 pt-3 sm:px-6 md:px-10">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-dashed border-line-strong py-4 text-ink"
                  >
                    <span className="font-serif text-[1.35rem]">
                      <span className="mr-3 font-mono text-[0.7rem] text-ink-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <Button href="#contact" size="sm" onClick={() => setOpen(false)}>
                  Say hello
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
