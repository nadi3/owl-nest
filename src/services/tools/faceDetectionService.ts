/**
 * @file faceDetectionService.ts
 * @description A service for detecting faces in images using TensorFlow.js and the MediaPipeFaceDetector model.
 * It employs a tiling strategy to improve detection of both large and small faces.
 */

import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import type { BoundingBox, DetectedFace } from '@/types/tools/anonymizer.ts';

/**
 * A singleton instance of the MediaPipeFaceDetector.
 * It is loaded lazily on the first call to `detectFaces`.
 * @type {faceDetection.FaceDetector | null}
 */
let detector: faceDetection.FaceDetector | null = null;

/**
 * Loads and initializes the MediaPipeFaceDetector model from TensorFlow.js.
 * This function is idempotent; it ensures the model is loaded only once.
 * @returns {Promise<faceDetection.FaceDetector>} A promise that resolves with the initialized detector instance.
 * @private
 */
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

/**
 * Calculates the Intersection over Union (IoU) of two bounding boxes.
 * IoU is a metric used to measure the extent of overlap between two boxes.
 * It's used here to identify and remove duplicate face detections.
 * @param {BoundingBox} box1 - The first bounding box.
 * @param {BoundingBox} box2 - The second bounding box.
 * @returns {number} The IoU value, ranging from 0 (no overlap) to 1 (perfect overlap).
 * @private
 */
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

/**
 * Analyzes a given canvas segment to detect faces and extract their data.
 *
 * This function takes a canvas (which can be a scaled-down version of the full image or a tile),
 * runs the face detector on it, and then maps the detected face coordinates back to the
 * original image's coordinate system. It also generates a thumbnail for each detected face.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element containing the image data to analyze.
 * @param {HTMLImageElement} originalImage - The original, full-sized image element.
 * @param {number} offsetX - The horizontal offset of the canvas segment relative to the original image.
 * @param {number} offsetY - The vertical offset of the canvas segment relative to the original image.
 * @param {number} scaleX - The horizontal scaling factor between the canvas and the original image.
 * @param {number} scaleY - The vertical scaling factor between the canvas and the original image.
 * @returns {Promise<DetectedFace[]>} A promise that resolves with an array of detected faces.
 * @private
 */
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
      id: `face-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      box: { x, y, width: w, height: h },
      isBlurred: true,
      thumbnailDataUrl: thumbCanvas.toDataURL('image/jpeg', 0.8),
    });
  }

  return faces;
};

/**
 * Detects all faces in a given image using a multi-pass strategy.
 *
 * This is the main exported function of the service. It orchestrates the face detection process
 * by first performing a global pass on a scaled-down version of the image to find larger faces.
 * Then, it divides the image into overlapping tiles and analyzes each tile to find smaller,
 * more detailed faces.
 *
 * Finally, it merges the results from all passes and uses an IoU (Intersection over Union)
 * threshold to remove duplicate detections, returning a clean list of unique faces.
 *
 * @param {HTMLImageElement} imageElement - The image element to analyze.
 * @returns {Promise<DetectedFace[]>} A promise that resolves with an array of unique detected faces.
 * @throws {Error} If the image element is invalid (e.g., has zero width or height).
 */
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
