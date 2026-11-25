"use client";

import * as THREE from "three";

export const INK = "#080d18";
export const MINT = "#5eead4";
export const AMBER = "#fbbf24";

// Colours brighter than 1 are what the bloom pass picks up and turns into glow.
export const glow = (hex, strength = 2) => new THREE.Color(hex).multiplyScalar(strength);
export const MINT_GLOW = glow(MINT, 2.4);
export const MINT_SOFT = glow(MINT, 0.55);
export const AMBER_GLOW = glow(AMBER, 2.2);
export const WHITE_GLOW = glow("#ffffff", 2);
export const RED_GLOW = glow("#fb7185", 2.6);

// Smooth, slightly lacquered surface that catches the studio reflections.
export function Glossy({ color, metalness = 0.15, roughness = 0.32, ...rest }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
      clearcoat={0.7}
      clearcoatRoughness={0.25}
      envMapIntensity={1.1}
      {...rest}
    />
  );
}

// Unlit, self-coloured surface for screens, windows and light strips.
export function Glow({ color = MINT_GLOW, ...rest }) {
  return <meshBasicMaterial color={color} toneMapped={false} {...rest} />;
}

let haloTexture;
function getHaloTexture() {
  if (!haloTexture) {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.35, "rgba(255,255,255,0.35)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    haloTexture = new THREE.CanvasTexture(canvas);
  }
  return haloTexture;
}

// Soft round light blob: used under islands, behind the portal and far in the background.
export function Halo({ size = 4, color = MINT, opacity = 0.5, fog = true, ...rest }) {
  return (
    <mesh {...rest}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={getHaloTexture()}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        fog={fog}
      />
    </mesh>
  );
}

// Soft dark blob that grounds an object on its island.
export function BlobShadow({ size = 1, opacity = 0.45, ...rest }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...rest}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={getHaloTexture()} color="#000000" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}
