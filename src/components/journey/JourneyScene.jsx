"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox, Sparkles, Stars } from "@react-three/drei";
import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { journey } from "@/data/journey";
import IslandProp from "./IslandProp";
import { AMBER, BlobShadow, Glossy, Glow, Halo, INK, MINT, MINT_GLOW, MINT_SOFT, WHITE_GLOW } from "./sceneKit";

const ISLAND_TOP = 0.3;
const NAV_CLEARANCE = 72;
// Taller models push their name tag higher so it never covers them.
const LABEL_HEIGHT = { office: 3.3, shop: 3.1, portal: 3 };

// Islands rise a little with every step, so the path reads as "levelling up".
const ISLANDS = journey.map((_, i) => new THREE.Vector3(i * 6.5, i * 0.45, Math.sin(i * 1.3) * 2.2));

// The walker's route crosses the front-left of each island; the model stands back-right.
// getPoint() keeps island i exactly at t = i / (count - 1).
const PATH = new THREE.CatmullRomCurve3(
  ISLANDS.map((p) => new THREE.Vector3(p.x - 0.6, p.y + ISLAND_TOP, p.z + 0.75)),
  false,
  "catmullrom",
  0.4
);

// Low-poly rock that hangs under every island, shared by all of them.
const ROCK_GEOMETRY = new THREE.LatheGeometry(
  [
    [0.02, -2.1],
    [0.4, -1.6],
    [0.95, -1.0],
    [1.5, -0.5],
    [1.82, -0.12],
    [1.9, 0.1],
  ].map(([radius, y]) => new THREE.Vector2(radius, y)),
  9
);

// Scratch vectors reused every frame.
const _pos = new THREE.Vector3();
const _ahead = new THREE.Vector3();
const _prev = new THREE.Vector3();
const _camPos = new THREE.Vector3();
const _lookGoal = new THREE.Vector3();
const _label = new THREE.Vector3();

function Limb({ limbRef, position, radius, length, color }) {
  return (
    <group ref={limbRef} position={position}>
      <mesh position={[0, -length / 2 - radius * 0.4, 0]}>
        <capsuleGeometry args={[radius, length, 6, 12]} />
        <Glossy color={color} />
      </mesh>
    </group>
  );
}

function Walker({ progressRef }) {
  const group = useRef(null);
  const body = useRef(null);
  const legL = useRef(null);
  const legR = useRef(null);
  const armL = useRef(null);
  const armR = useRef(null);
  const motion = useRef({ ready: false, stride: 0, energy: 0 });

  useFrame((state, dt) => {
    const t = progressRef.current;
    PATH.getPoint(t, _pos);
    PATH.getPoint(Math.min(t + 0.01, 1), _ahead);

    const g = group.current;
    const m = motion.current;
    if (!m.ready) {
      g.position.copy(_pos);
      m.ready = true;
    }

    _prev.copy(g.position);
    g.position.lerp(_pos, 1 - Math.pow(0.0005, dt));
    const moved = g.position.distanceTo(_prev);
    const speed = Math.min(moved / Math.max(dt, 0.001) / 2.5, 1);
    m.stride += moved * 8;
    m.energy = THREE.MathUtils.damp(m.energy, speed, 8, dt);

    // Face the way it walks (either direction), and turn to the viewer when it stops.
    let heading = 0.55;
    if (speed > 0.04) {
      heading = Math.atan2(_ahead.x - _pos.x, _ahead.z - _pos.z);
      if (g.position.x > _pos.x) heading += Math.PI;
    }
    const turn = Math.atan2(Math.sin(heading - g.rotation.y), Math.cos(heading - g.rotation.y));
    g.rotation.y += turn * (1 - Math.exp(-9 * dt));

    const swing = Math.sin(m.stride) * 0.85 * m.energy;
    legL.current.rotation.x = swing;
    legR.current.rotation.x = -swing;
    armL.current.rotation.x = -swing * 0.8;
    armR.current.rotation.x = swing * 0.8;
    body.current.position.y =
      Math.abs(Math.sin(m.stride)) * 0.05 * m.energy + Math.sin(state.clock.elapsedTime * 2.2) * 0.012;
  });

  return (
    <group ref={group}>
      <BlobShadow size={0.9} opacity={0.5} position={[0, 0.012, 0]} />
      <group ref={body}>
        <Limb limbRef={legL} position={[-0.09, 0.22, 0]} radius={0.06} length={0.1} color="#1e293b" />
        <Limb limbRef={legR} position={[0.09, 0.22, 0]} radius={0.06} length={0.1} color="#1e293b" />

        {/* Body, with a lit chest strip */}
        <mesh position={[0, 0.47, 0]}>
          <capsuleGeometry args={[0.19, 0.2, 10, 24]} />
          <Glossy color="#f1f5f9" roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.5, 0.185]}>
          <planeGeometry args={[0.14, 0.035]} />
          <Glow color={MINT_GLOW} />
        </mesh>
        <RoundedBox args={[0.27, 0.3, 0.14]} radius={0.05} smoothness={4} position={[0, 0.5, -0.2]}>
          <Glossy color={AMBER} roughness={0.35} />
        </RoundedBox>

        <Limb limbRef={armL} position={[-0.235, 0.58, 0]} radius={0.05} length={0.14} color="#f1f5f9" />
        <Limb limbRef={armR} position={[0.235, 0.58, 0]} radius={0.05} length={0.14} color="#f1f5f9" />

        {/* Helmet, visor and eyes */}
        <mesh position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.215, 32, 24]} />
          <Glossy color="#f8fafc" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.92, 0.075]} scale={[1, 0.72, 0.8]}>
          <sphereGeometry args={[0.185, 32, 24]} />
          <meshPhysicalMaterial color="#0b1220" metalness={0.9} roughness={0.08} clearcoat={1} envMapIntensity={1.6} />
        </mesh>
        {[-0.065, 0.065].map((x) => (
          <mesh key={x} position={[x, 0.925, 0.222]} scale={[1, 1.5, 0.5]}>
            <sphereGeometry args={[0.022, 12, 10]} />
            <Glow color={MINT_GLOW} />
          </mesh>
        ))}
        <mesh position={[0.1, 1.17, -0.03]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.01, 0.01, 0.16, 6]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.12, 1.26, -0.03]}>
          <sphereGeometry args={[0.03, 12, 10]} />
          <Glow color={MINT_GLOW} />
        </mesh>
      </group>
      <pointLight position={[0, 1.3, 0.8]} color={MINT} intensity={4} distance={6} />
    </group>
  );
}

function CameraRig({ progressRef, introRef }) {
  const look = useRef(null);

  useFrame((state, dt) => {
    PATH.getPoint(progressRef.current, _pos);
    const narrow = state.size.width / state.size.height < 0.9;
    // 0 while the hero text is up (scene sits high, out of its way), 1 once the walk starts.
    const walk = introRef.current;

    if (narrow) {
      // Phones: pull back and look below the walker, so the scene sits above the caption card.
      _camPos.set(_pos.x + 0.5, _pos.y + 5.5, _pos.z + 19);
      _lookGoal.set(_pos.x + 0.5, _pos.y - 3.2 + walk * 1.4, _pos.z);
    } else {
      _camPos.set(_pos.x + 2.5, _pos.y + 5, _pos.z + 16 - walk * 2.5);
      _lookGoal.set(_pos.x + 4 - walk * 0.8, _pos.y - 1.8 + walk * 1.5, _pos.z);
    }

    if (!look.current) {
      look.current = _lookGoal.clone();
      state.camera.position.copy(_camPos);
    } else {
      const ease = 1 - Math.pow(0.02, dt);
      state.camera.position.lerp(_camPos, ease);
      look.current.lerp(_lookGoal, ease);
    }
    state.camera.lookAt(look.current);
  });

  return null;
}

// Moves the HTML label buttons (rendered by JourneyIntro) so each one floats above its island.
function LabelProjector({ labelsRef }) {
  useFrame((state) => {
    ISLANDS.forEach((island, index) => {
      const el = labelsRef.current[index];
      if (!el) return;
      const height = LABEL_HEIGHT[journey[index].prop] ?? 2.4;
      _label.set(island.x, island.y + height, island.z).project(state.camera);
      const x = (_label.x * 0.5 + 0.5) * state.size.width;
      const y = (-_label.y * 0.5 + 0.5) * state.size.height;
      // Hide tags that are off screen or would slide under the navbar.
      const onScreen = _label.z < 1 && Math.abs(_label.x) < 1.2 && y > NAV_CLEARANCE;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      el.style.visibility = onScreen ? "visible" : "hidden";
    });
  });

  return null;
}

function Island({ index, position, active }) {
  const stage = journey[index];
  return (
    <group position={position}>
      {/* Polished deck with a rounded rim */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.24, 64]} />
        <Glossy color={active ? "#1c3460" : "#16233d"} metalness={0.55} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.12, 16, 72]} />
        <Glossy color="#22365c" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Light ring: bright on the island the walker has reached */}
      <mesh position={[0, ISLAND_TOP + 0.012, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.028, 10, 96]} />
        <Glow color={active ? MINT_GLOW : MINT_SOFT} />
      </mesh>
      <mesh position={[0, ISLAND_TOP + 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.18, 1.2, 64]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.18} />
      </mesh>

      <mesh geometry={ROCK_GEOMETRY} rotation={[0, index * 1.7, 0]}>
        <meshStandardMaterial color="#121c31" roughness={0.85} metalness={0.1} flatShading />
      </mesh>
      <Halo size={5.5} opacity={active ? 0.34 : 0.13} position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* Loose shards drifting under the island */}
      <Float speed={1.4} rotationIntensity={1} floatIntensity={0.6}>
        <mesh position={[1.7, -1.1, 0.6]} scale={0.22}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#1b2a47" roughness={0.6} flatShading />
        </mesh>
        <mesh position={[-1.5, -1.5, -0.4]} scale={0.15}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#1b2a47" roughness={0.6} flatShading />
        </mesh>
      </Float>

      <group position={[0.45, ISLAND_TOP, -0.4]}>
        <IslandProp kind={stage.prop} />
      </group>
    </group>
  );
}

// Light beads that run along the path towards the next island.
const PULSES = [0, 1, 2, 3, 4, 5, 6, 7];
function PathPulses() {
  const beads = useRef([]);

  useFrame((state) => {
    beads.current.forEach((bead, index) => {
      if (!bead) return;
      const t = (state.clock.elapsedTime * 0.035 + index / PULSES.length) % 1;
      PATH.getPoint(t, bead.position);
    });
  });

  return PULSES.map((index) => (
    <mesh
      key={index}
      ref={(mesh) => {
        beads.current[index] = mesh;
      }}
    >
      <sphereGeometry args={[0.07, 12, 10]} />
      <Glow color={WHITE_GLOW} />
    </mesh>
  ));
}

export default function JourneyScene({ progressRef, introRef, labelsRef, active, running }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 36, near: 0.1, far: 160 }}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 20, 58]} />

      {/* Studio panels that only exist as reflections, so glossy surfaces have something to shine with */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#b8fff2" position={[0, 7, -6]} scale={[16, 6, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[-7, 3, 4]} rotation={[0, Math.PI / 2, 0]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ffd27a" position={[7, 2, 4]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={4} color={MINT} position={[0, 9, 3]} rotation={[Math.PI / 2, 0, 0]} scale={4} />
      </Environment>

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 12, 8]} intensity={1.5} color="#fff4e0" />
      <directionalLight position={[-8, 4, -6]} intensity={0.8} color={MINT} />

      {/* Far-off colour washes and stars */}
      <Halo size={46} color={MINT} opacity={0.1} fog={false} position={[6, 5, -26]} />
      <Halo size={52} color="#8b5cf6" opacity={0.1} fog={false} position={[30, 9, -28]} />
      <Halo size={40} color={AMBER} opacity={0.05} fog={false} position={[48, 4, -24]} />
      <Stars radius={90} depth={40} count={1400} factor={3.2} saturation={0} fade speed={0.6} />

      <mesh>
        <tubeGeometry args={[PATH, 260, 0.03, 8, false]} />
        <Glow color={MINT_SOFT} transparent opacity={0.85} />
      </mesh>
      <PathPulses />

      {ISLANDS.map((position, index) => (
        <Island key={journey[index].id} index={index} position={position} active={index === active} />
      ))}

      <Walker progressRef={progressRef} />
      <CameraRig progressRef={progressRef} introRef={introRef} />
      <LabelProjector labelsRef={labelsRef} />

      <Sparkles count={110} scale={[64, 12, 16]} position={[22, 4, -2]} size={2.4} speed={0.25} color={MINT} opacity={0.5} />

      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={1} luminanceSmoothing={0.15} radius={0.72} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
