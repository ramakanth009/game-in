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
  const gameContainerRef = useRef(null);
  const cardRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);
  
  useEffect(() => {
    // Entry animation for the game container
    anime({
      targets: gameContainerRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });
    
    // Entry animation for the card
    anime({
      targets: cardRef.current,
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: 400,
      duration: 800,
      easing: 'easeOutElastic(1, .8)'
    });
    
    // Animation for the control buttons
    anime({
      targets: [noButtonRef.current, yesButtonRef.current],
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, {start: 800}),
      duration: 600,
      easing: 'easeOutExpo'
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
    
    const card = cardRef.current;
    
    const swipeAnimation = anime({
      targets: card,
      translateX: direction === 'left' ? '-150%' : '150%',
      rotate: direction === 'left' ? '-30deg' : '30deg',
      opacity: 0,
      scale: 0.8,
      duration: 700,
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
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        translateX: [direction === 'left' ? '100%' : '-100%', 0],
        rotate: [direction === 'left' ? '30deg' : '-30deg', 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 700,
        easing: 'easeOutCubic'
      });
    }
  }, [currentQuestionIndex]);

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