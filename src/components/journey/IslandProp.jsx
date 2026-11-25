"use client";

import { Float } from "@react-three/drei";

const MINT = "#5eead4";
const AMBER = "#fbbf24";

// Small models built from basic shapes. Each one sits on an island, with y = 0 at ground level.
function Laptop() {
  return (
    <group>
      <mesh position={[0, 0.04, 0.1]}>
        <boxGeometry args={[1, 0.07, 0.65]} />
        <meshStandardMaterial color="#3b4a66" flatShading />
      </mesh>
      <group position={[0, 0.07, -0.22]} rotation={[-0.25, 0, 0]}>
        <mesh position={[0, 0.34, 0]}>
          <boxGeometry args={[1, 0.68, 0.05]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        <mesh position={[0, 0.34, 0.03]}>
          <planeGeometry args={[0.88, 0.56]} />
          <meshStandardMaterial color="#0b1220" emissive={MINT} emissiveIntensity={0.35} />
        </mesh>
        {[0.16, 0.04, -0.08].map((y, i) => (
          <mesh key={y} position={[-0.12 + i * 0.06, 0.34 + y, 0.035]}>
            <planeGeometry args={[0.5 - i * 0.12, 0.05]} />
            <meshBasicMaterial color={i === 1 ? AMBER : MINT} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Stumps() {
  return (
    <group>
      {[-0.16, 0, 0.16].map((x) => (
        <mesh key={x} position={[x, 0.45, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
          <meshStandardMaterial color="#f5d38a" flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[0.42, 0.04, 0.05]} />
        <meshStandardMaterial color="#f5d38a" flatShading />
      </mesh>
      <mesh position={[0.55, 0.13, 0.25]}>
        <icosahedronGeometry args={[0.13, 1]} />
        <meshStandardMaterial color="#ef4444" flatShading />
      </mesh>
      <mesh position={[-0.55, 0.42, 0.15]} rotation={[0, 0.4, -0.5]}>
        <boxGeometry args={[0.14, 0.85, 0.05]} />
        <meshStandardMaterial color="#d6a85c" flatShading />
      </mesh>
    </group>
  );
}

function Office() {
  const windows = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      windows.push([(col - 1) * 0.28, 0.32 + row * 0.36, (row + col) % 3 === 0]);
    }
  }
  return (
    <group>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1, 1.7, 0.75]} />
        <meshStandardMaterial color="#24395c" flatShading />
      </mesh>
      {windows.map(([x, y, lit]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.38]}>
          <planeGeometry args={[0.16, 0.2]} />
          <meshStandardMaterial color="#0b1220" emissive={lit ? AMBER : MINT} emissiveIntensity={lit ? 1.1 : 0.45} />
        </mesh>
      ))}
      <mesh position={[0, 1.74, 0]}>
        <boxGeometry args={[1.1, 0.08, 0.85]} />
        <meshStandardMaterial color="#31507f" flatShading />
      </mesh>
    </group>
  );
}

function Wallet() {
  return (
    <group>
      <group position={[0, 0.42, 0]} rotation={[0, -0.3, 0.08]}>
        <mesh>
          <boxGeometry args={[0.95, 0.62, 0.16]} />
          <meshStandardMaterial color="#7c3aed" flatShading />
        </mesh>
        <mesh position={[0.1, 0.22, -0.02]} rotation={[0, 0, 0.12]}>
          <boxGeometry args={[0.7, 0.45, 0.03]} />
          <meshStandardMaterial color={MINT} flatShading />
        </mesh>
        <mesh position={[0.3, 0, 0.09]}>
          <boxGeometry args={[0.22, 0.2, 0.04]} />
          <meshStandardMaterial color="#a78bfa" flatShading />
        </mesh>
      </group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.72, 0.04 + i * 0.07, 0.3]}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 12]} />
          <meshStandardMaterial color={AMBER} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Books() {
  const stack = [
    { color: "#38bdf8", w: 0.95, rot: 0.1 },
    { color: "#fb7185", w: 0.85, rot: -0.2 },
    { color: AMBER, w: 0.75, rot: 0.25 },
  ];
  return (
    <group>
      {stack.map((book, i) => (
        <mesh key={book.color} position={[0, 0.09 + i * 0.18, 0]} rotation={[0, book.rot, 0]}>
          <boxGeometry args={[book.w, 0.16, 0.62]} />
          <meshStandardMaterial color={book.color} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.78, 0]} rotation={[0, 0.6, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.6]} />
        <meshStandardMaterial color="#1e293b" flatShading />
      </mesh>
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.16, 8]} />
        <meshStandardMaterial color="#1e293b" flatShading />
      </mesh>
    </group>
  );
}

function Document() {
  return (
    <group position={[0, 0.62, 0]} rotation={[-0.12, -0.25, 0]}>
      <mesh>
        <boxGeometry args={[0.8, 1.05, 0.04]} />
        <meshStandardMaterial color="#e2e8f0" flatShading />
      </mesh>
      {[0.3, 0.14, -0.02, -0.18, -0.34].map((y, i) => (
        <mesh key={y} position={[i === 0 ? -0.12 : 0, y, 0.025]}>
          <planeGeometry args={[i === 0 ? 0.36 : 0.6, i === 0 ? 0.09 : 0.05]} />
          <meshBasicMaterial color={i === 0 ? "#0f172a" : "#94a3b8"} />
        </mesh>
      ))}
      <mesh position={[0.32, 0.44, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.05, 16]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Shop() {
  return (
    <group>
      <mesh position={[0, 0.4, -0.05]}>
        <boxGeometry args={[1.35, 0.8, 0.8]} />
        <meshStandardMaterial color="#24395c" flatShading />
      </mesh>
      {[-2, -1, 0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 0.28, 0.86, 0.42]} rotation={[0.45, 0, 0]}>
          <boxGeometry args={[0.28, 0.06, 0.5]} />
          <meshStandardMaterial color={i % 2 === 0 ? MINT : "#e2e8f0"} flatShading />
        </mesh>
      ))}
      <mesh position={[-0.32, 0.3, 0.36]}>
        <planeGeometry args={[0.32, 0.58]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
      <mesh position={[0.3, 0.42, 0.36]}>
        <planeGeometry args={[0.5, 0.34]} />
        <meshStandardMaterial color="#0b1220" emissive={AMBER} emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 1.2, -0.05]}>
        <boxGeometry args={[0.8, 0.26, 0.08]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.5} flatShading />
      </mesh>
    </group>
  );
}

function Portal() {
  return (
    <group position={[0, 0.95, 0]}>
      <mesh>
        <torusGeometry args={[0.75, 0.09, 10, 40]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={1.4} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.18} side={2} />
      </mesh>
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

export default function IslandProp({ kind }) {
  const Model = PROPS[kind];
  if (!Model) return null;
  return (
    <Float speed={2} rotationIntensity={0.12} floatIntensity={0.25} floatingRange={[0.02, 0.14]}>
      <Model />
    </Float>
  );
}
