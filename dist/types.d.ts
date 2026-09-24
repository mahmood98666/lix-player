import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export interface QualityOption {
    id: string;
    label: string;
    bitrate?: number;
}
export interface LixPlayerProps {
    /** The video source URL or stream endpoint (m3u8, mp4, etc.) */
    source: string;
    /** Optional poster image URL displayed before playback */
    poster?: string;
    /** Whether the video should automatically begin playing */
    autoPlay?: boolean;
    /** Whether playback should automatically loop */
    loop?: boolean;
    /** Video content scaling mode ('contain', 'cover', 'fill') */
    contentFit?: 'contain' | 'cover' | 'fill';
    /** Primary accent color for seekbar and active badges (default: #4F46E5) */
    themeColor?: string;
    /** Custom list of playback speed multipliers (e.g. [0.5, 1.0, 1.5, 2.0]) */
    speedOptions?: number[];
    /** Custom list of quality options */
    qualityOptions?: QualityOption[];
    /** Content ID for ads, analytics or tracking */
    contentId?: string;
    /** Whether skippable ad overlays are enabled */
    enableAds?: boolean;
    /** Custom render function for ad overlay (e.g. skippable pre-roll ads) */
    renderAdOverlay?: (params: {
        onAdComplete: () => void;
        isMuted: boolean;
        onToggleMute: () => void;
    }) => React.ReactNode;
    /** Callback fired when video playback reaches the end */
    onEnded?: () => void;
    /** Callback fired continuously during playback with timestamps */
    onTimeUpdate?: (currentTime: number, duration: number) => void;
    /** Whether Picture-in-Picture / Mini-Player button is enabled */
    enablePictureInPicture?: boolean;
    /** Callback fired when Picture-in-Picture button is pressed */
    onPictureInPicturePress?: () => void;
    /** Container style overrides */
    style?: StyleProp<ViewStyle>;
}
export interface LixSeekbarProps {
    currentTime: number;
    duration: number;
    buffered: number;
    themeColor?: string;
    onSeek: (targetSeconds: number) => void;
}
export interface LixSettingsModalProps {
    visible: boolean;
    onClose: () => void;
    playbackRate: number;
    onSelectSpeed: (speed: number) => void;
    speedOptions?: number[];
    selectedQuality: string;
    onSelectQuality: (quality: string) => void;
    qualityOptions?: QualityOption[];
    isLooping: boolean;
    onToggleLoop: () => void;
    themeColor?: string;
}
export interface LixControlsProps {
    isPlaying: boolean;
    isBuffering: boolean;
    currentTime: number;
    duration: number;
    buffered: number;
    playbackRate: number;
    isMuted: boolean;
    isFullscreen: boolean;
    isLocked: boolean;
    showControls: boolean;
    seekFeedback: string | null;
    themeColor?: string;
    enablePictureInPicture?: boolean;
    onTogglePlayPause: (e?: any) => void;
    onSeekBy: (seconds: number, e?: any) => void;
    onSeek: (seconds: number) => void;
    onToggleMute: (e?: any) => void;
    onToggleFullscreen: (e?: any) => void;
    onTogglePictureInPicture?: (e?: any) => void;
    onToggleLock: (e?: any) => void;
    onOpenSettings: (e?: any) => void;
}
