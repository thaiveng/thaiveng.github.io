import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import MusicSection from './components/MusicSection.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

/** Hairline of vermilion ink across the top, tracking reading progress. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-shu/80"
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  // hold the page still while the loader is up
  useEffect(() => {
    if (!loading) return;
    document.body.style.overflow = 'hidden';
    if (!window.location.hash) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  // honour a deep link like /#projects once the page is visible
  useEffect(() => {
    if (loading || !window.location.hash) return;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={finishLoading} />}</AnimatePresence>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[0.85rem] focus:text-paper"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.7, delay: loading ? 0 : 0.05 }}
        className="relative"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <MusicSection />
        <Experience />
        <Contact />
      </motion.main>

      <Footer />
    </>
  );
}
