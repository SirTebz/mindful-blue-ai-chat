
import React, { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  isActive: boolean;
  onComplete: () => void;
}

const BreathingExercise = ({ isActive, onComplete }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isActive || !isRunning) return;

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            setPhase('inhale');
            setCycle(prev => prev + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isRunning, phase]);

  useEffect(() => {
    if (cycle >= 3) {
      setIsRunning(false);
      setTimeout(onComplete, 1000);
    }
  }, [cycle, onComplete]);

  if (!isActive) return null;

  const startExercise = () => {
    setIsRunning(true);
    setPhase('inhale');
    setCount(4);
    setCycle(0);
  };

  return (
    <div className="fixed inset-0 bg-blue-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="mb-8">
          <div className={`w-32 h-32 mx-auto rounded-full border-4 border-white transition-all duration-1000 ${
            phase === 'inhale' ? 'scale-150 bg-blue-400' : 
            phase === 'hold' ? 'scale-150 bg-blue-500' : 
            'scale-100 bg-blue-600'
          }`}></div>
        </div>
        
        {!isRunning ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Breathing Exercise</h2>
            <p className="mb-6 text-blue-200">
              Let's practice some deep breathing to help you feel calmer.
            </p>
            <button
              onClick={startExercise}
              className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Start Exercise
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-2 capitalize">{phase}</h2>
            <div className="text-6xl font-bold mb-4">{count}</div>
            <div className="text-blue-200">
              Cycle {cycle + 1} of 3
            </div>
            {phase === 'inhale' && <p className="text-blue-200 mt-2">Breathe in slowly...</p>}
            {phase === 'hold' && <p className="text-blue-200 mt-2">Hold your breath...</p>}
            {phase === 'exhale' && <p className="text-blue-200 mt-2">Breathe out slowly...</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
