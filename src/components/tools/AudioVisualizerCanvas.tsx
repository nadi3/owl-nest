/**
 * @file AudioVisualizerCanvas.tsx
 * @description React Three Fiber canvas for rendering the 3D audio wave.
 * Uses continuous custom BufferGeometries (Ribbons) for a stacked area chart effect.
 */

import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudioVisualizerStore } from '@/store/tools/useAudioVisualizerStore.ts';
import { audioVisualizerService } from '@/services/tools/audioVisualizerService.ts';

const SEGMENTS = 64;

/**
 * Utilitaire pour créer une géométrie de "Ruban" vide (un long rectangle composé de triangles).
 * Il possède SEGMENTS + 1 points en bas, et SEGMENTS + 1 points en haut.
 */
const createRibbonGeometry = (segments: number) => {
  const pts = segments + 1;
  const positions = new Float32Array(pts * 2 * 3);
  const indices = [];

  for (let i = 0; i < segments; i++) {
    const v1 = i * 2;
    const v2 = i * 2 + 1;
    const v3 = (i + 1) * 2;
    const v4 = (i + 1) * 2 + 1;

    indices.push(v1, v2, v3, v2, v4, v3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
};

const VisualizerScene: React.FC = () => {
  const { settings, isPlaying } = useAudioVisualizerStore();
  const { viewport } = useThree();

  const bassGeo = useMemo(() => createRibbonGeometry(SEGMENTS), []);
  const midGeo = useMemo(() => createRibbonGeometry(SEGMENTS), []);
  const trebleGeo = useMemo(() => createRibbonGeometry(SEGMENTS), []);

  useFrame(() => {
    const frequencyData = audioVisualizerService.getFrequencyData();

    const availableWidth = viewport.width * 0.9;
    const spacing = availableWidth / SEGMENTS;
    const circleRadius = Math.min(viewport.width, viewport.height) * 0.2;
    const maxAmplitude = viewport.height * 0.15;

    const bassPos = bassGeo.attributes.position.array as Float32Array;
    const midPos = midGeo.attributes.position.array as Float32Array;
    const treblePos = trebleGeo.attributes.position.array as Float32Array;

    for (let i = 0; i <= SEGMENTS; i++) {
      const halfSegments = SEGMENTS / 2;
      const dataI = i <= halfSegments ? i : SEGMENTS - i;

      let bassH = 0.05,
        midH = 0.05,
        trebleH = 0.05;

      if (isPlaying && frequencyData) {
        const bassIndex = Math.floor(dataI * 0.3);
        const midIndex = Math.floor(20 + dataI * 0.6);
        const trebleIndex = Math.floor(60 + dataI * 0.8);

        bassH = (frequencyData[bassIndex] / 255) * maxAmplitude + 0.05;
        midH = (frequencyData[midIndex] / 255) * maxAmplitude + 0.05;
        trebleH = (frequencyData[trebleIndex] / 255) * maxAmplitude + 0.05;
      }

      const zOffset = 0;

      let p0x, p0y, p0z;
      let p1x, p1y, p1z;
      let p2x, p2y, p2z;
      let p3x, p3y, p3z;

      if (settings.shape === 'line') {
        const x = (i - SEGMENTS / 2) * spacing;
        p0x = p1x = p2x = p3x = x;
        p0z = p1z = p2z = p3z = zOffset;

        p0y = -viewport.height * 0.2;
        p1y = p0y + bassH;
        p2y = p1y + midH;
        p3y = p2y + trebleH;
      } else {
        const angle = (i / SEGMENTS) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const r0 = circleRadius;
        const r1 = r0 + bassH;
        const r2 = r1 + midH;
        const r3 = r2 + trebleH;

        p0x = cos * r0;
        p0y = sin * r0;
        p0z = zOffset;
        p1x = cos * r1;
        p1y = sin * r1;
        p1z = zOffset;
        p2x = cos * r2;
        p2y = sin * r2;
        p2z = zOffset;
        p3x = cos * r3;
        p3y = sin * r3;
        p3z = zOffset;
      }

      const innerIdx = i * 2 * 3;
      const outerIdx = (i * 2 + 1) * 3;

      bassPos[innerIdx] = p0x;
      bassPos[innerIdx + 1] = p0y;
      bassPos[innerIdx + 2] = p0z;
      bassPos[outerIdx] = p1x;
      bassPos[outerIdx + 1] = p1y;
      bassPos[outerIdx + 2] = p1z;

      midPos[innerIdx] = p1x;
      midPos[innerIdx + 1] = p1y;
      midPos[innerIdx + 2] = p1z;
      midPos[outerIdx] = p2x;
      midPos[outerIdx + 1] = p2y;
      midPos[outerIdx + 2] = p2z;

      treblePos[innerIdx] = p2x;
      treblePos[innerIdx + 1] = p2y;
      treblePos[innerIdx + 2] = p2z;
      treblePos[outerIdx] = p3x;
      treblePos[outerIdx + 1] = p3y;
      treblePos[outerIdx + 2] = p3z;
    }

    bassGeo.attributes.position.needsUpdate = true;
    midGeo.attributes.position.needsUpdate = true;
    trebleGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={bassGeo}>
        <meshBasicMaterial
          color={settings.bassColor}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={midGeo}>
        <meshBasicMaterial
          color={settings.midColor}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={trebleGeo}>
        <meshBasicMaterial
          color={settings.trebleColor}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

const AudioVisualizerCanvas: React.FC = () => {
  const backgroundColor = useAudioVisualizerStore((state) => state.settings.backgroundColor);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Canvas camera={{ position: [0, 0, 25], fov: 50 }}>
        <VisualizerScene />
      </Canvas>
    </Box>
  );
};

export default AudioVisualizerCanvas;
