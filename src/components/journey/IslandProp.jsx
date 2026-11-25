"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { AMBER, AMBER_GLOW, BlobShadow, Glossy, Glow, Halo, MINT, MINT_GLOW, RED_GLOW, WHITE_GLOW } from "./sceneKit";

// Small models built from rounded shapes. Each one sits on an island, with y = 0 at ground level.
function Laptop() {
  return (
    <group rotation={[0, -0.35, 0]}>
      <RoundedBox args={[1.15, 0.07, 0.75]} radius={0.03} smoothness={4} position={[0, 0.04, 0.12]}>
        <Glossy color="#c7d2e3" metalness={0.8} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0.08, 0.14]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.95, 0.42]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      <group position={[0, 0.07, -0.24]} rotation={[-0.28, 0, 0]}>
        <RoundedBox args={[1.15, 0.78, 0.05]} radius={0.03} smoothness={4} position={[0, 0.39, 0]}>
          <Glossy color="#c7d2e3" metalness={0.8} roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0.39, 0.027]}>
          <planeGeometry args={[1.03, 0.66]} />
          <meshStandardMaterial color="#061018" roughness={0.2} />
        </mesh>
        {[
          [0.2, 0.5, MINT_GLOW],
          [0.09, 0.72, WHITE_GLOW],
          [-0.02, 0.4, AMBER_GLOW],
          [-0.13, 0.62, MINT_GLOW],
          [-0.24, 0.3, WHITE_GLOW],
        ].map(([y, width, color], i) => (
          <mesh key={y} position={[-0.42 + width / 2 + (i % 2) * 0.08, 0.39 + y, 0.03]}>
            <planeGeometry args={[width, 0.045]} />
            <Glow color={color} />
          </mesh>
        ))}
      </group>
      <Halo size={2.4} opacity={0.35} position={[0, 0.5, 0.2]} />
    </group>
  );
}

function Stumps() {
  return (
    <group>
      {[-0.17, 0, 0.17].map((x) => (
        <mesh key={x} position={[x, 0.5, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 1, 16]} />
          <Glossy color="#f1cf8b" roughness={0.4} />
        </mesh>
      ))}
      {[-0.085, 0.085].map((x) => (
        <mesh key={x} position={[x, 1.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.028, 0.12, 4, 10]} />
          <Glossy color="#e0b563" roughness={0.4} />
        </mesh>
      ))}
      <group position={[-0.62, 0, 0.2]} rotation={[0.1, 0.5, -0.38]}>
        <RoundedBox args={[0.2, 0.78, 0.07]} radius={0.03} smoothness={4} position={[0, 0.42, 0]}>
          <Glossy color="#e8c27a" roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.36, 12]} />
          <Glossy color="#1e293b" roughness={0.6} />
        </mesh>
      </group>
      <group position={[0.6, 0.15, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.15, 24, 18]} />
          <Glossy color="#dc2626" roughness={0.3} />
        </mesh>
        <mesh rotation={[0.4, 0, 0.3]}>
          <torusGeometry args={[0.15, 0.008, 6, 32]} />
          <meshStandardMaterial color="#fecaca" />
        </mesh>
      </group>
      <BlobShadow size={0.6} position={[0.6, 0.01, 0.3]} />
    </group>
  );
}

function Office() {
  const windows = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      windows.push([(col - 1) * 0.3, 0.34 + row * 0.33, (row * 2 + col) % 4 === 0]);
    }
  }
  return (
    <group rotation={[0, -0.3, 0]}>
      <RoundedBox args={[1.15, 2, 0.85]} radius={0.06} smoothness={4} position={[0, 1, 0]}>
        <Glossy color="#1d3557" metalness={0.5} roughness={0.25} />
      </RoundedBox>
      {windows.map(([x, y, warm]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.43]}>
          <planeGeometry args={[0.2, 0.2]} />
          <Glow color={warm ? AMBER_GLOW : MINT_GLOW} />
        </mesh>
      ))}
      {windows.slice(0, 10).map(([, y], i) => (
        <mesh key={`side-${i}`} position={[0.58, y, (i % 2 === 0 ? -1 : 1) * 0.18]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.2, 0.2]} />
          <Glow color={i % 3 === 0 ? AMBER_GLOW : MINT_GLOW} />
        </mesh>
      ))}
      <RoundedBox args={[1.25, 0.1, 0.95]} radius={0.04} smoothness={4} position={[0, 2.03, 0]}>
        <Glossy color="#2b4a78" metalness={0.5} />
      </RoundedBox>
      <mesh position={[0.3, 2.35, -0.15]}>
        <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, 2.65, -0.15]}>
        <sphereGeometry args={[0.045, 12, 10]} />
        <Glow color={RED_GLOW} />
      </mesh>
    </group>
  );
}

function Wallet() {
  return (
    <group>
      <group position={[0, 0.5, 0]} rotation={[0, -0.35, 0.08]}>
        <RoundedBox args={[1.1, 0.72, 0.2]} radius={0.08} smoothness={5}>
          <Glossy color="#7c3aed" roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[0.82, 0.52, 0.035]} radius={0.015} smoothness={4} position={[0.08, 0.27, -0.03]} rotation={[0, 0, 0.12]}>
          <Glossy color={MINT} metalness={0.4} roughness={0.2} emissive={MINT} emissiveIntensity={0.25} />
        </RoundedBox>
        <RoundedBox args={[0.3, 0.26, 0.06]} radius={0.03} smoothness={4} position={[0.38, 0, 0.1]}>
          <Glossy color="#a78bfa" />
        </RoundedBox>
        <mesh position={[0.38, 0, 0.14]}>
          <sphereGeometry args={[0.045, 12, 10]} />
          <Glossy color={AMBER} metalness={1} roughness={0.2} />
        </mesh>
      </group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0.85 + (i % 2) * 0.03, 0.045 + i * 0.085, 0.35]}>
          <cylinderGeometry args={[0.2, 0.2, 0.07, 28]} />
          <Glossy color={AMBER} metalness={1} roughness={0.22} />
        </mesh>
      ))}
      <mesh position={[0.4, 0.2, 0.62]} rotation={[Math.PI / 2, 0, 0.4]}>
        <cylinderGeometry args={[0.2, 0.2, 0.07, 28]} />
        <Glossy color={AMBER} metalness={1} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Books() {
  const stack = [
    { color: "#38bdf8", w: 1.1, rot: 0.1 },
    { color: "#fb7185", w: 1, rot: -0.2 },
    { color: AMBER, w: 0.88, rot: 0.25 },
  ];
  return (
    <group>
      {stack.map((book, i) => (
        <group key={book.color} position={[0, 0.11 + i * 0.21, 0]} rotation={[0, book.rot, 0]}>
          <RoundedBox args={[book.w, 0.19, 0.72]} radius={0.035} smoothness={4}>
            <Glossy color={book.color} roughness={0.4} />
          </RoundedBox>
          <mesh position={[0.02, 0, 0.365]}>
            <planeGeometry args={[book.w - 0.1, 0.12]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
        </group>
      ))}
      <group position={[0, 0.82, 0]} rotation={[0, 0.6, 0.06]}>
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.24, 0.28, 0.18, 24]} />
          <Glossy color="#0f172a" roughness={0.5} />
        </mesh>
        <RoundedBox args={[0.74, 0.05, 0.74]} radius={0.02} smoothness={4} position={[0, 0.03, 0]}>
          <Glossy color="#0f172a" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0.3, -0.08, 0.3]}>
          <cylinderGeometry args={[0.012, 0.012, 0.24, 6]} />
          <Glow color={AMBER_GLOW} />
        </mesh>
      </group>
    </group>
  );
}

function Document() {
  return (
    <group position={[0, 0.72, 0]} rotation={[-0.12, -0.3, 0]}>
      <RoundedBox args={[0.92, 1.2, 0.05]} radius={0.025} smoothness={4}>
        <Glossy color="#f1f5f9" roughness={0.5} clearcoat={0.2} />
      </RoundedBox>
      {[0.34, 0.16, 0.04, -0.08, -0.2, -0.38].map((y, i) => (
        <mesh key={y} position={[i === 0 ? -0.16 : i === 5 ? -0.1 : 0, y, 0.03]}>
          <planeGeometry args={[i === 0 ? 0.38 : i === 5 ? 0.5 : 0.7, i === 0 ? 0.1 : 0.05]} />
          <meshBasicMaterial color={i === 0 ? "#0f172a" : "#94a3b8"} />
        </mesh>
      ))}
      {/* ATS score badge */}
      <group position={[0.38, 0.52, 0.08]}>
        <mesh>
          <torusGeometry args={[0.2, 0.035, 12, 40]} />
          <Glow color={MINT_GLOW} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.17, 32]} />
          <meshStandardMaterial color="#061018" roughness={0.3} />
        </mesh>
        <mesh position={[-0.03, -0.02, 0.01]} rotation={[0, 0, -0.75]}>
          <planeGeometry args={[0.04, 0.11]} />
          <Glow color={MINT_GLOW} />
        </mesh>
        <mesh position={[0.045, 0.02, 0.01]} rotation={[0, 0, 0.6]}>
          <planeGeometry args={[0.04, 0.2]} />
          <Glow color={MINT_GLOW} />
        </mesh>
      </group>
    </group>
  );
}

function Shop() {
  const gem = useRef(null);
  useFrame((state) => {
    gem.current.rotation.y = state.clock.elapsedTime * 1.2;
  });

  return (
    <group rotation={[0, -0.3, 0]}>
      <RoundedBox args={[1.6, 0.95, 0.95]} radius={0.06} smoothness={4} position={[0, 0.48, -0.05]}>
        <Glossy color="#1d3557" metalness={0.4} roughness={0.3} />
      </RoundedBox>
      {[-2, -1, 0, 1, 2].map((i) => (
        <RoundedBox key={i} args={[0.33, 0.07, 0.58]} radius={0.03} smoothness={3} position={[i * 0.33, 1.02, 0.5]} rotation={[0.45, 0, 0]}>
          <Glossy color={i % 2 === 0 ? MINT : "#f8fafc"} roughness={0.35} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.36, 0.66, 0.04]} radius={0.02} smoothness={3} position={[-0.42, 0.34, 0.43]}>
        <Glossy color="#0b1220" metalness={0.6} roughness={0.2} />
      </RoundedBox>
      <mesh position={[-0.3, 0.34, 0.46]}>
        <sphereGeometry args={[0.025, 10, 8]} />
        <Glossy color={AMBER} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0.32, 0.46, 0.43]}>
        <planeGeometry args={[0.62, 0.42]} />
        <Glow color={AMBER_GLOW} />
      </mesh>
      <RoundedBox args={[1, 0.3, 0.1]} radius={0.04} smoothness={3} position={[0, 1.42, -0.05]}>
        <Glossy color="#0b1220" roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 1.42, 0.005]}>
        <planeGeometry args={[0.84, 0.16]} />
        <Glow color={AMBER_GLOW} />
      </mesh>
      {/* The jewel the shop sells */}
      <group position={[0, 2.05, -0.05]}>
        <mesh ref={gem} scale={[1, 1.3, 1]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshPhysicalMaterial color={MINT} metalness={0.9} roughness={0.05} emissive={MINT} emissiveIntensity={0.8} flatShading />
        </mesh>
        <Halo size={1.6} opacity={0.6} />
      </group>
    </group>
  );
}

function Portal() {
  const swirl = useRef(null);
  const orbit = useRef(null);
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    swirl.current.rotation.z = time * 0.6;
    orbit.current.rotation.z = -time * 0.9;
  });

  return (
    <group position={[0, 1.2, 0]} rotation={[0, -0.25, 0]}>
      <mesh>
        <torusGeometry args={[0.95, 0.1, 20, 80]} />
        <Glow color={MINT_GLOW} />
      </mesh>
      <mesh ref={swirl}>
        <ringGeometry args={[0.2, 0.86, 48, 1, 0, Math.PI * 1.6]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.28} side={2} toneMapped={false} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.86, 48]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.12} side={2} />
      </mesh>
      <group ref={orbit}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI * 2) / 3) * 1.25, Math.sin((i * Math.PI * 2) / 3) * 1.25, 0]}>
            <sphereGeometry args={[0.05, 10, 8]} />
            <Glow color={i === 0 ? AMBER_GLOW : WHITE_GLOW} />
          </mesh>
        ))}
      </group>
      <Halo size={5} opacity={0.55} position={[0, 0, -0.1]} />
      {[-0.85, 0.85].map((x) => (
        <RoundedBox key={x} args={[0.3, 0.26, 0.4]} radius={0.05} smoothness={3} position={[x, -1.08, 0]}>
          <Glossy color="#1d3557" metalness={0.5} />
        </RoundedBox>
      ))}
    </group>
  );
}

const PROPS = {
  laptop: Laptop,
  stumps: Stumps,
  office: Office,
  wallet: Wallet,
  books: Books,
  document: Document,
  shop: Shop,
  portal: Portal,
};

// These stand on the ground; the rest hover a little.
const GROUNDED = new Set(["office", "shop", "stumps", "portal"]);

export default function IslandProp({ kind }) {
  const Model = PROPS[kind];
  if (!Model) return null;
  if (GROUNDED.has(kind)) return <Model />;
  return (
    <>
      <BlobShadow size={1.8} opacity={0.4} position={[0, 0.01, 0]} />
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3} floatingRange={[0.06, 0.2]}>
        <Model />
      </Float>
    </>
  );
}
