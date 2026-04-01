/**
 * @file offlineExportService.ts
 * @description Service for offline audio analysis and video muxing using FFmpeg.
 */
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class OfflineExportService {
  private ffmpeg: FFmpeg | null = null;

  public async analyzeAudioOffline(
    audioFile: File,
    fps: number = 60,
    onProgress: (percent: number) => void
  ): Promise<{ framesData: Uint8Array[]; totalFrames: number }> {
    const arrayBuffer = await audioFile.arrayBuffer();
    const ctx = new AudioContext();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    ctx.close();

    const duration = audioBuffer.duration;
    const totalFrames = Math.ceil(duration * fps);
    const binCount = 128;
    const framesData: Uint8Array[] = new Array(totalFrames);

    const bufferSize = 256;
    const offlineCtx = new OfflineAudioContext(1, audioBuffer.length, audioBuffer.sampleRate);

    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;

    const analyser = offlineCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0;

    const processor = offlineCtx.createScriptProcessor(bufferSize, 1, 1);

    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(offlineCtx.destination);

    let lastFrameFilled = -1;

    processor.onaudioprocess = (e) => {
      const playbackTime = e.playbackTime;
      const targetFrame = Math.floor(playbackTime * fps);

      const data = new Uint8Array(binCount);
      analyser.getByteFrequencyData(data);

      for (let i = lastFrameFilled + 1; i <= targetFrame; i++) {
        if (i < totalFrames) {
          if (i > 0 && framesData[i - 1]) {
            const smoothed = new Uint8Array(binCount);
            for (let j = 0; j < binCount; j++) {
              smoothed[j] = Math.floor(data[j] * 0.7 + framesData[i - 1][j] * 0.3);
            }
            framesData[i] = smoothed;
          } else {
            framesData[i] = new Uint8Array(data);
          }
        }
      }
      lastFrameFilled = targetFrame;

      if (targetFrame % 50 === 0) {
        onProgress((targetFrame / totalFrames) * 100);
      }
    };

    source.start(0);

    await offlineCtx.startRendering();

    for (let i = 0; i < totalFrames; i++) {
      if (!framesData[i]) framesData[i] = i > 0 ? framesData[i - 1] : new Uint8Array(binCount);
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
      '-map',
      '0:v:0',
      '-map',
      '1:a:0',
      'output.mp4',
    ]);

    const data = await ffmpeg.readFile('output.mp4');
    const safeData = new Uint8Array(data as Uint8Array);
    const mp4Blob = new Blob([safeData], { type: 'video/mp4' });

    return URL.createObjectURL(mp4Blob);
  }
}

export const offlineExportService = new OfflineExportService();
