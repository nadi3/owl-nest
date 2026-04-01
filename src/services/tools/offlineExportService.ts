/**
 * @file offlineExportService.ts
 * @description Service for offline audio analysis and video muxing using FFmpeg.
 */
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class OfflineExportService {
  private ffmpeg: FFmpeg | null = null;

  /**
   * Analyse l'intégralité du fichier audio en arrière-plan et retourne
   * un tableau contenant les données de fréquence pour chaque image de la vidéo.
   */
  public async analyzeAudioOffline(
    audioFile: File,
    fps: number = 30,
    onProgress: (percent: number) => void
  ): Promise<{ framesData: Uint8Array[]; totalFrames: number }> {
    const arrayBuffer = await audioFile.arrayBuffer();
    const ctx = new globalThis.AudioContext();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    ctx.close();

    const duration = audioBuffer.duration;
    const totalFrames = Math.floor(duration * fps);
    const binCount = 128;
    const framesData: Uint8Array[] = new Array(totalFrames);

    const offlineCtx = new globalThis.OfflineAudioContext(
      1,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;

    const analyser = offlineCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;

    const processor = offlineCtx.createScriptProcessor(4096, 1, 1);

    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(offlineCtx.destination);

    let lastCapturedFrame = -1;

    processor.onaudioprocess = (e) => {
      const currentTime = e.playbackTime;
      const frameIndex = Math.floor(currentTime * fps);

      if (frameIndex > lastCapturedFrame && frameIndex < totalFrames) {
        const data = new Uint8Array(binCount);
        analyser.getByteFrequencyData(data);
        framesData[frameIndex] = data;
        lastCapturedFrame = frameIndex;

        // Mise à jour de la progression (0 à 100%)
        if (frameIndex % 20 === 0) {
          onProgress((frameIndex / totalFrames) * 100);
        }
      }
    };

    source.start(0);

    await offlineCtx.startRendering();

    for (let i = 0; i < totalFrames; i++) {
      if (!framesData[i]) {
        framesData[i] = i > 0 ? new Uint8Array(framesData[i - 1]) : new Uint8Array(binCount);
      }
    }

    onProgress(100);
    return { framesData, totalFrames };
  }

  public async muxToMp4(videoBuffer: ArrayBuffer, audioFile: File): Promise<string> {
    if (!this.ffmpeg) this.ffmpeg = new FFmpeg();
    const ffmpeg = this.ffmpeg;

    if (!ffmpeg.loaded) {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }

    const extension = audioFile.name.split('.').pop() || 'mp3';
    const audioFileName = `audio.${extension}`;

    try {
      await ffmpeg.deleteFile('video.mp4');
      await ffmpeg.deleteFile(audioFileName);
      await ffmpeg.deleteFile('output.mp4');
    } catch (e) {
      /* Files don't exist yet */
    }

    await ffmpeg.writeFile('video.mp4', new Uint8Array(videoBuffer));
    await ffmpeg.writeFile(audioFileName, await fetchFile(audioFile));

    await ffmpeg.exec([
      '-i',
      'video.mp4',
      '-i',
      audioFileName,
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-shortest',
      'output.mp4',
    ]);

    const data = await ffmpeg.readFile('output.mp4');
    const safeData = new Uint8Array(data as Uint8Array);
    const mp4Blob = new Blob([safeData], { type: 'video/mp4' });

    return URL.createObjectURL(mp4Blob);
  }
}

export const offlineExportService = new OfflineExportService();
