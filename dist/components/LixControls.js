"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LixControls = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
const LixSeekbar_1 = require("./LixSeekbar");
const formatTime = (seconds = 0) => {
    if (isNaN(seconds) || seconds < 0)
        return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    if (hrs > 0) {
        return `${hrs}:${remMins < 10 ? '0' : ''}${remMins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
const PipMiniIcon = ({ size = 18, color = '#FFFFFF' }) => (react_1.default.createElement(react_native_1.View, { style: {
        width: size,
        height: (size * 14) / 18,
        borderWidth: 1.6,
        borderColor: color,
        borderRadius: 2.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 1.5,
    } },
    react_1.default.createElement(react_native_1.View, { style: {
            width: size * 0.45,
            height: size * 0.35,
            backgroundColor: color,
            borderRadius: 1,
        } })));
const LixControls = ({ isPlaying, isBuffering, currentTime, duration, buffered, playbackRate, isMuted, isFullscreen, isLocked, showControls, seekFeedback, themeColor = '#4F46E5', enablePictureInPicture = true, onTogglePlayPause, onSeekBy, onSeek, onToggleMute, onToggleFullscreen, onTogglePictureInPicture, onToggleLock, onOpenSettings, }) => {
    // If locked, show only the compact corner unlock button
    if (isLocked) {
        if (!showControls)
            return null;
        return (react_1.default.createElement(react_native_1.View, { style: styles.lockedOverlay, pointerEvents: "box-none" },
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.unlockBtn, onPress: onToggleLock, activeOpacity: 0.85 },
                react_1.default.createElement(lucide_react_native_1.Unlock, { size: 14, color: "#818CF8" }),
                react_1.default.createElement(react_native_1.Text, { style: styles.unlockBtnText }, "Unlock"))));
    }
    if (!showControls)
        return null;
    return (react_1.default.createElement(react_native_1.View, { style: styles.controlsOverlay },
        react_1.default.createElement(react_native_1.View, { style: styles.topBar },
            react_1.default.createElement(react_native_1.View, { style: styles.topBarLeft }, playbackRate !== 1.0 && (react_1.default.createElement(react_native_1.View, { style: [styles.speedBadgeTop, { backgroundColor: themeColor }] },
                react_1.default.createElement(react_native_1.Text, { style: styles.speedBadgeTopText },
                    playbackRate,
                    "x")))),
            react_1.default.createElement(react_native_1.View, { style: styles.topBarRight },
                react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.iconCircleBtn, onPress: onToggleLock, activeOpacity: 0.75 },
                    react_1.default.createElement(lucide_react_native_1.Lock, { size: 16, color: "#FFFFFF" })),
                react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.iconCircleBtn, onPress: onOpenSettings, activeOpacity: 0.75 },
                    react_1.default.createElement(lucide_react_native_1.Settings, { size: 16, color: "#FFFFFF" })))),
        react_1.default.createElement(react_native_1.View, { style: styles.centerRow },
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.skipBtn, onPress: (e) => onSeekBy(-10, e), activeOpacity: 0.75 },
                react_1.default.createElement(lucide_react_native_1.RotateCcw, { size: 24, color: "#FFFFFF" }),
                react_1.default.createElement(react_native_1.Text, { style: styles.skipBtnText }, "10")),
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.mainPlayBtn, { backgroundColor: themeColor, shadowColor: themeColor }], onPress: onTogglePlayPause, activeOpacity: 0.85 }, isBuffering ? (react_1.default.createElement(react_native_1.ActivityIndicator, { size: "small", color: "#FFFFFF" })) : isPlaying ? (react_1.default.createElement(lucide_react_native_1.Pause, { size: 28, color: "#FFFFFF", fill: "#FFFFFF" })) : (react_1.default.createElement(lucide_react_native_1.Play, { size: 28, color: "#FFFFFF", fill: "#FFFFFF", style: { marginLeft: 3 } }))),
            react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.skipBtn, onPress: (e) => onSeekBy(10, e), activeOpacity: 0.75 },
                react_1.default.createElement(lucide_react_native_1.RotateCw, { size: 24, color: "#FFFFFF" }),
                react_1.default.createElement(react_native_1.Text, { style: styles.skipBtnText }, "10"))),
        seekFeedback && (react_1.default.createElement(react_native_1.View, { style: styles.seekFeedbackOverlay, pointerEvents: "none" },
            react_1.default.createElement(react_native_1.View, { style: styles.seekFeedbackBubble },
                react_1.default.createElement(react_native_1.Text, { style: styles.seekFeedbackText }, seekFeedback)))),
        react_1.default.createElement(react_native_1.View, { style: styles.bottomBar },
            react_1.default.createElement(LixSeekbar_1.LixSeekbar, { currentTime: currentTime, duration: duration, buffered: buffered, themeColor: themeColor, onSeek: onSeek }),
            react_1.default.createElement(react_native_1.View, { style: styles.bottomControlsRow },
                react_1.default.createElement(react_native_1.View, { style: styles.bottomControlsLeft },
                    react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onTogglePlayPause, style: styles.miniBtn, activeOpacity: 0.75 }, isPlaying ? (react_1.default.createElement(lucide_react_native_1.Pause, { size: 18, color: "#FFFFFF", fill: "#FFFFFF" })) : (react_1.default.createElement(lucide_react_native_1.Play, { size: 18, color: "#FFFFFF", fill: "#FFFFFF" }))),
                    react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onToggleMute, style: styles.miniBtn, activeOpacity: 0.75 }, isMuted ? (react_1.default.createElement(lucide_react_native_1.VolumeX, { size: 18, color: "#EF4444" })) : (react_1.default.createElement(lucide_react_native_1.Volume2, { size: 18, color: "#FFFFFF" }))),
                    react_1.default.createElement(react_native_1.Text, { style: styles.timeText },
                        formatTime(currentTime),
                        " ",
                        react_1.default.createElement(react_native_1.Text, { style: { color: '#94A3B8' } },
                            "/ ",
                            formatTime(duration)))),
                react_1.default.createElement(react_native_1.View, { style: styles.bottomControlsRight },
                    enablePictureInPicture && onTogglePictureInPicture && (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onTogglePictureInPicture, style: styles.miniBtn, activeOpacity: 0.75 },
                        react_1.default.createElement(PipMiniIcon, { size: 16, color: "#FFFFFF" }))),
                    react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onToggleFullscreen, style: styles.miniBtn, activeOpacity: 0.75 }, isFullscreen ? (react_1.default.createElement(lucide_react_native_1.Minimize, { size: 18, color: "#FFFFFF" })) : (react_1.default.createElement(lucide_react_native_1.Maximize, { size: 18, color: "#FFFFFF" }))))))));
};
exports.LixControls = LixControls;
const styles = react_native_1.StyleSheet.create({
    controlsOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'space-between',
        padding: 12,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topBarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    speedBadgeTop: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    speedBadgeTopText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
    },
    topBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconCircleBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
    },
    skipBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    skipBtnText: {
        position: 'absolute',
        color: '#FFFFFF',
        fontSize: 9.5,
        fontWeight: '900',
        bottom: 9,
    },
    mainPlayBtn: {
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },
    bottomBar: {
        gap: 4,
    },
    bottomControlsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomControlsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bottomControlsRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    miniBtn: {
        padding: 4,
    },
    timeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    lockedOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 12,
    },
    unlockBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    unlockBtnText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
    },
    seekFeedbackOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
    },
    seekFeedbackBubble: {
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    seekFeedbackText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
});
