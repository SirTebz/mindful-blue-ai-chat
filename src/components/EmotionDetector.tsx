
import React from 'react';

interface EmotionDetectorProps {
  text: string;
}

const EmotionDetector = ({ text }: EmotionDetectorProps) => {
  // Simple emotion detection based on keywords
  const detectEmotion = (input: string): string => {
    const lowerText = input.toLowerCase();
    
    const emotions = {
      anxious: ['anxious', 'worried', 'nervous', 'panic', 'stressed', 'overwhelmed'],
      sad: ['sad', 'depressed', 'down', 'hopeless', 'empty', 'lost'],
      angry: ['angry', 'mad', 'frustrated', 'irritated', 'furious'],
      happy: ['happy', 'good', 'great', 'excited', 'joyful', 'content'],
      fearful: ['scared', 'afraid', 'terrified', 'frightened'],
      crisis: ['hurt myself', 'end it all', 'suicide', 'kill myself', 'don\'t want to live']
    };

    for (const [emotion, keywords] of Object.entries(emotions)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return emotion;
      }
    }

    return 'neutral';
  };

  const emotion = detectEmotion(text);
  
  // This component doesn't render anything visible, it just provides the emotion detection logic
  return null;
};

export { EmotionDetector };

export const detectEmotion = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  const emotions = {
    anxious: ['anxious', 'worried', 'nervous', 'panic', 'stressed', 'overwhelmed'],
    sad: ['sad', 'depressed', 'down', 'hopeless', 'empty', 'lost'],
    angry: ['angry', 'mad', 'frustrated', 'irritated', 'furious'],
    happy: ['happy', 'good', 'great', 'excited', 'joyful', 'content'],
    fearful: ['scared', 'afraid', 'terrified', 'frightened'],
    crisis: ['hurt myself', 'end it all', 'suicide', 'kill myself', 'don\'t want to live']
  };

  for (const [emotion, keywords] of Object.entries(emotions)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return emotion;
    }
  }

  return 'neutral';
};
