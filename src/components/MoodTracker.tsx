import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SmilePlus, Frown, Meh, Smile, Heart } from 'lucide-react';

interface MoodTrackerProps {
  isVisible: boolean;
  onClose: () => void;
  onMoodSubmit: (mood: number, note: string) => void;
  currentMood: number | null;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ isVisible, onClose, onMoodSubmit, currentMood }) => {
  const [mood, setMood] = useState(currentMood || 5);
  const [note, setNote] = useState('');

  if (!isVisible) return null;

  const getMoodIcon = (value: number) => {
    if (value <= 2) return <Frown className="w-8 h-8 text-red-400" />;
    if (value <= 4) return <Meh className="w-8 h-8 text-orange-400" />;
    if (value <= 6) return <Smile className="w-8 h-8 text-yellow-400" />;
    if (value <= 8) return <SmilePlus className="w-8 h-8 text-green-400" />;
    return <Heart className="w-8 h-8 text-pink-400" />;
  };

  const getMoodLabel = (value: number) => {
    if (value <= 2) return 'Very Low';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Neutral';
    if (value <= 8) return 'Good';
    return 'Excellent';
  };

  const getMoodColor = (value: number) => {
    if (value <= 2) return 'bg-red-100 dark:bg-red-900/30';
    if (value <= 4) return 'bg-orange-100 dark:bg-orange-900/30';
    if (value <= 6) return 'bg-yellow-100 dark:bg-yellow-900/30';
    if (value <= 8) return 'bg-green-100 dark:bg-green-900/30';
    return 'bg-pink-100 dark:bg-pink-900/30';
  };

  const handleSubmit = () => {
    onMoodSubmit(mood, note);
    setNote('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-md p-6 ${getMoodColor(mood)} border-none shadow-xl`}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">How are you feeling?</h2>
          <p className="text-muted-foreground text-sm">Track your mood to help personalize your experience</p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            {getMoodIcon(mood)}
            <span className="text-2xl font-bold text-foreground">{mood}/10</span>
          </div>
          <span className="text-lg font-medium text-foreground">{getMoodLabel(mood)}</span>
        </div>

        <div className="px-4 mb-6">
          <Slider
            value={[mood]}
            onValueChange={(value) => setMood(value[0])}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Very Low</span>
            <span>Excellent</span>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's on your mind? (optional)"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Skip
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Log Mood
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;
