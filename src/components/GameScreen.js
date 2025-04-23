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
      translateY: [50, 0], // Increased from 30 to 50 for more noticeable effect
      duration: 1000,
      easing: 'easeOutQuad'
    });
    
    anime({
      targets: cardRef.current,
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: 500,
      duration: 1000,
      easing: 'easeOutElastic(1.2, 0.8)'
    });
    
    anime({
      targets: [noButtonRef.current, yesButtonRef.current],
      opacity: [0, 1],
      translateY: [30, 0], // Increased from 20 to 30
      delay: anime.stagger(150, {start: 1000}),
      duration: 800,
      easing: 'easeOutQuad'
    });
  }, []);
  
  // Setup button hover animations
  useEffect(() => {
    const setupButtonAnimation = (buttonRef, scale, color) => {
      const hoverAnimation = anime({
        targets: buttonRef.current,
        scale: scale,
        backgroundColor: color,
        color: '#ffffff',
        duration: 300,
        autoplay: false,
        easing: 'easeOutQuad'
      });
      
      const leaveAnimation = anime({
        targets: buttonRef.current,
        scale: 1,
        backgroundColor: '#ffffff',
        color: color,
        duration: 300,
        autoplay: false,
        easing: 'easeOutQuad'
      });
      
      const button = buttonRef.current;
      
      button.addEventListener('mouseenter', () => hoverAnimation.play());
      button.addEventListener('mouseleave', () => leaveAnimation.play());
      
      return () => {
        button.removeEventListener('mouseenter', () => hoverAnimation.play());
        button.removeEventListener('mouseleave', () => leaveAnimation.play());
      };
    };
    
    setupButtonAnimation(noButtonRef, 1.1, '#ff4d6d');
    setupButtonAnimation(yesButtonRef, 1.1, '#4ecdc4');
  }, []);
  
  // Handle card swipe animation
  const handleSwipe = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLastSwipeDirection(direction);
    
    const card = cardRef.current;
    
    const swipeAnimation = anime({
      targets: card,
      translateX: direction === 'left' ? '-200%' : '200%', // Increased from 150% to 200%
      rotate: direction === 'left' ? '-40deg' : '40deg', // Increased from 30deg to 40deg
      opacity: 0,
      scale: 0.7,
      duration: 800,
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
        scale: [0.8, 1],
        duration: 700,
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
        </button>
        
        <button 
          className="control-button yes-button" 
          ref={yesButtonRef}
          onClick={() => handleSwipe('right')}
          aria-label="Choose second option"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default GameScreen;