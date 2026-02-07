// Sound utility functions for UI feedback

/**
 * Play a success sound (chime)
 */
export const playSuccessSound = () => {
  try {
    // Create audio context
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 800; // Higher pitch for chime
    gainNode.gain.value = 0.3;

    // Create the chime effect (quick rise and fall)
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start();
    oscillator.stop(now + 0.3);
  } catch (e) {
    console.log('Audio not supported or blocked:', e);
  }
};

/**
 * Play a notification sound (bell)
 */
export const playNotificationSound = () => {
  try {
    // Create audio context
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 600; // Medium pitch for bell
    gainNode.gain.value = 0.4;

    // Create the bell effect (clear tone that fades)
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    oscillator.start();
    oscillator.stop(now + 0.5);
  } catch (e) {
    console.log('Audio not supported or blocked:', e);
  }
};

/**
 * Play an error sound
 */
export const playErrorSound = () => {
  try {
    // Create audio context
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 300; // Lower pitch for error
    gainNode.gain.value = 0.4;

    // Create the error effect (descending tone)
    const now = audioCtx.currentTime;
    oscillator.frequency.setValueAtTime(400, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.4);
    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    oscillator.start();
    oscillator.stop(now + 0.4);
  } catch (e) {
    console.log('Audio not supported or blocked:', e);
  }
};