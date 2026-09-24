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
exports.LixSettingsModal = exports.DEFAULT_QUALITIES = exports.DEFAULT_SPEEDS = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
exports.DEFAULT_SPEEDS = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0];
exports.DEFAULT_QUALITIES = [
    { id: 'Auto', label: 'Auto (Recommended)' },
    { id: '4K', label: '4K (2160p Ultra HD)' },
    { id: '2K', label: '2K (1440p Quad HD)' },
    { id: '1080p', label: '1080p (Full HD)' },
    { id: '720p', label: '720p (HD)' },
    { id: '480p', label: '480p (Standard)' },
    { id: '360p', label: '360p (Data Saver)' },
    { id: '240p', label: '240p (Low)' },
    { id: '144p', label: '144p (Lowest)' },
];
const LixSettingsModal = ({ visible, onClose, playbackRate, onSelectSpeed, speedOptions = exports.DEFAULT_SPEEDS, selectedQuality, onSelectQuality, qualityOptions = exports.DEFAULT_QUALITIES, isLooping, onToggleLoop, themeColor = '#4F46E5', }) => {
    const [tab, setTab] = (0, react_1.useState)('main');
    const handleClose = () => {
        setTab('main');
        onClose();
    };
    return (react_1.default.createElement(react_native_1.Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: handleClose },
        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.overlay, activeOpacity: 1, onPress: handleClose },
            react_1.default.createElement(react_native_1.View, { style: styles.sheet },
                tab === 'main' && (react_1.default.createElement(react_native_1.View, null,
                    react_1.default.createElement(react_native_1.View, { style: styles.header },
                        react_1.default.createElement(react_native_1.Text, { style: styles.title }, "Playback Settings"),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleClose, style: { padding: 4 } },
                            react_1.default.createElement(lucide_react_native_1.X, { size: 18, color: "#94A3B8" }))),
                    react_1.default.createElement(react_native_1.View, { style: styles.menuList },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.menuRow, onPress: () => setTab('quality'), activeOpacity: 0.75 },
                            react_1.default.createElement(react_native_1.View, { style: styles.menuRowLeft },
                                react_1.default.createElement(lucide_react_native_1.Sliders, { size: 18, color: themeColor }),
                                react_1.default.createElement(react_native_1.Text, { style: styles.menuRowLabel }, "Quality")),
                            react_1.default.createElement(react_native_1.View, { style: styles.menuRowRight },
                                react_1.default.createElement(react_native_1.Text, { style: styles.menuRowValue }, selectedQuality),
                                react_1.default.createElement(lucide_react_native_1.ChevronRight, { size: 16, color: "#94A3B8" }))),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.menuRow, onPress: () => setTab('speed'), activeOpacity: 0.75 },
                            react_1.default.createElement(react_native_1.View, { style: styles.menuRowLeft },
                                react_1.default.createElement(lucide_react_native_1.Gauge, { size: 18, color: themeColor }),
                                react_1.default.createElement(react_native_1.Text, { style: styles.menuRowLabel }, "Playback Speed")),
                            react_1.default.createElement(react_native_1.View, { style: styles.menuRowRight },
                                react_1.default.createElement(react_native_1.Text, { style: styles.menuRowValue }, playbackRate === 1.0 ? 'Normal (1.0x)' : `${playbackRate}x`),
                                react_1.default.createElement(lucide_react_native_1.ChevronRight, { size: 16, color: "#94A3B8" }))),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.menuRow, onPress: onToggleLoop, activeOpacity: 0.75 },
                            react_1.default.createElement(react_native_1.View, { style: styles.menuRowLeft },
                                react_1.default.createElement(lucide_react_native_1.Repeat, { size: 18, color: isLooping ? themeColor : '#64748B' }),
                                react_1.default.createElement(react_native_1.Text, { style: styles.menuRowLabel }, "Loop Video")),
                            react_1.default.createElement(react_native_1.View, { style: styles.menuRowRight },
                                react_1.default.createElement(react_native_1.Text, { style: [styles.menuRowValue, isLooping && { color: themeColor, fontWeight: '800' }] }, isLooping ? 'On' : 'Off')))))),
                tab === 'quality' && (react_1.default.createElement(react_native_1.View, null,
                    react_1.default.createElement(react_native_1.View, { style: styles.header },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.backBtn, onPress: () => setTab('main'), activeOpacity: 0.7 },
                            react_1.default.createElement(lucide_react_native_1.ArrowLeft, { size: 18, color: "#0F172A" }),
                            react_1.default.createElement(react_native_1.Text, { style: styles.title }, "Quality")),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleClose, style: { padding: 4 } },
                            react_1.default.createElement(lucide_react_native_1.X, { size: 18, color: "#94A3B8" }))),
                    react_1.default.createElement(react_native_1.ScrollView, { style: styles.scrollArea, showsVerticalScrollIndicator: false },
                        react_1.default.createElement(react_native_1.View, { style: styles.optionsList }, qualityOptions.map((opt) => {
                            const isSelected = selectedQuality === opt.id;
                            return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: opt.id, style: [styles.optionRow, isSelected && { backgroundColor: `${themeColor}15` }], onPress: () => {
                                    onSelectQuality(opt.id);
                                    handleClose();
                                }, activeOpacity: 0.75 },
                                react_1.default.createElement(react_native_1.Text, { style: [styles.optionText, isSelected && { color: themeColor, fontWeight: '800' }] }, opt.label),
                                isSelected && react_1.default.createElement(lucide_react_native_1.Check, { size: 16, color: themeColor })));
                        }))))),
                tab === 'speed' && (react_1.default.createElement(react_native_1.View, null,
                    react_1.default.createElement(react_native_1.View, { style: styles.header },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.backBtn, onPress: () => setTab('main'), activeOpacity: 0.7 },
                            react_1.default.createElement(lucide_react_native_1.ArrowLeft, { size: 18, color: "#0F172A" }),
                            react_1.default.createElement(react_native_1.Text, { style: styles.title }, "Playback Speed")),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleClose, style: { padding: 4 } },
                            react_1.default.createElement(lucide_react_native_1.X, { size: 18, color: "#94A3B8" }))),
                    react_1.default.createElement(react_native_1.ScrollView, { style: styles.scrollArea, showsVerticalScrollIndicator: false },
                        react_1.default.createElement(react_native_1.View, { style: styles.optionsList }, speedOptions.map((speed) => {
                            const isSelected = playbackRate === speed;
                            return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: speed, style: [styles.optionRow, isSelected && { backgroundColor: `${themeColor}15` }], onPress: () => {
                                    onSelectSpeed(speed);
                                    setTab('main');
                                    handleClose();
                                }, activeOpacity: 0.75 },
                                react_1.default.createElement(react_native_1.Text, { style: [styles.optionText, isSelected && { color: themeColor, fontWeight: '800' }] }, speed === 1.0 ? 'Normal (1.0x)' : `${speed}x`),
                                isSelected && react_1.default.createElement(lucide_react_native_1.Check, { size: 16, color: themeColor })));
                        })))))))));
};
exports.LixSettingsModal = LixSettingsModal;
const styles = react_native_1.StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sheet: {
        width: '100%',
        maxWidth: 480,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 32,
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
        color: '#0F172A',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    menuList: {
        gap: 4,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: '#F8FAFC',
        marginBottom: 6,
    },
    menuRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuRowLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    menuRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    menuRowValue: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    optionsList: {
        gap: 4,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
    },
    optionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    scrollArea: {
        maxHeight: 340,
    },
});
