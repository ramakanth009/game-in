import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);
  
  useEffect(() => {
    // Create animated particles with improved visuals
    const particleCount = 25; // Reduced for better performance
    const backgroundElement = backgroundRef.current;
    
    // Clear any existing particles
    while (backgroundElement.firstChild) {
      backgroundElement.removeChild(backgroundElement.firstChild);
    }
    
    // Add grid pattern
    const gridPattern = document.createElement('div');
    gridPattern.className = 'background-grid';
    backgroundElement.appendChild(gridPattern);
    
    // Add Gigaversity branding elements
    const brandingElements = [
      { char: 'G', size: 120, color: 'rgba(39, 40, 108, 0.03)' },
      { char: 'I', size: 100, color: 'rgba(66, 123, 191, 0.03)' },
      { char: 'G', size: 140, color: 'rgba(39, 40, 108, 0.025)' },
      { char: 'A', size: 130, color: 'rgba(96, 202, 230, 0.03)' },
    ];
    
    // Position branding elements
    brandingElements.forEach((element, index) => {
      const brandElement = document.createElement('div');
      brandElement.className = 'brand-element';
      brandElement.textContent = element.char;
      brandElement.style.fontSize = `${element.size}px`;
      brandElement.style.color = element.color;
      
      // Position randomly but spaced out
      const section = index / brandingElements.length;
      brandElement.style.left = `${section * 80 + Math.random() * 15}%`;
      brandElement.style.top = `${10 + Math.random() * 70}%`;
      
      backgroundElement.appendChild(brandElement);
      
      // Animate branding elements with subtle floating
      anime({
        targets: brandElement,
        translateY: () => anime.random(-20, 20),
        translateX: () => anime.random(-10, 10),
        rotate: () => anime.random(-5, 5),
        duration: () => anime.random(15000, 25000),
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
      });
    });
    
    // Create and animate particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'background-particle';
      
      // Randomize particle properties
      const size = Math.random() * 25 + 10;
      const opacity = Math.random() * 0.1 + 0.05; // Lower opacity for subtlety
      const rotation = Math.random() * 360;
      const isCircle = Math.random() > 0.7;
      
      // Assign colors based on Gigaversity palette
      const colors = [
        '#27286c', // Primary blue
        '#60cae6', // Secondary blue
        '#233f94', // Medium blue
        '#427bbf', // Bright blue
        '#ffc615', // Yellow accent
        '#2a2b6a', // Deep navy
        '#354fa2'  // Darker blue
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = isCircle ? '50%' : '20%';
      particle.style.transform = `rotate(${rotation}deg)`;
      
      // Position randomly within the viewport
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      backgroundElement.appendChild(particle);
      
      // Create unique movement for each particle
      anime({
        targets: particle,
        translateX: () => anime.random(-150, 150),
        translateY: () => anime.random(-150, 150),
        scale: () => [0.2, anime.random(0.6, 1.3)],
        rotate: () => anime.random(-360, 360),
        opacity: [0, opacity, 0],
        duration: () => anime.random(15000, 30000),
        easing: 'easeInOutQuad',
        delay: () => anime.random(0, 5000),
        loop: true,
        direction: 'alternate'
      });
    }
    
    // Create floating blur effects for depth
    for (let i = 0; i < 6; i++) {
      const blurEffect = document.createElement('div');
      blurEffect.className = 'blur-effect';
      
      // Random blur size and position
      const blurSize = Math.random() * 250 + 100;
      blurEffect.style.width = `${blurSize}px`;
      blurEffect.style.height = `${blurSize}px`;
      blurEffect.style.left = `${Math.random() * 100}vw`;
      blurEffect.style.top = `${Math.random() * 100}vh`;
      
      // Random color from the Gigaversity palette with very low opacity
      const colors = [
        '#27286c', // Primary blue
        '#60cae6', // Secondary blue
        '#233f94', // Medium blue
        '#427bbf', // Bright blue
        '#ffc615', // Yellow accent
        '#2a2b6a', // Deep navy
        '#354fa2'  // Darker blue
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      blurEffect.style.backgroundColor = color;
      blurEffect.style.opacity = (Math.random() * 0.08 + 0.02).toString();
      
      backgroundElement.appendChild(blurEffect);
      
      // Animate blur effect with slow movement
      anime({
        targets: blurEffect,
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-50, 50),
        scale: [1, 1.2, 0.9, 1],
        opacity: [
          { value: parseFloat(blurEffect.style.opacity) * 0.8, duration: 5000 },
          { value: parseFloat(blurEffect.style.opacity) * 1.2, duration: 8000 },
          { value: parseFloat(blurEffect.style.opacity), duration: 5000 }
        ],
        duration: 25000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
      });
    }
    
    // Clean up function to remove all particles when component unmounts
    return () => {
      while (backgroundElement.firstChild) {
        backgroundElement.removeChild(backgroundElement.firstChild);
      }
    };
  }, []);

  return (
    <div className="animated-background" ref={backgroundRef}></div>
  );
};

export default AnimatedBackground;