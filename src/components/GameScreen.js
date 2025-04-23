import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import ProgressBar from './ProgressBar';
import PersonalityMeters from './PersonalityMeters';
import Card from './Card';
import './GameScreen.css';

const GameScreen = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  question, 
  userTraits, 
  onSelectAnswer,
  isTransitioning
}) => {
  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const [previousQuestion, setPreviousQuestion] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  
  const gameContainerRef = useRef(null);
  const cardRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  const cardContainerRef = useRef(null);
  
  // Track previous question for determining animation direction
  useEffect(() => {
    if (!isFirstRender) {
      setPreviousQuestion(question);
      setPreviousIndex(currentQuestionIndex);
    } else {
      setIsFirstRender(false);
    }
  }, [question, currentQuestionIndex]);
  
  // Initial entry animation - only runs once
  useEffect(() => {
    anime({
      targets: gameContainerRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuad'
    });
    
    anime({
      targets: cardRef.current,
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: 300,
      duration: 800,
      easing: 'easeOutElastic(1.2, 0.8)'
    });
    
    anime({
      targets: [noButtonRef.current, yesButtonRef.current],
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(150, {start: 600}),
      duration: 600,
      easing: 'easeOutQuad'
    });
  }, []);
  
  // Handle new card entry animation when question changes
  useEffect(() => {
    if (cardRef.current && !isFirstRender && previousQuestion !== question) {
      // Determine if we're moving forward or backward
      const isMovingForward = previousIndex !== null && currentQuestionIndex > previousIndex;
      
      // Set the initial position for the new card based on the direction
      const initialPosition = isMovingForward ? '100%' : '-100%';
      const initialRotation = isMovingForward ? '10deg' : '-10deg';
      
      // Set initial state for the new card (off-screen)
      anime.set(cardRef.current, {
        translateX: initialPosition,
        rotate: initialRotation,
        opacity: 0,
        scale: 0.95
      });
      
      // Animate the new card into position with a smooth entrance
      anime({
        targets: cardRef.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 500,
        easing: 'easeOutCubic',
        delay: 50 // Brief delay for sequential animation
      });
    }
  }, [question, previousQuestion, currentQuestionIndex, previousIndex, isFirstRender]);
  
  // Handle card swipe animation
  const handleSwipe = (direction) => {
    if (isTransitioning) return;
    
    setLastSwipeDirection(direction);
    
    // Trigger the parent component's handler
    onSelectAnswer(direction);
  };

  return (
    <div className="game-screen" ref={gameContainerRef}>
      <div className="game-header">
        <h1 className="game-title">Tech Career Path Finder</h1>
        
        <ProgressBar 
          currentQuestion={currentQuestionIndex + 1} 
          totalQuestions={totalQuestions} 
        />
        
        <PersonalityMeters traits={userTraits} />
      </div>
      
      <div className="game-container" ref={cardContainerRef}>
        <Card 
          ref={cardRef}
          question={question} 
          onSwipe={handleSwipe}
          isTransitioning={isTransitioning}
        />
      </div>
      
      <div className="controls">
        <button 
          className="control-button no-button" 
          ref={noButtonRef}
          onClick={() => handleSwipe('left')}
          aria-label="Choose first option"
          disabled={isTransitioning}
        >
          <i className="fas fa-arrow-left"></i>
          <span className="button-tooltip">First Option</span>
        </button>
        
        <button 
          className="control-button yes-button" 
          ref={yesButtonRef}
          onClick={() => handleSwipe('right')}
          aria-label="Choose second option"
          disabled={isTransitioning}
        >
          <i className="fas fa-arrow-right"></i>
          <span className="button-tooltip">Second Option</span>
        </button>
      </div>
    </div>
  );
};

export default GameScreen;