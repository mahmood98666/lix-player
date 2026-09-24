# 🎬 Lix Player (`lix-player`)

> The modern, sleek, and high-performance YouTube-style video player for **React Native** & **Expo**, built on top of `expo-video` (AndroidX Media3 & Apple AVPlayer).

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/lix-player)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🎮 Live Interactive Preview (Zero Install Required)

Anyone can test **Lix Player** directly in their browser without installing anything!

- **Option 1 (Instant Local Preview):** Double click [`preview.html`](preview.html) in your browser.
- **Option 2 (One-line preview server):**
  ```bash
  npx serve .
  # Then open http://localhost:3000/preview.html
  ```

---

## ✨ Features

- ⚡ **60fps Native Hardware Acceleration:** Powered by Google's **AndroidX Media3 (ExoPlayer)** on Android and Apple's **AVPlayer** on iOS.
- 🔴 **YouTube-Style Seekbar:** Real-time buffer indicator, active progress bar, smooth knob, and instant touch seek.
- ⏩ **Double-Tap / Button Fast Skip:** `-10s` rewind & `+10s` fast forward with visual ripple feedback.
- 📺 **Ultra HD Quality Selector (144p to 4K):** Supports `Auto`, `4K (2160p)`, `2K (1440p)`, `1080p`, `720p`, `480p`, `360p`, `240p`, `144p`.
- ⚡ **Expanded Playback Speed (Up to 3.0x):** Audio-synced speed multipliers: `0.25x`, `0.5x`, `0.75x`, `1.0x`, `1.25x`, `1.5x`, `1.75x`, `2.0x`, `2.5x`, `3.0x`.
- 🔒 **Screen Lock:** One-tap screen locking to prevent accidental touches while watching videos.
- ⛶ **Native Fullscreen:** Orientation-aware fullscreen mode with smooth transitions.
- 📢 **Skippable Ads Support:** Plug-and-play slot for pre-roll, mid-roll, or custom video ad overlays.
- 🎨 **Fully Themeable:** Customize primary colors, icons, and layout styles easily.

---

## 📦 Installation

```bash
# Using npm
npm install lix-player expo-video lucide-react-native

# Using yarn
yarn add lix-player expo-video lucide-react-native

# Using bun or pnpm
bun add lix-player expo-video lucide-react-native
pnpm add lix-player expo-video lucide-react-native
```

### Peer Dependencies
Ensure you have `expo-video` and `lucide-react-native` installed in your project:
```bash
npx expo install expo-video lucide-react-native
```

---

## 🚀 Quick Start

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LixPlayer } from 'lix-player';

export default function VideoScreen() {
  return (
    <View style={styles.container}>
      <LixPlayer
        source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
        themeColor="#4F46E5"
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});
```

---

## 🛠️ Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `source` | `string` | **Required** | The video stream URL (`.mp4`, `.m3u8` HLS, etc.) |
| `poster` | `string` | `undefined` | Optional preview image shown before playback |
| `autoPlay` | `boolean` | `true` | Starts playback automatically on load |
| `loop` | `boolean` | `false` | Loops the video continuously |
| `themeColor` | `string` | `'#4F46E5'` | Primary theme color for seekbar and badges |
| `contentFit` | `'contain' \| 'cover' \| 'fill'` | `'contain'` | Video aspect scaling mode |
| `speedOptions` | `number[]` | `[0.5, 0.75, 1.0, 1.25, 1.5, 2.0]` | Custom speed multiplier array |
| `qualityOptions` | `QualityOption[]` | Standard 5 options | Custom resolution selector options |
| `enableAds` | `boolean` | `false` | Enables the ad overlay hook |
| `renderAdOverlay` | `(params) => ReactNode` | `undefined` | Custom skippable ad component |
| `onEnded` | `() => void` | `undefined` | Callback when video finishes |
| `onTimeUpdate` | `(cur, dur) => void` | `undefined` | Real-time playback timestamp callback |
| `style` | `StyleProp<ViewStyle>` | `undefined` | Container style overrides |

---

## 🤝 Contributing

We welcome community contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
