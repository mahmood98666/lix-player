"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LixPlayer = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const expo_video_1 = require("expo-video");
const LixControls_1 = require("./components/LixControls");
const LixSettingsModal_1 = require("./components/LixSettingsModal");
const LixPlayer = ({ source, poster, autoPlay = true, loop = false, contentFit = 'contain', themeColor = '#4F46E5', speedOptions, qualityOptions, contentId, enableAds = false, renderAdOverlay, enablePictureInPicture = true, onPictureInPicturePress, onEnded, onTimeUpdate, style, }) => {
    const [showAd, setShowAd] = (0, react_1.useState)(enableAds && !!renderAdOverlay);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(autoPlay && !showAd);
    const [currentTime, setCurrentTime] = (0, react_1.useState)(0);
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [buffered, setBuffered] = (0, react_1.useState)(0);
    const [playbackRate, setPlaybackRate] = (0, react_1.useState)(1.0);
    const [selectedQuality, setSelectedQuality] = (0, react_1.useState)('Auto');
    const [isMuted, setIsMuted] = (0, react_1.useState)(false);
    const [isLocked, setIsLocked] = (0, react_1.useState)(false);
    const [showControls, setShowControls] = (0, react_1.useState)(true);
    const [showSettings, setShowSettings] = (0, react_1.useState)(false);
    const [isLooping, setIsLooping] = (0, react_1.useState)(loop);
    const [isFullscreen, setIsFullscreen] = (0, react_1.useState)(false);
    const [isBuffering, setIsBuffering] = (0, react_1.useState)(false);
    const [seekFeedback, setSeekFeedback] = (0, react_1.useState)(null);
    const containerRef = (0, react_1.useRef)(null);
    const videoViewRef = (0, react_1.useRef)(null);
    const hideControlsTimer = (0, react_1.useRef)(null);
    const seekFeedbackTimer = (0, react_1.useRef)(null);
    // Initialize native expo-video player instance
    const nativePlayer = (0, expo_video_1.useVideoPlayer)(source || '', (p) => {
        p.loop = isLooping;
        if (autoPlay && source && !showAd) {
            try {
                p.play();
            }
            catch (_) { }
        }
    });
    // Sync native player status & timestamps
    (0, react_1.useEffect)(() => {
        if (!nativePlayer)
            return;
        const sub = nativePlayer.addListener('statusChange', (status) => {
            setIsPlaying(status.status === 'playing');
            setIsBuffering(status.status === 'loading');
            if (status.status === 'ended' && onEnded) {
                onEnded();
            }
            if (nativePlayer.duration && Number.isFinite(nativePlayer.duration)) {
                setDuration(nativePlayer.duration);
            }
        });
        const interval = setInterval(() => {
            try {
                if (nativePlayer.playing !== undefined)
                    setIsPlaying(nativePlayer.playing);
                if (nativePlayer.currentTime !== undefined && Number.isFinite(nativePlayer.currentTime)) {
                    setCurrentTime(nativePlayer.currentTime);
                    if (onTimeUpdate) {
                        onTimeUpdate(nativePlayer.currentTime, nativePlayer.duration || duration);
                    }
                }
                if (nativePlayer.duration !== undefined && Number.isFinite(nativePlayer.duration) && nativePlayer.duration > 0) {
                    setDuration(nativePlayer.duration);
                }
            }
            catch (_) { }
        }, 300);
        return () => {
            clearInterval(interval);
            if (sub && typeof sub.remove === 'function')
                sub.remove();
        };
    }, [nativePlayer, duration, onEnded, onTimeUpdate]);
    // Auto-hide controls timer
    const resetHideTimer = (0, react_1.useCallback)(() => {
        if (hideControlsTimer.current)
            clearTimeout(hideControlsTimer.current);
        if (!isLocked && isPlaying) {
            hideControlsTimer.current = setTimeout(() => setShowControls(false), 3500);
        }
    }, [isLocked, isPlaying]);
    // Play / Pause toggle
    const togglePlayPause = (e) => {
        e?.stopPropagation?.();
        if (nativePlayer) {
            try {
                if (nativePlayer.playing) {
                    nativePlayer.pause();
                    setIsPlaying(false);
                }
                else {
                    nativePlayer.play();
                    setIsPlaying(true);
                }
            }
            catch (err) {
                console.warn('LixPlayer play error:', err);
            }
        }
        resetHideTimer();
    };
    // Seek by relative seconds (-10s / +10s)
    const handleSeekBy = (seconds, e) => {
        e?.stopPropagation?.();
        const cur = Number(nativePlayer?.currentTime) || currentTime || 0;
        const dur = Number(nativePlayer?.duration) || duration || 0;
        const target = Math.max(0, dur > 0 ? Math.min(dur, cur + seconds) : cur + seconds);
        setCurrentTime(target);
        if (seekFeedbackTimer.current)
            clearTimeout(seekFeedbackTimer.current);
        setSeekFeedback(seconds > 0 ? `+${seconds}s` : `${seconds}s`);
        seekFeedbackTimer.current = setTimeout(() => setSeekFeedback(null), 800);
        if (nativePlayer) {
            try {
                nativePlayer.currentTime = target;
                if (typeof nativePlayer.seekBy === 'function') {
                    nativePlayer.seekBy(seconds);
                }
            }
            catch (err) {
                console.warn('LixPlayer seek error:', err);
            }
        }
        resetHideTimer();
    };
    // Seek to absolute timestamp
    const handleSeek = (targetSec) => {
        if (!Number.isFinite(targetSec))
            return;
        setCurrentTime(targetSec);
        if (nativePlayer) {
            try {
                nativePlayer.currentTime = targetSec;
            }
            catch (_) { }
        }
        resetHideTimer();
    };
    // Change speed
    const handleSelectSpeed = (speed) => {
        setPlaybackRate(speed);
        if (nativePlayer) {
            try {
                nativePlayer.playbackRate = speed;
            }
            catch (_) { }
        }
        resetHideTimer();
    };
    // Toggle Mute
    const toggleMute = (e) => {
        e?.stopPropagation?.();
        const next = !isMuted;
        setIsMuted(next);
        if (nativePlayer) {
            try {
                nativePlayer.muted = next;
            }
            catch (_) { }
        }
        resetHideTimer();
    };
    // Toggle Fullscreen
    const toggleFullscreen = async (e) => {
        e?.stopPropagation?.();
        try {
            if (isFullscreen) {
                if (videoViewRef.current?.exitFullscreen)
                    await videoViewRef.current.exitFullscreen();
                setIsFullscreen(false);
            }
            else {
                if (videoViewRef.current?.enterFullscreen)
                    await videoViewRef.current.enterFullscreen();
                setIsFullscreen(true);
            }
        }
        catch (err) {
            console.warn('LixPlayer fullscreen error:', err);
            setIsFullscreen((prev) => !prev);
        }
        resetHideTimer();
    };
    // Toggle Picture-in-Picture
    const togglePictureInPicture = async (e) => {
        e?.stopPropagation?.();
        if (onPictureInPicturePress) {
            onPictureInPicturePress();
            return;
        }
        try {
            if (videoViewRef.current && typeof videoViewRef.current.startPictureInPicture === 'function') {
                await videoViewRef.current.startPictureInPicture();
            }
        }
        catch (err) {
            console.warn('LixPlayer Picture-in-Picture error:', err);
        }
        resetHideTimer();
    };
    return (react_1.default.createElement(react_native_1.View, { ref: containerRef, style: [
            styles.playerContainer,
            style,
            isFullscreen && styles.fullscreenPlayer
        ] },
        react_1.default.createElement(expo_video_1.VideoView, { ref: videoViewRef, player: nativePlayer, style: [styles.nativeVideo, isFullscreen && styles.fullscreenVideo], contentFit: contentFit, nativeControls: false, fullscreenOptions: { enable: true }, showsTimecodes: true, allowsPictureInPicture: enablePictureInPicture, onFullscreenEnter: () => setIsFullscreen(true), onFullscreenExit: () => setIsFullscreen(false) }),
        showAd && renderAdOverlay && renderAdOverlay({
            onAdComplete: () => {
                setShowAd(false);
                try {
                    nativePlayer?.play();
                }
                catch (_) { }
            },
            isMuted,
            onToggleMute: toggleMute,
        }),
        !showControls && !isLocked && !showAd && (react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 1, onPress: () => {
                setShowControls(true);
                resetHideTimer();
            }, style: react_native_1.StyleSheet.absoluteFill })),
        !showAd && (react_1.default.createElement(LixControls_1.LixControls, { isPlaying: isPlaying, isBuffering: isBuffering, currentTime: currentTime, duration: duration, buffered: buffered, playbackRate: playbackRate, isMuted: isMuted, isFullscreen: isFullscreen, isLocked: isLocked, showControls: showControls, seekFeedback: seekFeedback, themeColor: themeColor, enablePictureInPicture: enablePictureInPicture, onTogglePlayPause: togglePlayPause, onSeekBy: handleSeekBy, onSeek: handleSeek, onToggleMute: toggleMute, onToggleFullscreen: toggleFullscreen, onTogglePictureInPicture: togglePictureInPicture, onToggleLock: () => setIsLocked((prev) => !prev), onOpenSettings: () => setShowSettings(true) })),
        react_1.default.createElement(LixSettingsModal_1.LixSettingsModal, { visible: showSettings, onClose: () => setShowSettings(false), playbackRate: playbackRate, onSelectSpeed: handleSelectSpeed, speedOptions: speedOptions, selectedQuality: selectedQuality, onSelectQuality: (q) => setSelectedQuality(q), qualityOptions: qualityOptions, isLooping: isLooping, themeColor: themeColor, onToggleLoop: () => {
                const next = !isLooping;
                setIsLooping(next);
                if (nativePlayer)
                    nativePlayer.loop = next;
            } })));
};
exports.LixPlayer = LixPlayer;
const styles = react_native_1.StyleSheet.create({
    playerContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
    },
    nativeVideo: {
        width: '100%',
        height: '100%',
    },
    fullscreenPlayer: {
        position: (react_native_1.Platform.OS === 'web' ? 'fixed' : 'absolute'),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 999999,
        backgroundColor: '#000000',
        aspectRatio: undefined,
    },
    fullscreenVideo: {
        width: '100%',
        height: '100%',
    },
});
exports.default = exports.LixPlayer;
