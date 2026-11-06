import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import MusicSection from './components/MusicSection.jsx';
import Portfolio from './components/Portfolio.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

/** Hairline progress bar pinned above the nav. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-gradient-to-r from-cyber via-violet to-amber"
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  const finishLoading = useCallback(() => setLoading(false), []);

  // hold the page still while the loader is up, and start at the top on reload
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={finishLoading} />}</AnimatePresence>

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[140] focus:bg-cyber focus:px-4 focus:py-2 focus:font-mono focus:text-[0.75rem] focus:text-ink"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: loading ? 0 : 0.15 }}
        className="relative"
      >
        <Hero />

        <Divider />
        <About />

        <Divider />
        <MusicSection />

        <Divider />
        <Portfolio />

        <Divider />
        <Contact />
      </motion.main>

      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div className="relative z-10 mx-auto max-w-[1120px] px-6 md:px-10" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />
    </div>
  );
}
