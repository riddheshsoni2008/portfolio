"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { journey } from "@/data/journey";
import IslandProp from "./IslandProp";

const INK = "#080d18";
const MINT = "#5eead4";
const ISLAND_TOP = 0.3;
const NAV_CLEARANCE = 84;

// Islands rise a little with every step, so the path reads as "levelling up".
const ISLANDS = journey.map((_, i) => new THREE.Vector3(i * 6.5, i * 0.45, Math.sin(i * 1.3) * 2.2));

// The walker's route passes along the front edge of each island.
// getPoint() keeps island i exactly at t = i / (count - 1).
const PATH = new THREE.CatmullRomCurve3(
  ISLANDS.map((p) => new THREE.Vector3(p.x, p.y + ISLAND_TOP, p.z + 0.95)),
  false,
  "catmullrom",
  0.4
);

// Scratch vectors reused every frame.
const _pos = new THREE.Vector3();
const _ahead = new THREE.Vector3();
const _camPos = new THREE.Vector3();
const _lookGoal = new THREE.Vector3();
const _label = new THREE.Vector3();

function Walker({ progressRef }) {
  const group = useRef(null);
  const body = useRef(null);

  useFrame((state, dt) => {
    const t = progressRef.current;
    PATH.getPoint(t, _pos);
    PATH.getPoint(Math.min(t + 0.01, 1), _ahead);

    const g = group.current;
    const gap = g.position.distanceTo(_pos);
    g.position.lerp(_pos, 1 - Math.pow(0.0005, dt));
    if (t < 0.99) g.rotation.y = Math.atan2(_ahead.x - _pos.x, _ahead.z - _pos.z);

    // Hop only while the walker is still catching up with the scroll position.
    const hop = Math.min(gap * 0.5, 0.14);
    body.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 11)) * hop;
  });

  return (
    <group ref={group}>
      <group ref={body}>
        <mesh position={[0, 0.34, 0]}>
          <capsuleGeometry args={[0.17, 0.3, 4, 10]} />
          <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={0.25} flatShading />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.17, 12, 10]} />
          <meshStandardMaterial color="#ffe2c4" flatShading />
        </mesh>
        <mesh position={[0, 0.42, -0.18]}>
          <boxGeometry args={[0.24, 0.3, 0.12]} />
          <meshStandardMaterial color="#f59e0b" flatShading />
        </mesh>
      </group>
      <pointLight position={[0, 1.4, 0.6]} color={MINT} intensity={5} distance={7} />
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
      _label.set(island.x, island.y + 2.6, island.z).project(state.camera);
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
      <mesh>
        <cylinderGeometry args={[1.85, 1.4, 0.6, 18]} />
        <meshStandardMaterial color={active ? "#233a63" : "#1a2740"} flatShading />
      </mesh>
      <mesh position={[0, -0.85, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.4, 1.1, 18]} />
        <meshStandardMaterial color="#111a2c" flatShading />
      </mesh>
      <mesh position={[0, ISLAND_TOP + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.62, 1.74, 48]} />
        <meshBasicMaterial color={MINT} transparent opacity={active ? 0.95 : 0.2} />
      </mesh>

      <group position={[0, ISLAND_TOP, -0.35]}>
        <IslandProp kind={stage.prop} />
      </group>
    </group>
  );
}

export default function JourneyScene({ progressRef, introRef, labelsRef, active, running }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 36, near: 0.1, far: 120 }}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[INK]} />
      <fog attach="fog" args={[INK, 20, 58]} />

      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#9fd8ff", "#0b1220", 0.6]} />
      <directionalLight position={[6, 12, 8]} intensity={1.7} />

      <mesh>
        <tubeGeometry args={[PATH, 220, 0.035, 6, false]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.6} />
      </mesh>

      {ISLANDS.map((position, index) => (
        <Island
          key={journey[index].id}
          index={index}
          position={position}
          active={index === active}
        />
      ))}

      <Walker progressRef={progressRef} />
      <CameraRig progressRef={progressRef} introRef={introRef} />
      <LabelProjector labelsRef={labelsRef} />

      <Sparkles count={90} scale={[62, 12, 16]} position={[22, 4, -2]} size={2.2} speed={0.25} color={MINT} opacity={0.45} />
    </Canvas>
  );
}
