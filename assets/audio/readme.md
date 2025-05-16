# Audio Assets

This directory contains all audio-related assets and configuration for the Personal Portfolio website. It includes music tracks, sound effects, voiceovers, and the code to manage and preload audio for an immersive user experience.

## Table of Contents

- [Purpose](#purpose)
- [Directory Structure](#directory-structure)
- [File Formats](#file-formats)
- [Loading & Playback](#loading--playback)
- [Optimization](#optimization)
- [Licensing & Attribution](#licensing--attribution)
- [Contributing](#contributing)

## Purpose

Audio enhances the interactivity and engagement of the portfolio by providing ambient music, UI sound effects, and narration. This folder centralizes all audio resources and logic for easy maintenance and extension.

## Directory Structure

```
/audio
├── music/
│   ├── background-loop.mp3
│   ├── background-loop.ogg
│   └── README.md         (this file)
├── sfx/
│   ├── click.wav
│   ├── notification.mp3
│   └── notification.ogg
└── preload.js            # handles preloading and playback control
```

- **music/**: Contains background music tracks in multiple formats for broad browser support.
- **sfx/**: Contains short sound effect files (clicks, alerts, etc.).
- **preload.js**: Exports functions to preload, play, pause, and manage audio tracks.

## File Formats

- **Music**: MP3 and OGG formats to balance file size and compatibility. Use `.mp3` for most browsers and `.ogg` as a fallback for better compression.
- **SFX**: WAV for lossless SFX (e.g., clicks), MP3/OGG for longer notifications.

Naming convention: `{name}.{ext}` where `name` is descriptive (e.g., `background-loop`, `notification`).

## Loading & Playback

In `preload.js`, the following API is provided:

```js
import { preloadAudio, playAudio, pauseAudio, setVolume } from './audio/preload.js';

// Preload all tracks
await preloadAudio([
  '/audio/music/background-loop.mp3',
  '/audio/music/background-loop.ogg',
  '/audio/sfx/click.wav',
  '/audio/sfx/notification.mp3',
]);

// Play background music in loop
playAudio('background-loop', { loop: true, volume: 0.5 });

// Play click SFX on UI click
button.addEventListener('click', () => playAudio('click'));
```

### `preloadAudio(files: string[])`  
Preloads an array of audio files. Resolves when all are loaded or cached.

### `playAudio(name: string, options?: { loop?: boolean; volume?: number })`  
Plays the preloaded audio by its basename. Options allow looping and volume control.

### `pauseAudio(name: string)`  
Pauses the specified audio track.

### `setVolume(name: string, volume: number)`  
Sets playback volume (0.0–1.0) for a specific track.

## Optimization

- **Lazy Loading**: Preload only critical audio on page load; defer non-essential sounds until user interaction.
- **Compression**: Use short OGG clips where possible; limit bitrate to 128 kbps for music and 64 kbps for SFX to reduce bandwidth.
- **Fallbacks**: Include both `.mp3` and `.ogg` to maximize cross-browser playback.

## Licensing & Attribution

- `background-loop.mp3` by [Artist Name] under CC-BY 4.0 (source: https://example.com)  
- `click.wav` from [FreeSound](https://freesound.org/) under CC0  

Include proper attribution in the main repository `README.md` under Acknowledgments.

## Contributing

1. Add new audio files in the appropriate subfolder (`music/` or `sfx/`).  
2. Name files descriptively and include both MP3 and OGG if using music.  
3. Update `preload.js` to include new tracks in the preload list.  
4. Test playback across major browsers (Chrome, Firefox, Safari, Edge).  
5. Submit a pull request with changes and describe the new audio usage.
