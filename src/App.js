import React, { useState, useEffect } from 'react';
import { questions, careerPaths } from './data/gameData';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import AnimatedBackground from './components/AnimatedBackground';
import SoundToggle from './components/SoundToggle';

const App = () => {
  // Game states
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // User traits tracking
  const [userTraits, setUserTraits] = useState({
    creative: 0,
    analytical: 0,
    social: 0,
    technical: 0
  });
  
  // Career result
  const [careerResult, setCareerResult] = useState(null);

  // Handle start game
  const handleStartGame = () => {
    setGameStarted(true);
    
    // Play start sound if enabled
    if (soundEnabled) {
      playSound('/sounds/game-start.mp3');
    }
  };

  // Handle answer selection
  const handleSelectAnswer = (option) => {
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
      playSound('/sounds/swipe.mp3');
    }
    
    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      finishGame();
    }
  };

  // Play sound helper function
  const playSound = (src) => {
    const sound = new Audio(src);
    sound.play().catch(e => console.log('Audio play prevented:', e));
  };

  // Calculate result and finish game
  const finishGame = () => {
    // Calculate which career path matches best
    const result = calculateResult();
    setCareerResult(result);
    setGameFinished(true);
    
    // Play results sound
    if (soundEnabled) {
      playSound('/sounds/result.mp3');
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
      normalizedTraits: normalizedTraits
    };
  };

  // Restart game
  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setUserTraits({
      creative: 0,
      analytical: 0,
      social: 0,
      technical: 0
    });
    setCareerResult(null);
    setGameFinished(false);
  };

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      
      <SoundToggle 
        soundEnabled={soundEnabled} 
        toggleSound={toggleSound} 
      />
      
      {!gameStarted ? (
        <WelcomeScreen onStartGame={handleStartGame} />
      ) : !gameFinished ? (
        <GameScreen 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          question={questions[currentQuestionIndex]}
          userTraits={userTraits}
          onSelectAnswer={handleSelectAnswer}
        />
      ) : (
        <ResultsScreen 
          result={careerResult} 
          onRestart={handleRestartGame} 
        />
      )}
    </div>
  );
};

export default App;