class AudioVisualizerService {
  private audio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private dataArray: Uint8Array | null = null;

  private init() {
    if (this.audioContext) return;

    this.audio = new Audio();

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.audioContext = new AudioContextClass();

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  public loadAudio(file: File) {
    this.init();

    if (this.audio?.src) {
      URL.revokeObjectURL(this.audio.src);
    }

    const objectUrl = URL.createObjectURL(file);
    if (this.audio) {
      this.audio.src = objectUrl;
      this.audio.load();
    }
  }

  public play() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
    this.audio?.play();
  }

  public pause() {
    this.audio?.pause();
  }

  public getFrequencyData(): Uint8Array | null {
    if (!this.analyser || !this.dataArray) return null;

    this.analyser.getByteFrequencyData(this.dataArray as any);
    return this.dataArray;
  }
}

export const audioVisualizerService = new AudioVisualizerService();
