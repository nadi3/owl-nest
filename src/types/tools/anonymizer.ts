/**
 * Represents the absolute coordinates of a detected face.
 */
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Represents a detected face with its UI state and preview.
 */
export interface DetectedFace {
  id: string;
  box: BoundingBox;
  isBlurred: boolean;
  thumbnailDataUrl: string;
}
