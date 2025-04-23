import React, { useState, useEffect, forwardRef } from 'react';
import anime from 'animejs';
import './Card.css';

const Card = forwardRef(({ question, onSwipe }, ref) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const offset = currentX - touchStartX;
    setDragOffset(offset);
    
    // Rotate card slightly while dragging
    const rotation = offset / 20; // Adjust rotation sensitivity
    const opacity = 1 - Math.min(Math.abs(offset) / 400, 0.5);
    
    anime.set(ref.current, {
      translateX: offset,
      rotate: rotation + 'deg',
      opacity: opacity
    });
    
    // Highlight the selected option based on drag direction
    setSelectedOption(offset > 0 ? 'option2' : 'option1');
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchEndX(dragOffset + touchStartX);
    
    // If swipe distance is significant, trigger the swipe action
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      onSwipe(dragOffset > 0 ? 'right' : 'left');
    } else {
      // Reset card position if swipe was not significant
      anime({
        targets: ref.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        duration: 400,
        easing: 'easeOutElastic(1, .6)'
      });
      setSelectedOption(null);
    }
    
    setDragOffset(0);
  };
  
  // Mouse events for desktop
  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
    e.preventDefault();
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const offset = currentX - touchStartX;
    setDragOffset(offset);
    
    // Rotate card slightly while dragging
    const rotation = offset / 20;
    const opacity = 1 - Math.min(Math.abs(offset) / 400, 0.5);
    
    anime.set(ref.current, {
      translateX: offset,
      rotate: rotation + 'deg',
      opacity: opacity
    });
    
    // Highlight the selected option based on drag direction
    setSelectedOption(offset > 0 ? 'option2' : 'option1');
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // If swipe distance is significant, trigger the swipe action
    const threshold = 100;
    if (Math.abs(dragOffset) > threshold) {
      onSwipe(dragOffset > 0 ? 'right' : 'left');
    } else {
      // Reset card position if swipe was not significant
      anime({
        targets: ref.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        duration: 400,
        easing: 'easeOutElastic(1, .6)'
      });
      setSelectedOption(null);
    }
    
    setDragOffset(0);
  };
  
  // Add and remove global mouse events
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, touchStartX]);
  
  // Option click handlers
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    
    // Animate card to show selection before swiping
    anime({
      targets: ref.current,
      translateX: option === 'option1' ? -50 : 50,
      rotate: option === 'option1' ? -5 : 5,
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => {
        // Trigger swipe after brief delay
        setTimeout(() => {
          onSwipe(option === 'option1' ? 'left' : 'right');
        }, 100);
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