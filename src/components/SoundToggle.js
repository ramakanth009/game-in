import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './SoundToggle.css';

const SoundToggle = ({ soundEnabled, toggleSound }) => {
  const buttonRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    // Animate button appearance
    anime({
      targets: buttonRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 600,
      delay: 1000,
      easing: 'easeOutExpo'
    });
    
    // Animation for icon swap
    anime({
      targets: buttonRef.current.querySelector('i'),
      rotateY: soundEnabled ? [90, 0] : [90, 0],
      duration: 400,
      easing: 'easeOutQuad'
    });
  }, [soundEnabled]);
  
  // Handle button click with animation
  const handleClick = () => {
    const icon = buttonRef.current.querySelector('i');
    
    // Animate icon flip
    anime({
      targets: icon,
      rotateY: 90,
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        toggleSound();
        
        // Flip back with new icon
        setTimeout(() => {
          anime({
            targets: icon,
            rotateY: 0,
            duration: 300,
            easing: 'easeOutQuad'
          });
        }, 50);
      }
    });
    
    // Add button press animation
    anime({
      targets: buttonRef.current,
      scale: [1, 0.9, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });
  };
  
  // Handle mouse enter to show tooltip
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  
  // Handle mouse leave to hide tooltip
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <button 
      className="sound-toggle" 
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
    >
      <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
      {showTooltip && (
        <span className="sound-tooltip">
          {soundEnabled ? 'Sound On' : 'Sound Off'}
        </span>
      )}
    </button>
  );
};

export default SoundToggle;