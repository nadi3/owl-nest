/**
 * @file AudioVisualizerCanvas.tsx
 * @description React Three Fiber canvas for rendering the 3D audio wave.
 * Uses continuous custom BufferGeometries (Ribbons) for a stacked area chart effect.
 * Updated with Dynamic Scaling Engine to prevent clipping and allow organic band growth.
 */

import React, { Suspense, useMemo, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudioVisualizerStore } from '@/store/tools/useAudioVisualizerStore.ts';
import { audioVisualizerService } from '@/services/tools/audioVisualizerService.ts';
import { useTexture } from '@react-three/drei';
import { ArrayBufferTarget, Muxer } from 'mp4-muxer';
import { offlineExportService } from '@/services/tools/offlineExportService.ts';

const SEGMENTS = 64;

/**
 * Creates a custom BufferGeometry for a single ribbon segment of the visualizer.
 * A ribbon is essentially a thin strip made of triangles, which will be manipulated
 * to represent audio frequencies.
 *
 * @param {number} segments - The number of segments to divide the ribbon into.
 * @returns {THREE.BufferGeometry} A BufferGeometry with position and index attributes.
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

/**
 * A component that displays a circular image in the center of the canvas.
 * It handles texture loading and aspect ratio correction to ensure the image
 * is displayed correctly without distortion.
 *
 * @component
 * @param {{url: string}} props - The props for the component.
 * @param {string} props.url - The URL of the image to display.
 * @returns {React.ReactElement} A mesh containing the circular image.
 */
const CenterImage: React.FC<{ url: string }> = ({ url }) => {
  const texture = useTexture(url);
  const { viewport } = useThree();
  const imageRadius = Math.min(viewport.width, viewport.height) * 0.2;

  useEffect(() => {
    if (!texture) return;

    if (texture.image && texture.image instanceof HTMLImageElement) {
      const imageAspect = texture.image.width / texture.image.height;
      if (imageAspect > 1) {
        texture.repeat.set(1 / imageAspect, 1);
        texture.offset.set((1 - 1 / imageAspect) / 2, 0);
      } else {
        texture.repeat.set(1, imageAspect);
        texture.offset.set(0, (1 - imageAspect) / 2);
      }
    }

    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh position={[0, 0, 0]}>
      <circleGeometry args={[imageRadius, 64]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
};

/**
 * The main scene for the audio visualizer.
 * This component is responsible for creating the ribbon geometries and updating them
 * in real-time based on the audio frequency data. It handles both 'line' and 'circle'
 * visualization shapes.
 *
 * @component
 * @returns {React.ReactElement} A group containing the visualizer meshes.
 */
const VisualizerScene: React.FC = () => {
  const { settings, isPlaying, exportStatus } = useAudioVisualizerStore();
  const { viewport } = useThree();

  const smoothedScaleRef = useRef(1);

  const bassGeo = useMemo(() => createRibbonGeometry(SEGMENTS), []);
  const midGeo = useMemo(() => createRibbonGeometry(SEGMENTS), []);
  const trebleGeo = useMemo(() => createRibbonGeometry(SEGMENTS), []);

  useFrame((_state, delta) => {
    const frequencyData = audioVisualizerService.getFrequencyData();
    const isVisualizing = isPlaying || exportStatus !== 'idle';
    if (!isVisualizing || !frequencyData) return;

    const availableWidth = viewport.width * 1.02;
    const spacing = availableWidth / SEGMENTS;
    const circleRadius = Math.min(viewport.width, viewport.height) * 0.2;

    let frameMaxTotal = 0.01;
    const rawIntensities = [];

    for (let i = 0; i <= SEGMENTS; i++) {
      let dataI: number;
      if (settings.shape === 'line' && !settings.mirrorHorizontal) {
        dataI = i;
      } else {
        const halfSegments = SEGMENTS / 2;
        dataI = i <= halfSegments ? i : SEGMENTS - i;
      }

      const ratio = dataI / (settings.mirrorHorizontal ? SEGMENTS / 2 : SEGMENTS);

      const bassIndex = Math.floor(ratio * 2);
      const midIndex = Math.floor(2 + ratio * 21);
      const trebleIndex = Math.floor(23 + ratio * 70);

      const b = (frequencyData[bassIndex] || 0) / 255;
      const m = (frequencyData[midIndex] || 0) / 255;
      const t = (frequencyData[trebleIndex] || 0) / 255;

      const total = b + m + t;
      if (total > frameMaxTotal) frameMaxTotal = total;
      rawIntensities.push({ b, m, t });
    }

    const targetMaxExpansion = viewport.height * 0.25;
    const idealScale = targetMaxExpansion / frameMaxTotal;

    smoothedScaleRef.current = THREE.MathUtils.lerp(
      smoothedScaleRef.current,
      idealScale,
      delta * 3
    );
    const currentScale = smoothedScaleRef.current;

    const bassPos = bassGeo.attributes.position.array as Float32Array;
    const midPos = midGeo.attributes.position.array as Float32Array;
    const treblePos = trebleGeo.attributes.position.array as Float32Array;

    for (let i = 0; i <= SEGMENTS; i++) {
      const { b, m, t } = rawIntensities[i];

      const bassH = b * currentScale + 0.05;
      const midH = m * currentScale + 0.05;
      const trebleH = t * currentScale + 0.05;

      const zOffset = 0;
      let p0x, p0y, p0z, p1x, p1y, p1z, p2x, p2y, p2z, p3x, p3y, p3z;

      if (settings.shape === 'line') {
        const x = (i - SEGMENTS / 2) * spacing;
        p0x = p1x = p2x = p3x = x;
        p0z = p1z = p2z = p3z = zOffset;

        p0y = 0;
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

  const renderRibbons = () => (
    <>
      <mesh geometry={bassGeo}>
        <meshBasicMaterial
          color={settings.bassColor}
          side={THREE.DoubleSide}
          transparent
          opacity={settings.opacity}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={midGeo}>
        <meshBasicMaterial
          color={settings.midColor}
          side={THREE.DoubleSide}
          transparent
          opacity={settings.opacity}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={trebleGeo}>
        <meshBasicMaterial
          color={settings.trebleColor}
          side={THREE.DoubleSide}
          transparent
          opacity={settings.opacity}
          toneMapped={false}
        />
      </mesh>
    </>
  );

  return (
    <group>
      <group>{renderRibbons()}</group>
      {settings.shape === 'line' && settings.mirrorVertical && (
        <group scale={[1, -1, 1]}>{renderRibbons()}</group>
      )}
      {settings.shape === 'line' && settings.showBaseLine && (
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[viewport.width, 0.05]} />
          <meshBasicMaterial color={settings.backgroundColor} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
};

const OfflineExportController: React.FC = () => {
  const { gl, scene, camera, advance } = useThree();
  const { exportStatus, audioFile, setExportStatus, setExportProgress, completeExport } =
    useAudioVisualizerStore();

  useEffect(() => {
    if (exportStatus !== 'analyzing' || !audioFile) return;

    const runExport = async () => {
      try {
        const fps = 60;
        const width = gl.domElement.width;
        const height = gl.domElement.height;

        const target = new ArrayBufferTarget();
        const muxer = new Muxer({
          target: target,
          video: { codec: 'avc', width, height },
          fastStart: 'in-memory',
        });

        const encoder = new VideoEncoder({
          output: (chunk, meta) => muxer.addVideoChunk(chunk, meta as any),
          error: (e) => console.error('Encoder error', e),
        });

        encoder.configure({
          codec: 'avc1.4d002a',
          width,
          height,
          bitrate: 6_000_000,
          framerate: fps,
          avc: { format: 'avc' },
        });

        setExportStatus('analyzing');
        const { framesData, totalFrames } = await offlineExportService.analyzeAudioOffline(
          audioFile,
          fps,
          (p) => setExportProgress(p)
        );
        setExportStatus('rendering');

        for (let i = 0; i < totalFrames; i++) {
          audioVisualizerService.setForcedFrequencyData(framesData[i]);

          const currentTimeInSeconds = i / fps;
          advance(currentTimeInSeconds);

          gl.render(scene, camera);

          const bitmap = await createImageBitmap(gl.domElement);
          const timestamp = Math.round((i * 1e6) / fps);
          const duration = Math.round(1e6 / fps);

          const frame = new VideoFrame(bitmap, { timestamp, duration });
          encoder.encode(frame, { keyFrame: i % 60 === 0 });
          frame.close();

          if (encoder.encodeQueueSize > 10) {
            await new Promise((r) => setTimeout(r, 1));
          }

          if (i % 10 === 0) {
            setExportProgress((i / totalFrames) * 100);
          }
        }

        audioVisualizerService.setForcedFrequencyData(null);
        await encoder.flush();
        muxer.finalize();

        setExportStatus('muxing');
        const mp4Url = await offlineExportService.muxToMp4(target.buffer, audioFile);
        completeExport(mp4Url);
      } catch (e) {
        console.error('Export failed:', e);
        setExportStatus('idle');
      }
    };

    runExport();
  }, [
    exportStatus,
    audioFile,
    gl,
    scene,
    camera,
    advance,
    setExportStatus,
    setExportProgress,
    completeExport,
  ]);

  return null;
};

/**
 * The main canvas component for the audio visualizer.
 * It sets up the React Three Fiber Canvas, manages the background color,
 * and conditionally renders the `VisualizerScene` and the central `CenterImage`
 * based on the current settings from the `useAudioVisualizerStore`.
 *
 * @component
 * @returns {React.ReactElement} The full audio visualizer canvas component.
 */
const AudioVisualizerCanvas: React.FC = () => {
  const settings = useAudioVisualizerStore((state) => state.settings);
  const exportStatus = useAudioVisualizerStore((state) => state.exportStatus);
  const backgroundColor = settings.backgroundColor;
  const imageUrl = settings.customImage || '/logo-owl.png';

  const isExporting = exportStatus !== 'idle';

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
        frameloop={isExporting ? 'never' : 'always'}
      >
        <OfflineExportController />
        <VisualizerScene />
        {settings.shape === 'circle' && settings.showImage && (
          <Suspense fallback={null}>
            <CenterImage url={imageUrl} />
          </Suspense>
        )}
      </Canvas>
    </Box>
  );
};

export default AudioVisualizerCanvas;
