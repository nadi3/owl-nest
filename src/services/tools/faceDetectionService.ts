import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import type { DetectedFace } from '@/types/tools/anonymizer.ts';

let detector: faceDetection.FaceDetector | null = null;

const loadModel = async () => {
  await tf.ready();

  if (!detector) {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig: faceDetection.MediaPipeFaceDetectorTfjsModelConfig = {
      runtime: 'tfjs',
      maxFaces: 30,
      modelType: 'full',
    };

    detector = await faceDetection.createDetector(model, detectorConfig);
  }
  return detector;
};

export const detectFaces = async (imageElement: HTMLImageElement): Promise<DetectedFace[]> => {
  const loadedDetector = await loadModel();

  const originalWidth = imageElement.naturalWidth;
  const originalHeight = imageElement.naturalHeight;

  if (originalWidth === 0 || originalHeight === 0) {
    throw new Error("L'image n'a pas pu être chargée correctement.");
  }

  // Define a maximum dimension for the analysis to speed up the process. The model will still detect faces accurately
  // on smaller versions, and we can map back to the original size for cropping.
  const MAX_DIMENSION = 1920;
  let scale = 1;
  let procWidth = originalWidth;
  let procHeight = originalHeight;

  // If the image is larger than the max dimension, we scale it down for the face detection step.
  if (originalWidth > MAX_DIMENSION || originalHeight > MAX_DIMENSION) {
    scale = Math.min(MAX_DIMENSION / originalWidth, MAX_DIMENSION / originalHeight);
    procWidth = Math.round(originalWidth * scale);
    procHeight = Math.round(originalHeight * scale);
  }

  // Dedicated canvas for TensorFlow processing. This allows us to work with a resized version of the image without affecting the original.
  const tfCanvas = document.createElement('canvas');
  tfCanvas.width = procWidth;
  tfCanvas.height = procHeight;
  const tfCtx = tfCanvas.getContext('2d');
  if (!tfCtx) throw new Error('Could not get 2D context for TF analysis');

  // Draw the image on the TF canvas, resizing it if necessary.
  tfCtx.drawImage(imageElement, 0, 0, procWidth, procHeight);

  // Configuration for the face estimation. We set flipHorizontal to false since we're working with a static image, not a webcam feed.
  const estimationConfig = {
    flipHorizontal: false,
  };

  const predictions = await loadedDetector.estimateFaces(tfCanvas, estimationConfig);

  // Work with a separate canvas for generating thumbnails. This ensures we always crop from the original image for maximum quality, regardless of the processing size.
  const thumbCanvas = document.createElement('canvas');
  const thumbCtx = thumbCanvas.getContext('2d');
  if (!thumbCtx) throw new Error('Could not get 2D context for thumbnails');
  const reverseScale = 1 / scale;

  return predictions.map((prediction, index): DetectedFace => {
    // Get the bounding box from the prediction, which is based on the processed (potentially resized) image.
    const { xMin: procX, yMin: procY, width: procFaceW, height: procFaceH } = prediction.box;

    // Rescale the coordinates back to the original image size.
    const rawX = procX * reverseScale;
    const rawY = procY * reverseScale;
    const rawFaceW = procFaceW * reverseScale;
    const rawFaceH = procFaceH * reverseScale;

    // Add margin around the detected face for better aesthetics.
    const margin = rawFaceW * 0.2;

    const x = Math.max(0, rawX - margin);
    const y = Math.max(0, rawY - margin);
    const w = Math.min(originalWidth - x, rawFaceW + margin * 2);
    const h = Math.min(originalHeight - y, rawFaceH + margin * 2);

    // Draw the cropped face area onto the thumbnail canvas.
    thumbCanvas.width = w;
    thumbCanvas.height = h;
    thumbCtx.drawImage(imageElement, x, y, w, h, 0, 0, w, h);

    return {
      id: `face-${index}-${Date.now()}`,
      box: { x, y, width: w, height: h },
      isBlurred: true,
      thumbnailDataUrl: thumbCanvas.toDataURL('image/jpeg', 0.8),
    };
  });
};
