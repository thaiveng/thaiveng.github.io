import { useEffect, useRef } from 'react';

/**
 * Pointer position in normalised device coords (-1 → 1 on both axes), kept in
 * a ref so the 3D scene can read it every frame without re-rendering React.
 * Falls back to device orientation on touch screens where there is no cursor.
 */
export function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onTouch = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      pointer.current.x = (t.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((t.clientY / window.innerHeight) * 2 - 1);
    };

    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return pointer;
}
