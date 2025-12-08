import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from 'lucide-react';

interface MeditationTimerProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (duration: number) => void;
}

const PRESET_DURATIONS = [
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: 180 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
];

const MeditationTimer: React.FC<MeditationTimerProps> = ({ isVisible, onClose, onComplete }) => {
  const [selectedDuration, setSelectedDuration] = useState(180);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = useCallback(() => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 528;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2);
    }
  }, [soundEnabled]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playSound();
            onComplete(selectedDuration);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedDuration, onComplete, playSound]);

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration);
    setHasStarted(false);
  };

  const handleDurationSelect = (seconds: number) => {
    if (!isRunning) {
      setSelectedDuration(seconds);
      setTimeLeft(seconds);
      setHasStarted(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-none shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Meditation Timer</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-muted-foreground"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Duration selector */}
        <div className="flex gap-2 mb-8">
          {PRESET_DURATIONS.map((preset) => (
            <Button
              key={preset.seconds}
              variant={selectedDuration === preset.seconds ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDurationSelect(preset.seconds)}
              disabled={isRunning}
              className="flex-1"
            >
              {preset.label}
            </Button>
          ))}
        </div>

        {/* Timer display */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={553}
              strokeDashoffset={553 - (progress / 100) * 553}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{formatTime(timeLeft)}</span>
            <span className="text-sm text-muted-foreground mt-1">
              {hasStarted ? (isRunning ? 'Breathe...' : 'Paused') : 'Ready'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="w-12 h-12 rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            onClick={isRunning ? handlePause : handleStart}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Find a comfortable position and focus on your breath
        </p>
      </Card>
    </div>
  );
};

export default MeditationTimer;
