// نص ثلاثي أبعاد حقيقي (three.js) — وجه أحمر لامع + حواف ذهبية + إضاءة. يشتغل لأي كلمة، ثابت، $0.
import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig, staticFile, useCurrentFrame } from "remotion";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const Text3DMesh = ({ word, fontUrl, fitW = 8.4, fitH = 2.7 }) => {
  const isTTF = fontUrl.endsWith(".ttf");
  const loaded = useLoader(isTTF ? TTFLoader : FontLoader, staticFile(fontUrl));
  const font = useMemo(() => (isTTF ? new Font(loaded) : loaded), [loaded, isTTF]);
  const { geo, scale } = useMemo(() => {
    const g = new TextGeometry(word, {
      font, size: 1, height: 0.34, curveSegments: 12,
      bevelEnabled: true, bevelThickness: 0.09, bevelSize: 0.055, bevelSegments: 5,
    });
    g.computeBoundingBox();
    const bb = g.boundingBox;
    const w = bb.max.x - bb.min.x, h = bb.max.y - bb.min.y;
    g.center();
    const s = Math.min(fitW / w, fitH / h);
    return { geo: g, scale: s };
  }, [font, word, fitW, fitH]);

  // مادتان: [0] الوجه أحمر لامع (كلير-كوت) · [1] الحواف/العمق ذهبي
  const faceMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#E60000", metalness: 0.15, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12,
  }), []);
  const sideMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#FFC21E", metalness: 0.7, roughness: 0.3,
  }), []);

  return <mesh geometry={geo} material={[faceMat, sideMat]} scale={[scale, scale, scale]} rotation={[0, 0, 0.03]} />;
};

export const Word3D = ({ word = "LOGO?", fontUrl = "fonts/LuckiestGuy.ttf" }) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas width={width} height={height} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 6], fov: 32 }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[-3, 5, 6]} intensity={2.2} />
      <directionalLight position={[4, -2, 4]} intensity={0.8} color="#FFDCA0" />
      <pointLight position={[0, 3, 5]} intensity={30} />
      <spotLight position={[5, 6, 8]} intensity={40} angle={0.6} penumbra={0.6} />
      <Text3DMesh word={word} fontUrl={fontUrl} />
    </ThreeCanvas>
  );
};
