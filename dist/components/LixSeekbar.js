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
exports.LixSeekbar = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const { width: SCREEN_WIDTH } = react_native_1.Dimensions.get('window');
const LixSeekbar = ({ currentTime, duration, buffered, themeColor = '#4F46E5', onSeek, }) => {
    const seekbarRef = (0, react_1.useRef)(null);
    const [seekbarWidth, setSeekbarWidth] = (0, react_1.useState)(0);
    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
    const bufferedPercent = Math.min(100, Math.max(0, buffered * 100));
    const handleTouch = (e) => {
        e?.stopPropagation?.();
        let touchX = 0;
        if (react_native_1.Platform.OS === 'web' && e?.nativeEvent) {
            const rect = e.currentTarget?.getBoundingClientRect?.() || e.target?.getBoundingClientRect?.();
            if (rect && rect.width > 0) {
                const clientX = e.nativeEvent.clientX !== undefined ? e.nativeEvent.clientX : (e.nativeEvent.pageX || 0);
                touchX = clientX - rect.left;
                const fraction = Math.min(Math.max(0, touchX / rect.width), 1);
                const targetSec = fraction * duration;
                if (Number.isFinite(targetSec)) {
                    onSeek(targetSec);
                }
                return;
            }
        }
        if (e?.nativeEvent?.locationX !== undefined && !isNaN(e.nativeEvent.locationX)) {
            touchX = e.nativeEvent.locationX;
        }
        else if (e?.nativeEvent?.offsetX !== undefined && !isNaN(e.nativeEvent.offsetX)) {
            touchX = e.nativeEvent.offsetX;
        }
        if (isNaN(touchX) || touchX < 0)
            touchX = 0;
        const width = seekbarWidth > 0 ? seekbarWidth : (SCREEN_WIDTH > 480 ? 440 : SCREEN_WIDTH - 32);
        if (width > 0 && Number.isFinite(duration) && duration > 0) {
            const fraction = Math.min(Math.max(0, touchX / width), 1);
            if (Number.isFinite(fraction)) {
                onSeek(fraction * duration);
            }
        }
    };
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { ref: seekbarRef, style: styles.container, onPress: handleTouch, onLayout: (e) => setSeekbarWidth(e.nativeEvent.layout.width), activeOpacity: 0.9 },
        react_1.default.createElement(react_native_1.View, { style: styles.trackBackground },
            react_1.default.createElement(react_native_1.View, { style: [styles.bufferTrack, { width: `${bufferedPercent}%` }] }),
            react_1.default.createElement(react_native_1.View, { style: [styles.progressTrack, { width: `${progressPercent}%`, backgroundColor: themeColor }] })),
        react_1.default.createElement(react_native_1.View, { style: [styles.knob, { left: `${Math.max(0, Math.min(progressPercent, 98))}%` }] })));
};
exports.LixSeekbar = LixSeekbar;
const styles = react_native_1.StyleSheet.create({
    container: {
        height: 20,
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    trackBackground: {
        height: 3.5,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    bufferTrack: {
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    progressTrack: {
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    knob: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        top: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
});
