import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { LixPlayerProps } from './types';
import { LixControls } from './components/LixControls';
import { LixSettingsModal } from './components/LixSettingsModal';

export const LixPlayer: React.FC<LixPlayerProps> = ({
  source,
  poster,
  autoPlay = true,
  loop = false,
  contentFit = 'contain',
  themeColor = '#4F46E5',
  speedOptions,
  qualityOptions,
  contentId,
  enableAds = false,
  renderAdOverlay,
  enablePictureInPicture = true,
  onPictureInPicturePress,
  onEnded,
  onTimeUpdate,
  style,
}) => {
  const [showAd, setShowAd] = useState(enableAds && !!renderAdOverlay);
  const [isPlaying, setIsPlaying] = useState(autoPlay && !showAd);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [isMuted, setIsMuted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [seekFeedback, setSeekFeedback] = useState<string | null>(null);

  const containerRef = useRef<any>(null);
  const videoViewRef = useRef<any>(null);
  const hideControlsTimer = useRef<any>(null);
  const seekFeedbackTimer = useRef<any>(null);

  // Initialize native expo-video player instance
  const nativePlayer = useVideoPlayer(source || '', (p) => {
    p.loop = isLooping;
    if (autoPlay && source && !showAd) {
      try { p.play(); } catch (_) {}
    }
  });

  // Sync native player status & timestamps
  useEffect(() => {
    if (!nativePlayer) return;

    const sub = nativePlayer.addListener('statusChange', (status: any) => {
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
        if (nativePlayer.playing !== undefined) setIsPlaying(nativePlayer.playing);
        if (nativePlayer.currentTime !== undefined && Number.isFinite(nativePlayer.currentTime)) {
          setCurrentTime(nativePlayer.currentTime);
          if (onTimeUpdate) {
            onTimeUpdate(nativePlayer.currentTime, nativePlayer.duration || duration);
          }
        }
        if (nativePlayer.duration !== undefined && Number.isFinite(nativePlayer.duration) && nativePlayer.duration > 0) {
          setDuration(nativePlayer.duration);
        }
      } catch (_) {}
    }, 300);

    return () => {
      clearInterval(interval);
      if (sub && typeof sub.remove === 'function') sub.remove();
    };
  }, [nativePlayer, duration, onEnded, onTimeUpdate]);

  // Auto-hide controls timer
  const resetHideTimer = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (!isLocked && isPlaying) {
      hideControlsTimer.current = setTimeout(() => setShowControls(false), 3500);
    }
  }, [isLocked, isPlaying]);

  // Play / Pause toggle
  const togglePlayPause = (e?: any) => {
    e?.stopPropagation?.();
    if (nativePlayer) {
      try {
        if (nativePlayer.playing) {
          nativePlayer.pause();
          setIsPlaying(false);
        } else {
          nativePlayer.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn('LixPlayer play error:', err);
      }
    }
    resetHideTimer();
  };

  // Seek by relative seconds (-10s / +10s)
  const handleSeekBy = (seconds: number, e?: any) => {
    e?.stopPropagation?.();
    const cur = Number(nativePlayer?.currentTime) || currentTime || 0;
    const dur = Number(nativePlayer?.duration) || duration || 0;
    const target = Math.max(0, dur > 0 ? Math.min(dur, cur + seconds) : cur + seconds);

    setCurrentTime(target);

    if (seekFeedbackTimer.current) clearTimeout(seekFeedbackTimer.current);
    setSeekFeedback(seconds > 0 ? `+${seconds}s` : `${seconds}s`);
    seekFeedbackTimer.current = setTimeout(() => setSeekFeedback(null), 800);

    if (nativePlayer) {
      try {
        nativePlayer.currentTime = target;
        if (typeof (nativePlayer as any).seekBy === 'function') {
          (nativePlayer as any).seekBy(seconds);
        }
      } catch (err) {
        console.warn('LixPlayer seek error:', err);
      }
    }
    resetHideTimer();
  };

  // Seek to absolute timestamp
  const handleSeek = (targetSec: number) => {
    if (!Number.isFinite(targetSec)) return;
    setCurrentTime(targetSec);
    if (nativePlayer) {
      try { nativePlayer.currentTime = targetSec; } catch (_) {}
    }
    resetHideTimer();
  };

  // Change speed
  const handleSelectSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (nativePlayer) {
      try { nativePlayer.playbackRate = speed; } catch (_) {}
    }
    resetHideTimer();
  };

  // Toggle Mute
  const toggleMute = (e?: any) => {
    e?.stopPropagation?.();
    const next = !isMuted;
    setIsMuted(next);
    if (nativePlayer) {
      try { nativePlayer.muted = next; } catch (_) {}
    }
    resetHideTimer();
  };

  // Toggle Fullscreen
  const toggleFullscreen = async (e?: any) => {
    e?.stopPropagation?.();
    try {
      if (isFullscreen) {
        if (videoViewRef.current?.exitFullscreen) await videoViewRef.current.exitFullscreen();
        setIsFullscreen(false);
      } else {
        if (videoViewRef.current?.enterFullscreen) await videoViewRef.current.enterFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.warn('LixPlayer fullscreen error:', err);
      setIsFullscreen((prev) => !prev);
    }
    resetHideTimer();
  };

  // Toggle Picture-in-Picture
  const togglePictureInPicture = async (e?: any) => {
    e?.stopPropagation?.();
    if (onPictureInPicturePress) {
      onPictureInPicturePress();
      return;
    }
    try {
      if (videoViewRef.current && typeof (videoViewRef.current as any).startPictureInPicture === 'function') {
        await (videoViewRef.current as any).startPictureInPicture();
      }
    } catch (err) {
      console.warn('LixPlayer Picture-in-Picture error:', err);
    }
    resetHideTimer();
  };

  return (
    <View 
      ref={containerRef} 
      style={[
        styles.playerContainer, 
        style,
        isFullscreen && styles.fullscreenPlayer
      ]}
    >
      {/* 1. Underlying Native Video View */}
      <VideoView
        ref={videoViewRef}
        player={nativePlayer}
        style={[styles.nativeVideo, isFullscreen && styles.fullscreenVideo]}
        contentFit={contentFit}
        nativeControls={false}
        fullscreenOptions={{ enable: true }}
        showsTimecodes={true}
        allowsPictureInPicture={enablePictureInPicture}
        onFullscreenEnter={() => setIsFullscreen(true)}
        onFullscreenExit={() => setIsFullscreen(false)}
      />

      {/* 2. Optional Ad Overlay */}
      {showAd && renderAdOverlay && renderAdOverlay({
        onAdComplete: () => {
          setShowAd(false);
          try { nativePlayer?.play(); } catch (_) {}
        },
        isMuted,
        onToggleMute: toggleMute,
      })}

      {/* 3. Tap surface to reveal controls when hidden */}
      {!showControls && !isLocked && !showAd && (
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => {
            setShowControls(true);
            resetHideTimer();
          }}
          style={StyleSheet.absoluteFill} 
        />
      )}

      {/* 4. Controls Overlay */}
      {!showAd && (
        <LixControls
          isPlaying={isPlaying}
          isBuffering={isBuffering}
          currentTime={currentTime}
          duration={duration}
          buffered={buffered}
          playbackRate={playbackRate}
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          isLocked={isLocked}
          showControls={showControls}
          seekFeedback={seekFeedback}
          themeColor={themeColor}
          enablePictureInPicture={enablePictureInPicture}
          onTogglePlayPause={togglePlayPause}
          onSeekBy={handleSeekBy}
          onSeek={handleSeek}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullscreen}
          onTogglePictureInPicture={togglePictureInPicture}
          onToggleLock={() => setIsLocked((prev) => !prev)}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {/* 5. Settings Modal Sheet */}
      <LixSettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        playbackRate={playbackRate}
        onSelectSpeed={handleSelectSpeed}
        speedOptions={speedOptions}
        selectedQuality={selectedQuality}
        onSelectQuality={(q) => setSelectedQuality(q)}
        qualityOptions={qualityOptions}
        isLooping={isLooping}
        themeColor={themeColor}
        onToggleLoop={() => {
          const next = !isLooping;
          setIsLooping(next);
          if (nativePlayer) nativePlayer.loop = next;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    position: (Platform.OS === 'web' ? 'fixed' : 'absolute') as any,
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

export default LixPlayer;
