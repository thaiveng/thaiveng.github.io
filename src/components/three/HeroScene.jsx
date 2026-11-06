import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingCore } from './FloatingCore.jsx';
import { ParticleField } from './ParticleField.jsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js';

/**
 * The hero's WebGL layer. Deliberately cheap: no shadow maps, no HDRI, no
 * post-processing, dpr capped at 1.6, and the loop pauses when the canvas
 * scrolls out of view (`frameloop="demand"` is avoided because the scene is
 * continuously animated — instead R3F's default visibility handling plus the
 * clamp in each useFrame keeps it honest).
 */
export default function HeroScene({ pointer }) {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      // the canvas is decoration; the content behind it stays reachable
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 9, 20]} />

      <ambientLight intensity={0.28} />
      {/* key */}
      <directionalLight position={[6, 7, 5]} intensity={2.4} color="#d8f6ff" />
      {/* rim — sits behind the object and draws its silhouette */}
      <directionalLight position={[-4, 2, -6]} intensity={3.2} color="#00e5ff" />
      <pointLight position={[-5, -3, -2]} intensity={40} color="#a78bfa" distance={16} />
      <pointLight position={[4, -4, 3]} intensity={24} color="#ffb347" distance={13} />

      <Suspense fallback={null}>
        <FloatingCore pointer={pointer} reduced={reduced} />
        <ParticleField pointer={pointer} reduced={reduced} count={reduced ? 260 : 900} />
      </Suspense>
    </Canvas>
  );
}
