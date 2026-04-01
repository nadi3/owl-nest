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
    fps: number = 30
  ): Promise<{ framesData: Uint8Array[]; totalFrames: number }> {
    const arrayBuffer = await audioFile.arrayBuffer();
    const ctx = new globalThis.AudioContext();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    ctx.close();

    const duration = audioBuffer.duration;
    const totalFrames = Math.floor(duration * fps);
    const binCount = 128;
    const framesData = new Array(totalFrames).fill(0).map(() => new Uint8Array(binCount));

    const offlineCtx = new OfflineAudioContext(
      1,
      audioBuffer.sampleRate * duration,
      audioBuffer.sampleRate
    );
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;

    const analyser = offlineCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;

    const processor = offlineCtx.createScriptProcessor(4096, 1, 1);
    let currentFrame = 0;

    processor.onaudioprocess = () => {
      const time = offlineCtx.currentTime;
      const targetFrame = Math.floor(time * fps);
      const data = new Uint8Array(binCount);
      analyser.getByteFrequencyData(data);

      while (currentFrame <= targetFrame && currentFrame < totalFrames) {
        framesData[currentFrame] = new Uint8Array(data);
        currentFrame++;
      }
    };

    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(offlineCtx.destination);
    source.start(0);

    await offlineCtx.startRendering();

    while (currentFrame < totalFrames) {
      framesData[currentFrame] = framesData[currentFrame - 1] || new Uint8Array(binCount);
      currentFrame++;
    }

    return { framesData, totalFrames };
  }

  public async muxToMp4(webmBuffer: ArrayBuffer, audioFile: File): Promise<string> {
    if (!this.ffmpeg) this.ffmpeg = new FFmpeg();
    const ffmpeg = this.ffmpeg;

    ffmpeg.on('log', ({ message }) => {
      console.log('[FFmpeg]', message);
    });

    if (!ffmpeg.loaded) {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }

    const extension = audioFile.name.split('.').pop() || 'mp3';
    const audioFileName = `audio.${extension}`;

    await ffmpeg.writeFile('video.mp4', new Uint8Array(webmBuffer));
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
