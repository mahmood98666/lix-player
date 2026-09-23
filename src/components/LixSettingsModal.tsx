import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { 
  X, 
  Sliders, 
  ChevronRight, 
  Gauge, 
  Repeat, 
  ArrowLeft, 
  Check 
} from 'lucide-react-native';
import { LixSettingsModalProps, QualityOption } from '../types';

const DEFAULT_SPEEDS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

const DEFAULT_QUALITIES: QualityOption[] = [
  { id: 'Auto', label: 'Auto (Recommended)' },
  { id: '1080p', label: '1080p (Full HD)' },
  { id: '720p', label: '720p (HD)' },
  { id: '480p', label: '480p (Standard)' },
  { id: '360p', label: '360p (Data Saver)' },
];

export const LixSettingsModal: React.FC<LixSettingsModalProps> = ({
  visible,
  onClose,
  playbackRate,
  onSelectSpeed,
  speedOptions = DEFAULT_SPEEDS,
  selectedQuality,
  onSelectQuality,
  qualityOptions = DEFAULT_QUALITIES,
  isLooping,
  onToggleLoop,
  themeColor = '#4F46E5',
}) => {
  const [tab, setTab] = useState<'main' | 'speed' | 'quality'>('main');

  const handleClose = () => {
    setTab('main');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={handleClose}
      >
        <View style={styles.sheet}>
          {/* A. MAIN SETTINGS TAB */}
          {tab === 'main' && (
            <View>
              <View style={styles.header}>
                <Text style={styles.title}>Playback Settings</Text>
                <TouchableOpacity onPress={handleClose} style={{ padding: 4 }}>
                  <X size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.menuList}>
                {/* Quality Row */}
                <TouchableOpacity
                  style={styles.menuRow}
                  onPress={() => setTab('quality')}
                  activeOpacity={0.75}
                >
                  <View style={styles.menuRowLeft}>
                    <Sliders size={18} color={themeColor} />
                    <Text style={styles.menuRowLabel}>Quality</Text>
                  </View>
                  <View style={styles.menuRowRight}>
                    <Text style={styles.menuRowValue}>{selectedQuality}</Text>
                    <ChevronRight size={16} color="#94A3B8" />
                  </View>
                </TouchableOpacity>

                {/* Speed Row */}
                <TouchableOpacity
                  style={styles.menuRow}
                  onPress={() => setTab('speed')}
                  activeOpacity={0.75}
                >
                  <View style={styles.menuRowLeft}>
                    <Gauge size={18} color={themeColor} />
                    <Text style={styles.menuRowLabel}>Playback Speed</Text>
                  </View>
                  <View style={styles.menuRowRight}>
                    <Text style={styles.menuRowValue}>
                      {playbackRate === 1.0 ? 'Normal (1.0x)' : `${playbackRate}x`}
                    </Text>
                    <ChevronRight size={16} color="#94A3B8" />
                  </View>
                </TouchableOpacity>

                {/* Loop Video Row */}
                <TouchableOpacity
                  style={styles.menuRow}
                  onPress={onToggleLoop}
                  activeOpacity={0.75}
                >
                  <View style={styles.menuRowLeft}>
                    <Repeat size={18} color={isLooping ? themeColor : '#64748B'} />
                    <Text style={styles.menuRowLabel}>Loop Video</Text>
                  </View>
                  <View style={styles.menuRowRight}>
                    <Text style={[styles.menuRowValue, isLooping && { color: themeColor, fontWeight: '800' }]}>
                      {isLooping ? 'On' : 'Off'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* B. QUALITY SELECTOR TAB */}
          {tab === 'quality' && (
            <View>
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.backBtn} 
                  onPress={() => setTab('main')}
                  activeOpacity={0.7}
                >
                  <ArrowLeft size={18} color="#0F172A" />
                  <Text style={styles.title}>Quality</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClose} style={{ padding: 4 }}>
                  <X size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionsList}>
                {qualityOptions.map((opt) => {
                  const isSelected = selectedQuality === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[styles.optionRow, isSelected && { backgroundColor: `${themeColor}15` }]}
                      onPress={() => {
                        onSelectQuality(opt.id);
                        handleClose();
                      }}
                      activeOpacity={0.75}
                    >
                      <Text style={[styles.optionText, isSelected && { color: themeColor, fontWeight: '800' }]}>
                        {opt.label}
                      </Text>
                      {isSelected && <Check size={16} color={themeColor} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* C. SPEED SELECTOR TAB */}
          {tab === 'speed' && (
            <View>
              <View style={styles.header}>
                <TouchableOpacity 
                  style={styles.backBtn} 
                  onPress={() => setTab('main')}
                  activeOpacity={0.7}
                >
                  <ArrowLeft size={18} color="#0F172A" />
                  <Text style={styles.title}>Playback Speed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClose} style={{ padding: 4 }}>
                  <X size={18} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              <View style={styles.optionsList}>
                {speedOptions.map((speed) => {
                  const isSelected = playbackRate === speed;
                  return (
                    <TouchableOpacity
                      key={speed}
                      style={[styles.optionRow, isSelected && { backgroundColor: `${themeColor}15` }]}
                      onPress={() => {
                        onSelectSpeed(speed);
                        setTab('main');
                        handleClose();
                      }}
                      activeOpacity={0.75}
                    >
                      <Text style={[styles.optionText, isSelected && { color: themeColor, fontWeight: '800' }]}>
                        {speed === 1.0 ? 'Normal (1.0x)' : `${speed}x`}
                      </Text>
                      {isSelected && <Check size={16} color={themeColor} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
