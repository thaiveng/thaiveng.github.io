import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Depth dust. Built once into a plain BufferGeometry — no per-frame
 * allocation, no drei dependency, ~1 draw call.
 */
export function ParticleField({ count = 900, reduced = false, pointer }) {
  const points = useRef(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      // distribute in a hollow sphere so the centre stays readable
      const r = 4.5 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 0.028 + 0.008;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const d = Math.min(delta, 0.1);
    if (!reduced) points.current.rotation.y += d * 0.022;
    const { x, y } = pointer.current;
    points.current.rotation.z = THREE.MathUtils.damp(points.current.rotation.z, x * 0.08, 1.6, d);
    points.current.position.y = THREE.MathUtils.damp(points.current.position.y, y * -0.3, 1.6, d);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#9fd7ff"
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
