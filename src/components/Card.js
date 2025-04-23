import React, { useState, useEffect, forwardRef, useRef } from 'react';
import anime from 'animejs';
import './Card.css';

const Card = forwardRef(({ question, onSwipe, isTransitioning }, ref) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const animationRef = useRef(null);
  
  // When component unmounts, cancel any ongoing animations
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);
  
  // Handle touch events for swiping with improved sensitivity and performance
  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    
    // Add a class during dragging to disable transitions
    if (ref.current) {
      ref.current.classList.add('dragging');
    }
    
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || isTransitioning) return;
    
    const currentX = e.touches[0].clientX;
    const offset = currentX - touchStartX;
    setDragOffset(offset);
    
    // Apply resistance to dragging for more natural feel
    // The further you drag, the more resistance is applied
    const resistanceFactor = 0.7;
    const resistedOffset = Math.sign(offset) * Math.pow(Math.abs(offset), resistanceFactor);
    
    // Calculate rotation based on offset (smoother, less drastic rotation)
    const rotation = Math.min(Math.max(resistedOffset / 30, -10), 10);
    
    // Calculate opacity (stay more opaque during dragging)
    const opacity = 1 - Math.min(Math.abs(resistedOffset) / 800, 0.15);
    
    // Use anime.js for smoother performance with hardware acceleration
    anime.set(ref.current, {
      translateX: resistedOffset,
      rotate: rotation + 'deg',
      opacity: opacity
    });
    
    // Highlight the selected option based on drag direction
    setSelectedOption(offset > 0 ? 'option2' : 'option1');
  };
  
  const handleTouchEnd = () => {
    if (!isDragging || isTransitioning) return;
    
    setIsDragging(false);
    
    // Remove dragging class
    if (ref.current) {
      ref.current.classList.remove('dragging');
    }
    
    // More forgiving threshold for mobile with dynamic calculation
    // Smaller screens need less distance to swipe
    const screenWidth = window.innerWidth;
    const threshold = screenWidth < 480 ? 50 : screenWidth < 768 ? 70 : 90;
    
    if (Math.abs(dragOffset) > threshold) {
      const direction = dragOffset > 0 ? 'right' : 'left';
      
      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.pause();
      }
      
      // Animate the card off-screen in the direction of the swipe
      // Store the animation reference for potential cleanup
      animationRef.current = anime({
        targets: ref.current,
        translateX: dragOffset > 0 ? screenWidth + 100 : -screenWidth - 100,
        rotate: dragOffset > 0 ? '15deg' : '-15deg', // Less extreme rotation
        opacity: 0,
        scale: 0.9, // Slight scale for natural feeling
        duration: 400, // Faster for responsiveness
        easing: 'easeOutCubic', // Smoother easing
        complete: () => {
          // Only trigger swipe if component is still mounted
          if (ref.current) {
            onSwipe(direction);
          }
        }
      });
    } else {
      // Reset card position with spring animation for more natural feel
      
      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.pause();
      }
      
      // Store the animation reference
      animationRef.current = anime({
        targets: ref.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 600,
        easing: 'spring(1, 80, 10, 0)', // Spring physics for natural motion
        complete: () => {
          setSelectedOption(null);
        }
      });
    }
    
    setDragOffset(0);
  };
  
  // Mouse events for desktop with improved handling
  const handleMouseDown = (e) => {
    if (isTransitioning) return;
    
    // Add dragging class to disable transitions
    if (ref.current) {
      ref.current.classList.add('dragging');
    }
    
    setTouchStartX(e.clientX);
    setIsDragging(true);
    e.preventDefault();
    
    // Add grabbing cursor to indicate dragging
    if (ref.current) {
      ref.current.style.cursor = 'grabbing';
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || isTransitioning) return;
    
    const currentX = e.clientX;
    const offset = currentX - touchStartX;
    setDragOffset(offset);
    
    // Apply resistance to dragging with smoother curves
    const resistanceFactor = 0.7;
    const resistedOffset = Math.sign(offset) * Math.pow(Math.abs(offset), resistanceFactor);
    
    // Smoother rotation and opacity changes
    const rotation = Math.min(Math.max(resistedOffset / 30, -10), 10);
    const opacity = 1 - Math.min(Math.abs(resistedOffset) / 800, 0.15);
    
    anime.set(ref.current, {
      translateX: resistedOffset,
      rotate: rotation + 'deg',
      opacity: opacity
    });
    
    // Highlight the selected option based on drag direction
    setSelectedOption(offset > 0 ? 'option2' : 'option1');
  };
  
  const handleMouseUp = () => {
    if (!isDragging || isTransitioning) return;
    
    setIsDragging(false);
    
    // Remove dragging class
    if (ref.current) {
      ref.current.classList.remove('dragging');
    }
    
    // Reset cursor
    if (ref.current) {
      ref.current.style.cursor = 'grab';
    }
    
    // Dynamic threshold based on screen size
    const screenWidth = window.innerWidth;
    const threshold = screenWidth < 480 ? 50 : screenWidth < 768 ? 70 : 90;
    
    if (Math.abs(dragOffset) > threshold) {
      const direction = dragOffset > 0 ? 'right' : 'left';
      
      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.pause();
      }
      
      // Animate the card off-screen
      animationRef.current = anime({
        targets: ref.current,
        translateX: dragOffset > 0 ? screenWidth + 100 : -screenWidth - 100,
        rotate: dragOffset > 0 ? '15deg' : '-15deg',
        opacity: 0,
        scale: 0.9,
        duration: 400,
        easing: 'easeOutCubic',
        complete: () => {
          if (ref.current) {
            onSwipe(direction);
          }
        }
      });
    } else {
      // Reset card position with spring animation
      
      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.pause();
      }
      
      animationRef.current = anime({
        targets: ref.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 600,
        easing: 'spring(1, 80, 10, 0)',
        complete: () => {
          setSelectedOption(null);
        }
      });
    }
    
    setDragOffset(0);
  };
  
  // Add and remove global mouse events
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, touchStartX]);
  
  // Option click handlers with improved animation
  const handleOptionClick = (option) => {
    if (isTransitioning) return;
    
    setSelectedOption(option);
    
    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.pause();
    }
    
    // Animate card to show selection before swiping (subtler movement)
    animationRef.current = anime({
      targets: ref.current,
      translateX: option === 'option1' ? -30 : 30,
      rotate: option === 'option1' ? -2 : 2,
      duration: 200,
      easing: 'easeOutQuad',
      complete: () => {
        const direction = option === 'option1' ? 'left' : 'right';
        
        // Create a new animation for the exit
        animationRef.current = anime({
          targets: ref.current,
          translateX: option === 'option1' ? -window.innerWidth - 100 : window.innerWidth + 100,
          rotate: option === 'option1' ? '-15deg' : '15deg',
          opacity: 0,
          scale: 0.9,
          duration: 400,
          easing: 'easeOutCubic',
          complete: () => {
            if (ref.current) {
              onSwipe(direction);
            }
          }
        });
      }
    });
  };

  return (
    <div 
      className="card" 
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <h2 className="card-title">{question.title}</h2>
      <p className="card-subtitle">{question.subtitle}</p>
      
      <div className="options-container">
        <div 
          className={`option ${selectedOption === 'option1' ? 'highlighted' : ''}`}
          onClick={() => handleOptionClick('option1')}
        >
          <div className="option-content">
            <span className="option-emoji">{question.option1.emoji}</span>
            <h3 className="option-text">{question.option1.text}</h3>
            <p className="option-description">{question.option1.description}</p>
          </div>
          <div className="option-indicator left">←</div>
        </div>
        
        <div 
          className={`option ${selectedOption === 'option2' ? 'highlighted' : ''}`}
          onClick={() => handleOptionClick('option2')}
        >
          <div className="option-content">
            <span className="option-emoji">{question.option2.emoji}</span>
            <h3 className="option-text">{question.option2.text}</h3>
            <p className="option-description">{question.option2.description}</p>
          </div>
          <div className="option-indicator right">→</div>
        </div>
      </div>
      
      <div className="swipe-hint">
        <span>Swipe</span>
        <i className="fas fa-arrows-alt-h"></i>
        <span>or tap option</span>
      </div>
    </div>
  );
});

export default Card;