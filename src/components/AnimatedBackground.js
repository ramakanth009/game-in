import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);
  
  useEffect(() => {
    // Create animated particles
    const particleCount = 30;
    const backgroundElement = backgroundRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'background-particle';
      
      // Randomize particle properties
      const size = Math.random() * 20 + 5;
      const opacity = Math.random() * 0.2 + 0.1;
      const rotation = Math.random() * 360;
      const isCircle = Math.random() > 0.5;
      
      // Assign colors based on career paths
      const colors = [
        'var(--fullstack-color)',
        'var(--datascience-color)',
        'var(--marketing-color)',
        'var(--cybersecurity-color)',
        'var(--uxui-color)'
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = isCircle ? '50%' : '0';
      particle.style.transform = `rotate(${rotation}deg)`;
      
      // Position randomly
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      backgroundElement.appendChild(particle);
      
      // Animate particle
      anime({
        targets: particle,
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: () => [0.1, anime.random(0.5, 1.5)],
        opacity: [0, opacity, 0],
        rotate: () => anime.random(-360, 360),
        duration: () => anime.random(10000, 20000),
        easing: 'easeInOutQuad',
        delay: () => anime.random(0, 5000),
        loop: true,
        direction: 'alternate'
      });
    }
    
    // Create background gradient animation
    anime({
      targets: backgroundElement,
      background: [
        'linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%)',
        'linear-gradient(45deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
        'linear-gradient(45deg, rgba(236, 72, 153, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        'linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%)'
      ],
      duration: 20000,
      easing: 'linear',
      loop: true
    });
    
    // Cleanup function
    return () => {
      while (backgroundElement.firstChild) {
        backgroundElement.removeChild(backgroundElement.firstChild);
      }
    };
  }, []);

  return (
    <div className="animated-background" ref={backgroundRef}>
      <div className="background-grid"></div>
    </div>
  );
};

export default AnimatedBackground;