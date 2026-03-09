import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import type { BoundingBox, DetectedFace } from '@/types/tools/anonymizer.ts';

let detector: faceDetection.FaceDetector | null = null;

const loadModel = async () => {
  await tf.ready();

  if (!detector) {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig: faceDetection.MediaPipeFaceDetectorTfjsModelConfig = {
      runtime: 'tfjs',
      maxFaces: 100,
      modelType: 'full',
    };

    detector = await faceDetection.createDetector(model, detectorConfig);
  }
  return detector;
};

const calculateIoU = (box1: BoundingBox, box2: BoundingBox): number => {
  const xA = Math.max(box1.x, box2.x);
  const yA = Math.max(box1.y, box2.y);
  const xB = Math.min(box1.x + box1.width, box2.x + box2.width);
  const yB = Math.min(box1.y + box1.height, box2.y + box2.height);

  const intersectionArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  const box1Area = box1.width * box1.height;
  const box2Area = box2.width * box2.height;

  return intersectionArea / (box1Area + box2Area - intersectionArea);
};

const analyzeCanvas = async (
  canvas: HTMLCanvasElement,
  originalImage: HTMLImageElement,
  offsetX: number,
  offsetY: number,
  scaleX: number,
  scaleY: number
): Promise<DetectedFace[]> => {
  if (!detector) return [];

  const predictions = await detector.estimateFaces(canvas);
  const faces: DetectedFace[] = [];

  const thumbCanvas = document.createElement('canvas');
  const thumbCtx = thumbCanvas.getContext('2d');
  if (!thumbCtx) return [];

  for (const element of predictions) {
    const { xMin, yMin, width: faceW, height: faceH } = element.box;

    // Reparametrize to original image coordinates
    const rawX = xMin * scaleX + offsetX;
    const rawY = yMin * scaleY + offsetY;
    const rawW = faceW * scaleX;
    const rawH = faceH * scaleY;

    // Add margin to capture more of the face and avoid tight cropping, especially for smaller faces
    const margin = rawW * 0.2;
    const x = Math.max(0, rawX - margin);
    const y = Math.max(0, rawY - margin);
    const w = Math.min(originalImage.naturalWidth - x, rawW + margin * 2);
    const h = Math.min(originalImage.naturalHeight - y, rawH + margin * 2);

    // Ignore false detections
    if (w < 10 || h < 10) continue;

    thumbCanvas.width = w;
    thumbCanvas.height = h;
    thumbCtx.drawImage(originalImage, x, y, w, h, 0, 0, w, h);

    faces.push({
      id: `face-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      box: { x, y, width: w, height: h },
      isBlurred: true,
      thumbnailDataUrl: thumbCanvas.toDataURL('image/jpeg', 0.8),
    });
  }

  return faces;
};

export const detectFaces = async (imageElement: HTMLImageElement): Promise<DetectedFace[]> => {
  await loadModel();

  const width = imageElement.naturalWidth;
  const height = imageElement.naturalHeight;

  if (width === 0 || height === 0) throw new Error('Image invalide.');

  let allDetectedFaces: DetectedFace[];

  // Global passage to find larger faces, resize if too large for performance
  const GLOBAL_MAX = 1200;
  const globalScale = Math.min(1, GLOBAL_MAX / Math.max(width, height));
  const globalW = width * globalScale;
  const globalH = height * globalScale;

  const globalCanvas = document.createElement('canvas');
  globalCanvas.width = globalW;
  globalCanvas.height = globalH;
  globalCanvas.getContext('2d')?.drawImage(imageElement, 0, 0, globalW, globalH);

  const globalFaces = await analyzeCanvas(
    globalCanvas,
    imageElement,
    0,
    0,
    1 / globalScale,
    1 / globalScale
  );
  allDetectedFaces = [...globalFaces];

  // Tiling to find smaller faces, split image in 4
  const cols = 2;
  const rows = 2;
  const tileW = width / cols;
  const tileH = height / rows;

  // Add overlap to avoid cutting a face
  const overlapX = tileW * 0.15;
  const overlapY = tileH * 0.15;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const startX = Math.max(0, c * tileW - overlapX);
      const startY = Math.max(0, r * tileH - overlapY);
      const endX = Math.min(width, (c + 1) * tileW + overlapX);
      const endY = Math.min(height, (r + 1) * tileH + overlapY);

      const currentTileW = endX - startX;
      const currentTileH = endY - startY;

      // Change dimensions if too large
      const tileScale = Math.min(1, GLOBAL_MAX / Math.max(currentTileW, currentTileH));
      const procTileW = currentTileW * tileScale;
      const procTileH = currentTileH * tileScale;

      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = procTileW;
      tileCanvas.height = procTileH;
      tileCanvas
        .getContext('2d')
        ?.drawImage(
          imageElement,
          startX,
          startY,
          currentTileW,
          currentTileH,
          0,
          0,
          procTileW,
          procTileH
        );

      const tileFaces = await analyzeCanvas(
        tileCanvas,
        imageElement,
        startX,
        startY,
        1 / tileScale,
        1 / tileScale
      );
      allDetectedFaces = [...allDetectedFaces, ...tileFaces];
    }
  }

  // Suppress double detections
  const uniqueFaces: DetectedFace[] = [];

  allDetectedFaces.forEach((face) => {
    const isDuplicate = uniqueFaces.some(
      (uniqueFace) => calculateIoU(face.box, uniqueFace.box) > 0.3
    );

    if (!isDuplicate) {
      uniqueFaces.push(face);
    }
  });

  return uniqueFaces;
};
