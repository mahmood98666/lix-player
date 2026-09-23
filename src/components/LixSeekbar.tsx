import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LixSeekbarProps } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LixSeekbar: React.FC<LixSeekbarProps> = ({
  currentTime,
  duration,
  buffered,
  themeColor = '#4F46E5',
  onSeek,
}) => {
  const seekbarRef = useRef<any>(null);
  const [seekbarWidth, setSeekbarWidth] = useState(0);

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const bufferedPercent = Math.min(100, Math.max(0, buffered * 100));

  const handleTouch = (e: any) => {
    e?.stopPropagation?.();
    let touchX = 0;

    if (Platform.OS === 'web' && e?.nativeEvent) {
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
    } else if (e?.nativeEvent?.offsetX !== undefined && !isNaN(e.nativeEvent.offsetX)) {
      touchX = e.nativeEvent.offsetX;
    }

    if (isNaN(touchX) || touchX < 0) touchX = 0;
    const width = seekbarWidth > 0 ? seekbarWidth : (SCREEN_WIDTH > 480 ? 440 : SCREEN_WIDTH - 32);

    if (width > 0 && Number.isFinite(duration) && duration > 0) {
      const fraction = Math.min(Math.max(0, touchX / width), 1);
      if (Number.isFinite(fraction)) {
        onSeek(fraction * duration);
      }
    }
  };

  return (
    <TouchableOpacity
      ref={seekbarRef}
      style={styles.container}
      onPress={handleTouch}
      onLayout={(e) => setSeekbarWidth(e.nativeEvent.layout.width)}
      activeOpacity={0.9}
    >
      <View style={styles.trackBackground}>
        <View style={[styles.bufferTrack, { width: `${bufferedPercent}%` }]} />
        <View style={[styles.progressTrack, { width: `${progressPercent}%`, backgroundColor: themeColor }]} />
      </View>
      <View style={[styles.knob, { left: `${Math.max(0, Math.min(progressPercent, 98))}%` }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
