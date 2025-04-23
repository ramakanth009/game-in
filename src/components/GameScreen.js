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
  onSelectAnswer 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastSwipeDirection, setLastSwipeDirection] = useState(null);
  const gameContainerRef = useRef(null);
  const cardRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  
  useEffect(() => {
    // Update the entry animation values
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
  
  // Handle card swipe animation
  const handleSwipe = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLastSwipeDirection(direction);
    
    const card = cardRef.current;
    
    const swipeAnimation = anime({
      targets: card,
      translateX: direction === 'left' ? '-150%' : '150%',
      rotate: direction === 'left' ? '-30deg' : '30deg',
      opacity: 0,
      scale: 0.8,
      duration: 600,
      easing: 'easeOutCubic',
      complete: () => {
        onSelectAnswer(direction);
        setIsAnimating(false);
      }
    });
    
    swipeAnimation.play();
  };
  
  // Handle new card entry animation when question changes
  useEffect(() => {
    if (cardRef.current && lastSwipeDirection) {
      anime({
        targets: cardRef.current,
        translateX: [lastSwipeDirection === 'left' ? '100%' : '-100%', 0],
        rotate: [lastSwipeDirection === 'left' ? '30deg' : '-30deg', 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 600,
        easing: 'easeOutCubic'
      });
    }
  }, [currentQuestionIndex, lastSwipeDirection]);

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
      
      <div className="game-container">
        <Card 
          ref={cardRef}
          question={question} 
          onSwipe={handleSwipe}
        />
      </div>
      
      <div className="controls">
        <button 
          className="control-button no-button" 
          ref={noButtonRef}
          onClick={() => handleSwipe('left')}
          aria-label="Choose first option"
        >
          <i className="fas fa-arrow-left"></i>
          <span className="button-tooltip">First Option</span>
        </button>
        
        <button 
          className="control-button yes-button" 
          ref={yesButtonRef}
          onClick={() => handleSwipe('right')}
          aria-label="Choose second option"
        >
          <i className="fas fa-arrow-right"></i>
          <span className="button-tooltip">Second Option</span>
        </button>
      </div>
    </div>
  );
};

export default GameScreen;