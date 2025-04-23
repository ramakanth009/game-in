import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStartGame }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const floatingIconsRef = useRef(null);
  
  useEffect(() => {
    // Entry animation for welcome screen elements
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800
    });
    
    // Animate title
    timeline.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      delay: 300
    });
    
    // Animate subtitle
    timeline.add({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [30, 0],
    }, '-=600');
    
    // Animate button
    timeline.add({
      targets: buttonRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
    }, '-=400');
    
    // Animate floating tech icons
    if (floatingIconsRef.current) {
      const icons = floatingIconsRef.current.querySelectorAll('.floating-icon');
      
      anime({
        targets: icons,
        opacity: [0, 1],
        delay: anime.stagger(100),
        translateY: anime.stagger([-30, -15]),
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
      boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
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
    
    button.addEventListener('mouseenter', () => buttonHoverAnimation.play());
    button.addEventListener('mouseleave', () => buttonLeaveAnimation.play());
    
    return () => {
      button.removeEventListener('mouseenter', () => buttonHoverAnimation.play());
      button.removeEventListener('mouseleave', () => buttonLeaveAnimation.play());
    };
  }, []);

  return (
    <div className="welcome-screen">
      <div className="floating-icons" ref={floatingIconsRef}>
        <div className="floating-icon code" aria-hidden="true">{'</>'}</div>
        <div className="floating-icon data" aria-hidden="true">📊</div>
        <div className="floating-icon security" aria-hidden="true">🔒</div>
        <div className="floating-icon design" aria-hidden="true">🎨</div>
        <div className="floating-icon marketing" aria-hidden="true">📱</div>
      </div>
      
      <div className="welcome-content">
        <h1 className="welcome-title" ref={titleRef}>
          Tech Career Path Finder
        </h1>
        
        <p className="welcome-subtitle" ref={subtitleRef}>
          Discover your ideal tech career path by answering a series of "This or That" questions. 
          Swipe right for your preferred choice, or left for the other option.
        </p>
        
        <button 
          className="start-button" 
          ref={buttonRef}
          onClick={onStartGame}
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;