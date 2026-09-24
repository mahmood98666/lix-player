import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Lock, 
  Unlock 
} from 'lucide-react-native';
import { LixControlsProps } from '../types';
import { LixSeekbar } from './LixSeekbar';

const formatTime = (seconds: number = 0) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;

  if (hrs > 0) {
    return `${hrs}:${remMins < 10 ? '0' : ''}${remMins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const PipMiniIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = '#FFFFFF' }) => (
  <View
    style={{
      width: size,
      height: (size * 14) / 18,
      borderWidth: 1.6,
      borderColor: color,
      borderRadius: 2.5,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 1.5,
    }}
  >
    <View
      style={{
        width: size * 0.45,
        height: size * 0.35,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  </View>
);

export const LixControls: React.FC<LixControlsProps> = ({
  isPlaying,
  isBuffering,
  currentTime,
  duration,
  buffered,
  playbackRate,
  isMuted,
  isFullscreen,
  isLocked,
  showControls,
  seekFeedback,
  themeColor = '#4F46E5',
  enablePictureInPicture = true,
  onTogglePlayPause,
  onSeekBy,
  onSeek,
  onToggleMute,
  onToggleFullscreen,
  onTogglePictureInPicture,
  onToggleLock,
  onOpenSettings,
}) => {
  // If locked, show only the unlock button
  if (isLocked) {
    if (!showControls) return null;
    return (
      <View style={styles.lockedOverlay}>
        <TouchableOpacity 
          style={styles.unlockBtn} 
          onPress={onToggleLock}
          activeOpacity={0.85}
        >
          <Unlock size={18} color="#FFFFFF" />
          <Text style={styles.unlockBtnText}>Tap to Unlock Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!showControls) return null;

  return (
    <View style={styles.controlsOverlay}>
      {/* 1. TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          {playbackRate !== 1.0 && (
            <View style={[styles.speedBadgeTop, { backgroundColor: themeColor }]}>
              <Text style={styles.speedBadgeTopText}>{playbackRate}x</Text>
            </View>
          )}
        </View>

        <View style={styles.topBarRight}>
          <TouchableOpacity 
            style={styles.iconCircleBtn} 
            onPress={onToggleLock}
            activeOpacity={0.75}
          >
            <Lock size={16} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.iconCircleBtn} 
            onPress={onOpenSettings}
            activeOpacity={0.75}
          >
            <Settings size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. CENTER PLAYBACK ROW */}
      <View style={styles.centerRow}>
        {/* -10s Rewind */}
        <TouchableOpacity 
          style={styles.skipBtn} 
          onPress={(e) => onSeekBy(-10, e)}
          activeOpacity={0.75}
        >
          <RotateCcw size={24} color="#FFFFFF" />
          <Text style={styles.skipBtnText}>10</Text>
        </TouchableOpacity>

        {/* Main Play / Pause Circle */}
        <TouchableOpacity 
          style={[styles.mainPlayBtn, { backgroundColor: themeColor, shadowColor: themeColor }]} 
          onPress={onTogglePlayPause}
          activeOpacity={0.85}
        >
          {isBuffering ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : isPlaying ? (
            <Pause size={28} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Play size={28} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 3 }} />
          )}
        </TouchableOpacity>

        {/* +10s Fast Forward */}
        <TouchableOpacity 
          style={styles.skipBtn} 
          onPress={(e) => onSeekBy(10, e)}
          activeOpacity={0.75}
        >
          <RotateCw size={24} color="#FFFFFF" />
          <Text style={styles.skipBtnText}>10</Text>
        </TouchableOpacity>
      </View>

      {/* 3. SEEK FEEDBACK BUBBLE */}
      {seekFeedback && (
        <View style={styles.seekFeedbackOverlay} pointerEvents="none">
          <View style={styles.seekFeedbackBubble}>
            <Text style={styles.seekFeedbackText}>{seekFeedback}</Text>
          </View>
        </View>
      )}

      {/* 4. BOTTOM BAR: TIMELINE + ROW */}
      <View style={styles.bottomBar}>
        <LixSeekbar
          currentTime={currentTime}
          duration={duration}
          buffered={buffered}
          themeColor={themeColor}
          onSeek={onSeek}
        />

        <View style={styles.bottomControlsRow}>
          <View style={styles.bottomControlsLeft}>
            {/* Play/Pause Mini Toggle */}
            <TouchableOpacity onPress={onTogglePlayPause} style={styles.miniBtn} activeOpacity={0.75}>
              {isPlaying ? (
                <Pause size={18} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </TouchableOpacity>

            {/* Mute Toggle */}
            <TouchableOpacity onPress={onToggleMute} style={styles.miniBtn} activeOpacity={0.75}>
              {isMuted ? (
                <VolumeX size={18} color="#EF4444" />
              ) : (
                <Volume2 size={18} color="#FFFFFF" />
              )}
            </TouchableOpacity>

            {/* Timestamps */}
            <Text style={styles.timeText}>
              {formatTime(currentTime)} <Text style={{ color: '#94A3B8' }}>/ {formatTime(duration)}</Text>
            </Text>
          </View>

          <View style={styles.bottomControlsRight}>
            {/* Picture-in-Picture / Mini-Player Toggle */}
            {enablePictureInPicture && onTogglePictureInPicture && (
              <TouchableOpacity onPress={onTogglePictureInPicture} style={styles.miniBtn} activeOpacity={0.75}>
                <PipMiniIcon size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}

            {/* Fullscreen Toggle */}
            <TouchableOpacity onPress={onToggleFullscreen} style={styles.miniBtn} activeOpacity={0.75}>
              {isFullscreen ? (
                <Minimize size={18} color="#FFFFFF" />
              ) : (
                <Maximize size={18} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  unlockBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
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
