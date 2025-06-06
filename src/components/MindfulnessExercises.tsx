
import React, { useState, useEffect } from 'react';
import { Heart, Bookmark, BookmarkCheck, RotateCcw, ArrowRight, Pause, Play } from 'lucide-react';

interface MindfulnessExercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'breathing' | 'body-scan' | 'gratitude' | 'grounding' | 'mindful-moment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: ExerciseStep[];
}

interface ExerciseStep {
  id: string;
  instruction: string;
  duration?: number; // in seconds
  userPrompt?: string;
  adaptations?: {
    stressed: string;
    calm: string;
    anxious: string;
  };
}

interface MindfulnessExercisesProps {
  isVisible: boolean;
  onClose: () => void;
  userStressLevel?: 'low' | 'medium' | 'high';
  onExerciseComplete: (exerciseId: string, feedback: string) => void;
}

const MindfulnessExercises = ({ 
  isVisible, 
  onClose, 
  userStressLevel = 'medium',
  onExerciseComplete 
}: MindfulnessExercisesProps) => {
  const [selectedExercise, setSelectedExercise] = useState<MindfulnessExercise | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [userFeedback, setUserFeedback] = useState<string>('');
  const [bookmarkedExercises, setBookmarkedExercises] = useState<string[]>([]);
  const [stepFeedback, setStepFeedback] = useState<{[key: number]: string}>({});

  // Sample exercises with adaptive content
  const exercises: MindfulnessExercise[] = [
    {
      id: 'deep-breathing-4-7-8',
      title: '4-7-8 Breathing',
      description: 'A calming breathing technique to reduce anxiety and promote relaxation',
      duration: '3-5 minutes',
      category: 'breathing',
      difficulty: 'beginner',
      steps: [
        {
          id: 'intro',
          instruction: "Let's practice the 4-7-8 breathing technique. This simple exercise can help calm your nervous system. Find a comfortable position and close your eyes if you'd like.",
          userPrompt: "Are you ready to begin? Let me know when you're comfortable."
        },
        {
          id: 'preparation',
          instruction: "Place one hand on your chest and one on your belly. We'll be breathing deeply into your belly, not just your chest.",
          duration: 10,
          adaptations: {
            stressed: "Take a moment to notice any tension in your body. It's okay - we're going to work on releasing that together.",
            calm: "Great that you're feeling calm. This exercise will help deepen that sense of peace.",
            anxious: "I know this might feel overwhelming, but focus just on my voice and take this one breath at a time."
          }
        },
        {
          id: 'exhale-prep',
          instruction: "First, let's exhale completely through your mouth, making a whoosh sound. This empties your lungs.",
          duration: 5,
          userPrompt: "How did that feel? Did you feel the air leaving your lungs completely?"
        },
        {
          id: 'cycle-1',
          instruction: "Now inhale quietly through your nose for 4 counts... 1... 2... 3... 4...",
          duration: 4
        },
        {
          id: 'hold-1',
          instruction: "Hold your breath for 7 counts... 1... 2... 3... 4... 5... 6... 7...",
          duration: 7
        },
        {
          id: 'exhale-1',
          instruction: "Exhale through your mouth for 8 counts, making that whoosh sound... 1... 2... 3... 4... 5... 6... 7... 8...",
          duration: 8,
          userPrompt: "How was that first cycle? Did you feel a sense of release?"
        },
        {
          id: 'continue-cycles',
          instruction: "Perfect! Let's continue for 3 more cycles. Remember: Inhale for 4, hold for 7, exhale for 8. I'll guide you.",
          duration: 60,
          adaptations: {
            stressed: "If you feel dizzy, just breathe normally for a moment, then continue when ready.",
            calm: "You're doing wonderfully. Let each breath deepen your sense of calm.",
            anxious: "Focus only on counting with me. Don't worry about doing it perfectly."
          }
        },
        {
          id: 'completion',
          instruction: "Excellent work! Take a moment to notice how you feel now compared to when we started. Return to your natural breathing.",
          userPrompt: "How do you feel after completing this exercise? What did you notice about your stress or anxiety level?"
        }
      ]
    },
    {
      id: 'body-scan-quick',
      title: 'Quick Body Scan',
      description: 'A 5-minute body awareness exercise to release tension and increase mindfulness',
      duration: '5-7 minutes',
      category: 'body-scan',
      difficulty: 'beginner',
      steps: [
        {
          id: 'setup',
          instruction: "Let's do a quick body scan to help you tune into your physical sensations and release tension. Sit or lie down comfortably.",
          userPrompt: "Are you in a comfortable position? Let me know when you're ready to begin."
        },
        {
          id: 'head-face',
          instruction: "Start by bringing attention to the top of your head. Notice any sensations. Now your forehead - is it tense or relaxed? Let it soften. Notice your eyes, jaw, and let them relax.",
          duration: 20,
          userPrompt: "Did you notice any tension in your face or head? How does it feel now?"
        },
        {
          id: 'shoulders-arms',
          instruction: "Move your attention to your shoulders. Many of us hold stress here. Gently roll them back and let them drop. Feel your arms, from shoulders to fingertips.",
          duration: 20,
          adaptations: {
            stressed: "I bet your shoulders were holding a lot of tension. That's very common when we're stressed.",
            calm: "Notice how relaxed your shoulders can be when you're not actively thinking about them.",
            anxious: "Breathe into any tight spots. There's no rush - we have all the time we need."
          }
        },
        {
          id: 'chest-back',
          instruction: "Focus on your chest and back. Notice your heartbeat if you can. Is your back pressed against the chair or floor? Just observe without changing anything.",
          duration: 15,
          userPrompt: "What did you notice about your chest and back? Any areas that felt particularly tense or relaxed?"
        },
        {
          id: 'stomach-hips',
          instruction: "Bring attention to your stomach and hips. Notice if you're holding your stomach tight. Let it soften. Feel your hips settling into your seat.",
          duration: 15
        },
        {
          id: 'legs-feet',
          instruction: "Finally, scan down your legs to your feet. Feel your thighs, knees, calves, and feet. Wiggle your toes if you'd like.",
          duration: 15,
          userPrompt: "How do your legs and feet feel? Did scanning your body help you notice anything new?"
        },
        {
          id: 'whole-body',
          instruction: "Now take a moment to feel your whole body as one connected unit. You've just given yourself a gift of awareness and relaxation.",
          userPrompt: "How do you feel overall after this body scan? What's one word that describes your current state?"
        }
      ]
    },
    {
      id: 'gratitude-three-things',
      title: 'Three Things Gratitude',
      description: 'A simple practice to shift focus to positive aspects of your life',
      duration: '3-4 minutes',
      category: 'gratitude',
      difficulty: 'beginner',
      steps: [
        {
          id: 'intro',
          instruction: "We're going to practice gratitude by identifying three things you're grateful for today. This can help shift your mindset to notice positive aspects of your life.",
          userPrompt: "Are you ready to explore some things you're grateful for?"
        },
        {
          id: 'first-thing',
          instruction: "Think of the first thing you're grateful for today. It can be big or small - maybe it's a person, an experience, something in nature, or even just having a warm cup of coffee.",
          adaptations: {
            stressed: "When we're stressed, it can be hard to think of positive things. Start small - maybe you're grateful for this moment of pause.",
            calm: "Since you're feeling calm, you might notice gratitude coming easily. What feels most significant today?",
            anxious: "I know anxiety can make it hard to focus on positive things. Think of something very simple - even just being able to breathe."
          },
          userPrompt: "What's the first thing that comes to mind? Tell me about it."
        },
        {
          id: 'first-details',
          instruction: "Now think about why this thing matters to you. How does it make you feel? What would be different without it?",
          userPrompt: "What is it about this that makes you feel grateful?"
        },
        {
          id: 'second-thing',
          instruction: "Let's find a second thing you're grateful for. This time, try to think of something related to a person in your life - family, friend, colleague, or even a stranger who was kind.",
          userPrompt: "Who or what came to mind? How do they impact your life?"
        },
        {
          id: 'third-thing',
          instruction: "For your third gratitude, think of something about yourself. Maybe a strength you have, something you accomplished recently, or a quality you appreciate about yourself.",
          adaptations: {
            stressed: "This one can be tough when we're stressed. Maybe you're grateful for your resilience - you're here, seeking help and taking care of yourself.",
            calm: "What's something about yourself that you're proud of or appreciate?",
            anxious: "You're being very brave by taking time for self-care right now. That's something to be grateful for."
          },
          userPrompt: "What's something about yourself that you appreciate or are grateful for?"
        },
        {
          id: 'reflection',
          instruction: "Take a moment to hold all three of these things in your mind at once. Notice if there's a feeling of warmth or lightness that comes with gratitude.",
          userPrompt: "How do you feel after focusing on these three things? Did the exercise change your mood at all?"
        }
      ]
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else if (timeRemaining === 0 && isRunning) {
      setIsRunning(false);
      // Auto-advance to next step or prompt for feedback
      if (selectedExercise && currentStep < selectedExercise.steps.length - 1) {
        // Show user prompt if current step has one
        if (selectedExercise.steps[currentStep].userPrompt) {
          // Wait for user feedback before advancing
        } else {
          // Auto-advance to next step
          setCurrentStep(currentStep + 1);
          const nextStep = selectedExercise.steps[currentStep + 1];
          if (nextStep.duration) {
            setTimeRemaining(nextStep.duration);
            setIsRunning(true);
          }
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeRemaining, selectedExercise, currentStep]);

  const startExercise = (exercise: MindfulnessExercise) => {
    setSelectedExercise(exercise);
    setCurrentStep(0);
    setStepFeedback({});
    if (exercise.steps[0].duration) {
      setTimeRemaining(exercise.steps[0].duration);
      setIsRunning(true);
    }
  };

  const nextStep = () => {
    if (selectedExercise && currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextStepData = selectedExercise.steps[currentStep + 1];
      if (nextStepData.duration) {
        setTimeRemaining(nextStepData.duration);
        setIsRunning(true);
      }
    } else {
      // Exercise complete
      completeExercise();
    }
  };

  const toggleBookmark = (exerciseId: string) => {
    setBookmarkedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const completeExercise = () => {
    if (selectedExercise) {
      onExerciseComplete(selectedExercise.id, userFeedback);
      setSelectedExercise(null);
      setCurrentStep(0);
      setUserFeedback('');
    }
  };

  const restartExercise = () => {
    setCurrentStep(0);
    setStepFeedback({});
    setIsRunning(false);
    setTimeRemaining(0);
    if (selectedExercise?.steps[0].duration) {
      setTimeRemaining(selectedExercise.steps[0].duration);
      setIsRunning(true);
    }
  };

  const getAdaptedInstruction = (step: ExerciseStep): string => {
    if (!step.adaptations) return step.instruction;
    
    switch (userStressLevel) {
      case 'high':
        return step.adaptations.stressed || step.instruction;
      case 'low':
        return step.adaptations.calm || step.instruction;
      default:
        return step.adaptations.anxious || step.instruction;
    }
  };

  if (!isVisible) return null;

  if (selectedExercise) {
    const currentStepData = selectedExercise.steps[currentStep];
    const isLastStep = currentStep === selectedExercise.steps.length - 1;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-900">{selectedExercise.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => toggleBookmark(selectedExercise.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                {bookmarkedExercises.includes(selectedExercise.id) ? 
                  <BookmarkCheck className="w-5 h-5" /> : 
                  <Bookmark className="w-5 h-5" />
                }
              </button>
              <button
                onClick={restartExercise}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Restart exercise"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-blue-600 mb-2">
              <span>Step {currentStep + 1} of {selectedExercise.steps.length}</span>
              {currentStepData.duration && timeRemaining > 0 && (
                <span>{timeRemaining}s remaining</span>
              )}
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / selectedExercise.steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Timer circle for timed steps */}
          {currentStepData.duration && timeRemaining > 0 && (
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20">
                <div className="w-20 h-20 rounded-full border-4 border-blue-200 flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-900">{timeRemaining}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step instruction */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900 leading-relaxed">
              {getAdaptedInstruction(currentStepData)}
            </p>
          </div>

          {/* User prompt and feedback */}
          {currentStepData.userPrompt && !isRunning && (
            <div className="mb-4">
              <p className="text-blue-800 mb-3 font-medium">{currentStepData.userPrompt}</p>
              <textarea
                value={stepFeedback[currentStep] || ''}
                onChange={(e) => setStepFeedback(prev => ({
                  ...prev,
                  [currentStep]: e.target.value
                }))}
                placeholder="Share your experience..."
                className="w-full p-3 border border-blue-200 rounded-lg text-sm"
                rows={3}
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedExercise(null)}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Exercises
            </button>
            
            {currentStepData.duration && timeRemaining > 0 ? (
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Pause' : 'Resume'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={currentStepData.userPrompt && !stepFeedback[currentStep]}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLastStep ? 'Complete' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-900">Mindfulness Exercises</h2>
            <p className="text-blue-600 text-sm">Choose an exercise to help you feel more centered and calm</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-blue-900">{exercise.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {exercise.difficulty}
                    </span>
                    {bookmarkedExercises.includes(exercise.id) && (
                      <BookmarkCheck className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm text-blue-700 mb-2">{exercise.description}</p>
                  <div className="flex items-center gap-4 text-xs text-blue-600">
                    <span>{exercise.duration}</span>
                    <span className="capitalize">{exercise.category.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <button
                    onClick={() => toggleBookmark(exercise.id)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    {bookmarkedExercises.includes(exercise.id) ? 
                      <BookmarkCheck className="w-4 h-4" /> : 
                      <Bookmark className="w-4 h-4" />
                    }
                  </button>
                  <button
                    onClick={() => startExercise(exercise)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookmarkedExercises.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Your Bookmarked Exercises
            </h3>
            <p className="text-sm text-blue-700">
              You have {bookmarkedExercises.length} bookmarked exercise{bookmarkedExercises.length !== 1 ? 's' : ''} that you can quickly access anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindfulnessExercises;
