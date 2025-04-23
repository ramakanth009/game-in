import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './SoundToggle.css';

const SoundToggle = ({ soundEnabled, toggleSound }) => {
  const buttonRef = useRef(null);
  
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
  };

  return (
    <button 
      className="sound-toggle" 
      ref={buttonRef}
      onClick={handleClick}
      aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
      title={soundEnabled ? "Sound On" : "Sound Off"}
    >
      <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
    </button>
  );
};

export default SoundToggle;