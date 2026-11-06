import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The hero's centrepiece: a distorting icosahedron inside two counter-rotating
 * wireframe shells with a pair of orbital rings. Everything leans toward the
 * pointer with a damped follow, so the object feels weighted rather than glued
 * to the cursor.
 *
 * On wide screens it sits in the right-hand third, clear of the headline; on
 * narrow ones it recentres and shrinks so it reads as a backdrop, not clutter.
 */
export function FloatingCore({ pointer, reduced = false }) {
  const core = useRef(null);
  const shell = useRef(null);
  const innerShell = useRef(null);
  const rings = useRef(null);
  const group = useRef(null);

  const { viewport } = useThree();
  const wide = viewport.width > 9;

  const anchor = useMemo(
    () => (wide ? [viewport.width * 0.21, 0.1, 0] : [0, 0.35, -1.2]),
    [wide, viewport.width]
  );
  const scale = wide ? 1 : 0.78;

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1); // clamp after a tab-switch stall
    const { x, y } = pointer.current;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.5, 3.2, d);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.4, 3.2, d);
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        anchor[0] + x * 0.4,
        2.4,
        d
      );
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        anchor[1] + y * 0.3,
        2.4,
        d
      );
    }

    if (reduced) return;

    const t = state.clock.elapsedTime;
    if (core.current) core.current.rotation.y = t * 0.16;
    if (shell.current) {
      shell.current.rotation.y = -t * 0.13;
      shell.current.rotation.z = t * 0.05;
    }
    if (innerShell.current) innerShell.current.rotation.x = t * 0.2;
    if (rings.current) {
      rings.current.rotation.z = t * 0.08;
      rings.current.rotation.x = Math.sin(t * 0.25) * 0.14;
    }
  });

  return (
    <group ref={group} position={anchor} scale={scale}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.85}
      >
        {/* inner body — dark and glassy so the rim light does the drawing */}
        <mesh ref={core}>
          <icosahedronGeometry args={[1.22, 14]} />
          <MeshDistortMaterial
            color="#0c2c3f"
            emissive="#0bb9d8"
            emissiveIntensity={0.3}
            roughness={0.24}
            /* kept well below 1: without an environment map a fully metallic
               surface has nothing to reflect and renders as a flat silhouette */
            metalness={0.38}
            clearcoat={1}
            clearcoatRoughness={0.25}
            distort={reduced ? 0 : 0.36}
            speed={1.4}
          />
        </mesh>

        {/* faceted inner cage */}
        <mesh ref={innerShell} scale={1.17}>
          <icosahedronGeometry args={[1.22, 0]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.32} />
        </mesh>

        {/* outer shell */}
        <mesh ref={shell} scale={1.62}>
          <icosahedronGeometry args={[1.22, 1]} />
          <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.13} />
        </mesh>

        {/* orbital rings */}
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2.5, 0, 0.32]}>
            <torusGeometry args={[2.1, 0.012, 8, 160]} />
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.62} />
          </mesh>
          <mesh rotation={[Math.PI / 1.85, 0.55, 0]}>
            <torusGeometry args={[2.5, 0.008, 8, 160]} />
            <meshBasicMaterial color="#ffb347" transparent opacity={0.42} />
          </mesh>
          {/* a single bright node riding the inner ring */}
          <mesh position={[2.1, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
