export const playSound = () => {
  gain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.02);
}

export const stopSound = () => {
  gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.04);
}

const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
const gain = audioContext.createGain();
oscillator.connect(gain);
gain.connect(audioContext.destination);
oscillator.type = "triangle";
oscillator.start(0);
stopSound();
