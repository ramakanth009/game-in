import React, { useState, useEffect, useRef } from 'react';
import { questions, careerPaths } from './data/gameData';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import AnimatedBackground from './components/AnimatedBackground';
import './App.css';

const App = () => {
  // Game states
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Reference to audio elements for smoother sound playback
  const swipeSoundRef = useRef(null);
  const startSoundRef = useRef(null);
  const resultSoundRef = useRef(null);
  const restartSoundRef = useRef(null);
  
  // User traits tracking
  const [userTraits, setUserTraits] = useState({
    creative: 0,
    analytical: 0,
    social: 0,
    technical: 0
  });
  
  // Career result
  const [careerResult, setCareerResult] = useState(null);

  // Initialize audio elements
  useEffect(() => {
    // In a real implementation, these would be actual sound files
    swipeSoundRef.current = new Audio();
    startSoundRef.current = new Audio();
    resultSoundRef.current = new Audio();
    restartSoundRef.current = new Audio();
  }, []);

  // Handle start game
  const handleStartGame = () => {
    setGameStarted(true);
    
    // Play start sound if enabled
    if (soundEnabled) {
      playSound('start');
    }
  };

  // Handle answer selection with smoother transition
  const handleSelectAnswer = (option) => {
    // Prevent multiple selections during transition
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    const question = questions[currentQuestionIndex];
    const traits = option === 'left' ? question.traits.option1 : question.traits.option2;
    
    // Update traits
    setUserTraits(prevTraits => {
      const updatedTraits = {...prevTraits};
      
      Object.keys(traits).forEach(trait => {
        updatedTraits[trait] += traits[trait];
      });
      
      return updatedTraits;
    });
    
    // Play swipe sound
    if (soundEnabled) {
      playSound('swipe');
    }
    
    // Use a timeout to delay the question change for smoother transitions
    setTimeout(() => {
      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        finishGame();
      }
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 400); // Timed to match card exit animation duration
  };

  // Play sound helper function (improved for better performance)
  const playSound = (soundType) => {
    if (!soundEnabled) return;
    
    let soundRef;
    switch (soundType) {
      case 'start':
        soundRef = startSoundRef.current;
        break;
      case 'swipe':
        soundRef = swipeSoundRef.current;
        break;
      case 'result':
        soundRef = resultSoundRef.current;
        break;
      case 'restart':
        soundRef = restartSoundRef.current;
        break;
      default:
        return;
    }
    
    // In a real implementation, this would play actual sounds
    // For now, just log the sound type
    console.log(`Playing ${soundType} sound`);
    
    // If this were real audio:
    // if (soundRef) {
    //   soundRef.currentTime = 0;
    //   soundRef.play().catch(e => console.log("Audio play error:", e));
    // }
  };

  // Calculate result and finish game
  const finishGame = () => {
    // Calculate which career path matches best
    const result = calculateResult();
    setCareerResult(result);
    setGameFinished(true);
    
    // Play results sound
    if (soundEnabled) {
      playSound('result');
    }
  };

  // Calculate career result based on traits
  const calculateResult = () => {
    // Normalize traits to percentages
    const maxPossibleValue = 100;
    const normalizedTraits = {
      creative: Math.min(100, (userTraits.creative / maxPossibleValue) * 100),
      analytical: Math.min(100, (userTraits.analytical / maxPossibleValue) * 100),
      social: Math.min(100, (userTraits.social / maxPossibleValue) * 100),
      technical: Math.min(100, (userTraits.technical / maxPossibleValue) * 100)
    };
    
    // Calculate match score for each career path
    const scores = {};
    Object.keys(careerPaths).forEach(path => {
      const pathData = careerPaths[path];
      const thresholds = pathData.thresholds;
      
      // Higher scores for traits that match or exceed thresholds
      let score = 0;
      Object.keys(thresholds).forEach(trait => {
        const traitValue = normalizedTraits[trait];
        const threshold = thresholds[trait];
        
        // Calculate how close the trait is to the threshold
        if (traitValue >= threshold) {
          // Full points if meets or exceeds threshold
          score += 100;
        } else {
          // Partial points based on how close
          score += (traitValue / threshold) * 100;
        }
      });
      
      scores[path] = score / Object.keys(thresholds).length;
    });
    
    // Find the highest scoring career path
    let highestScore = 0;
    let bestMatch = null;
    
    Object.keys(scores).forEach(path => {
      if (scores[path] > highestScore) {
        highestScore = scores[path];
        bestMatch = path;
      }
    });
    
    return {
      path: bestMatch,
      data: careerPaths[bestMatch],
      normalizedTraits: normalizedTraits,
      matchScore: Math.round(highestScore)
    };
  };

  // Restart game with smoother transition
  const handleRestartGame = () => {
    // Play restart sound first for immediate feedback
    if (soundEnabled) {
      playSound('restart');
    }
    
    // Use state transition flag to prevent action during animation
    setIsTransitioning(true);
    
    // Reset all game state with delayed timing for visual effect
    setTimeout(() => {
      setCurrentQuestionIndex(0);
      setUserTraits({
        creative: 0,
        analytical: 0,
        social: 0,
        technical: 0
      });
      setCareerResult(null);
      setGameFinished(false);
      setIsTransitioning(false);
    }, 300);
  };

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      
      
      
      <div className="content-wrapper">
        {!gameStarted ? (
          <WelcomeScreen onStartGame={handleStartGame} />
        ) : !gameFinished ? (
          <GameScreen 
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            question={questions[currentQuestionIndex]}
            userTraits={userTraits}
            onSelectAnswer={handleSelectAnswer}
            isTransitioning={isTransitioning}
          />
        ) : (
          <ResultsScreen 
            result={careerResult} 
            onRestart={handleRestartGame} 
          />
        )}
      </div>
    </div>
  );
};

export default App;