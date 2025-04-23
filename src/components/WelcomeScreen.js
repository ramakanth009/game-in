import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStartGame }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const floatingIconsRef = useRef(null);
  
  useEffect(() => {
    // Entry animation for welcome screen elements with improved timing
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800
    });
    
    // Animate title
    timeline.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
      delay: 300
    });
    
    // Animate subtitle
    timeline.add({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
    }, '-=500');
    
    // Animate button
    timeline.add({
      targets: buttonRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
    }, '-=300');
    
    // Improved floating tech icons animation
    if (floatingIconsRef.current) {
      const icons = floatingIconsRef.current.querySelectorAll('.floating-icon');
      
      anime({
        targets: icons,
        opacity: [0, 0.8],
        delay: anime.stagger(100),
        translateY: anime.stagger([-20, -10]),
        duration: 800,
        endDelay: 400,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
    
    // Button hover animation
    const buttonHoverAnimation = anime({
      targets: buttonRef.current,
      scale: 1.05,
      boxShadow: '0 8px 20px rgba(39, 40, 108, 0.4)',
      duration: 300,
      autoplay: false,
      easing: 'easeOutQuad'
    });
    
    const buttonLeaveAnimation = anime({
      targets: buttonRef.current,
      scale: 1,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      duration: 300,
      autoplay: false,
      easing: 'easeOutQuad'
    });
    
    const button = buttonRef.current;
    
    if (button) {
      button.addEventListener('mouseenter', () => buttonHoverAnimation.play());
      button.addEventListener('mouseleave', () => buttonLeaveAnimation.play());
      
      return () => {
        button.removeEventListener('mouseenter', () => buttonHoverAnimation.play());
        button.removeEventListener('mouseleave', () => buttonLeaveAnimation.play());
      };
    }
  }, []);
  
  // Added pulsing animation to the start button
  useEffect(() => {
    anime({
      targets: buttonRef.current,
      scale: [1, 1.05, 1],
      duration: 2000,
      easing: 'easeInOutQuad',
      loop: true
    });
  }, []);

  return (
    <div className="welcome-screen">
      <div className="floating-icons" ref={floatingIconsRef}>
        <div className="floating-icon code" style={{ top: '15%', left: '15%' }} aria-hidden="true">{'</>'}</div>
        <div className="floating-icon data" style={{ top: '70%', right: '20%' }} aria-hidden="true">📊</div>
        <div className="floating-icon security" style={{ top: '25%', right: '15%' }} aria-hidden="true">🔒</div>
        <div className="floating-icon design" style={{ top: '65%', left: '10%' }} aria-hidden="true">🎨</div>
        <div className="floating-icon marketing" style={{ top: '40%', right: '10%' }} aria-hidden="true">📱</div>
      </div>
      
      <div className="welcome-content">
        <h1 className="welcome-title" ref={titleRef}>
          Discover Your Tech Career Path
        </h1>
        
        <p className="welcome-subtitle" ref={subtitleRef}>
          Answer a few quick questions to find out which tech career best matches your personality
          and skills. Swipe or tap to choose between options that reflect your preferences.
        </p>
        
        <button 
          className="start-button" 
          ref={buttonRef}
          onClick={onStartGame}
        >
          Start Your Journey
        </button>
        
        <div className="welcome-instructions">
          <div className="instruction-item">
            <div className="instruction-icon">🔍</div>
            <div className="instruction-text">Answer 7 questions about your work style and preferences</div>
          </div>
          <div className="instruction-item">
            <div className="instruction-icon">👥</div>
            <div className="instruction-text">Analyze your unique personality traits</div>
          </div>
          <div className="instruction-item">
            <div className="instruction-icon">🚀</div>
            <div className="instruction-text">Get matched with your ideal tech career</div>
          </div>
        </div>
      </div>
      
      <div className="welcome-footer">
        <p className="gigaversity-tagline">Helping you find the perfect path in the world of technology</p>
        <p className="small-text">Takes less than 2 minutes to complete</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;