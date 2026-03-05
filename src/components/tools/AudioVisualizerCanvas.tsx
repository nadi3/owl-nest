/**
 * @file AudioVisualizerCanvas.tsx
 * @description React Three Fiber canvas for rendering the 3D audio wave.
 * Uses an InstancedMesh to efficiently render multiple frequency bars.
 * Fully responsive to viewport dimensions.
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudioVisualizerStore } from '@/store/tools/useAudioVisualizerStore.ts';

const NUM_BARS = 90;
const BARS_PER_BAND = NUM_BARS / 3;

const VisualizerScene: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { settings, isPlaying } = useAudioVisualizerStore();

  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObject = useMemo(() => new THREE.Color(), []);
  const baseGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const baseMaterial = useMemo(() => new THREE.MeshBasicMaterial({ toneMapped: false }), []);

  // Update colors when settings change
  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < NUM_BARS; i++) {
      let hexColor = settings.bassColor;
      if (i >= BARS_PER_BAND && i < BARS_PER_BAND * 2) {
        hexColor = settings.midColor;
      } else if (i >= BARS_PER_BAND * 2) {
        hexColor = settings.trebleColor;
      }

      colorObject.set(hexColor);
      meshRef.current.setColorAt(i, colorObject);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [settings.bassColor, settings.midColor, settings.trebleColor, colorObject]);

  // Rendering loop
  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Responsive elements
    const availableWidth = viewport.width * 0.9;
    const spacing = availableWidth / NUM_BARS;
    const barThickness = spacing * 0.7;
    const circleRadius = Math.min(viewport.width, viewport.height) * 0.35;
    const maxAmplitude = viewport.height * 0.25;

    for (let i = 0; i < NUM_BARS; i++) {
      const simulatedFrequency = isPlaying
        ? Math.abs(Math.sin(time * 2 + i * 0.1)) * maxAmplitude + 0.1
        : 0.1;

      const scaleY = simulatedFrequency;

      if (settings.shape === 'line') {
        const x = (i - NUM_BARS / 2) * spacing;

        dummy.position.set(x, 0, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(barThickness, scaleY, barThickness);
      } else if (settings.shape === 'circle') {
        const angle = (i / NUM_BARS) * Math.PI * 2;

        dummy.position.set(Math.cos(angle) * circleRadius, Math.sin(angle) * circleRadius, 0);
        dummy.rotation.set(0, 0, angle + Math.PI / 2);
        dummy.scale.set(barThickness, scaleY, barThickness);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[baseGeometry, baseMaterial, NUM_BARS]} />;
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
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <VisualizerScene />
      </Canvas>
    </Box>
  );
};

export default AudioVisualizerCanvas;
