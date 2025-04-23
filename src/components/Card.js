import React, { useState, useEffect, forwardRef } from 'react';
import anime from 'animejs';
import './Card.css';

const Card = forwardRef(({ question, onSwipe }, ref) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Handle touch events for swiping with improved sensitivity
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const offset = currentX - touchStartX;
    setDragOffset(offset);
    
    // Apply resistance to dragging for more natural feel
    const resistedOffset = Math.sign(offset) * Math.min(Math.abs(offset), 300);
    
    // Rotate card slightly while dragging with smooth animation
    const rotation = resistedOffset / 20;
    const opacity = 1 - Math.min(Math.abs(resistedOffset) / 500, 0.3);
    
    anime.set(ref.current, {
      translateX: resistedOffset,
      rotate: rotation + 'deg',
      opacity: opacity
    });
    
    // Highlight the selected option based on drag direction
    setSelectedOption(offset > 0 ? 'option2' : 'option1');
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchEndX(dragOffset + touchStartX);
    
    // More forgiving threshold for mobile
    const threshold = window.innerWidth < 768 ? 80 : 100;
    
    if (Math.abs(dragOffset) > threshold) {
      // Add a small delay for visual feedback before completing the swipe
      setTimeout(() => {
        onSwipe(dragOffset > 0 ? 'right' : 'left');
      }, 150);
      
      // Animate the card off-screen in the direction of the swipe
      anime({
        targets: ref.current,
        translateX: dragOffset > 0 ? window.innerWidth : -window.innerWidth,
        rotate: dragOffset > 0 ? '40deg' : '-40deg',
        opacity: 0,
        duration: 600,
        easing: 'easeOutQuint'
      });
    } else {
      // Reset card position with bouncy animation if swipe was not significant
      anime({
        targets: ref.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
      setSelectedOption(null);
    }
    
    setDragOffset(0);
  };
  
  // Mouse events for desktop with improved handling
  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
    e.preventDefault();
    
    // Add grabbing cursor to indicate dragging
    if (ref.current) {
      ref.current.style.cursor = 'grabbing';
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const offset = currentX - touchStartX;
    setDragOffset(offset);
    
    // Apply resistance to dragging
    const resistedOffset = Math.sign(offset) * Math.min(Math.abs(offset), 300);
    
    // Rotate card slightly while dragging
    const rotation = resistedOffset / 20;
    const opacity = 1 - Math.min(Math.abs(resistedOffset) / 500, 0.3);
    
    anime.set(ref.current, {
      translateX: resistedOffset,
      rotate: rotation + 'deg',
      opacity: opacity
    });
    
    // Highlight the selected option based on drag direction
    setSelectedOption(offset > 0 ? 'option2' : 'option1');
  };
  
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Reset cursor
    if (ref.current) {
      ref.current.style.cursor = 'grab';
    }
    
    // If swipe distance is significant, trigger the swipe action
    const threshold = 100;
    
    if (Math.abs(dragOffset) > threshold) {
      // Add a small delay for visual feedback
      setTimeout(() => {
        onSwipe(dragOffset > 0 ? 'right' : 'left');
      }, 150);
      
      // Animate the card off-screen
      anime({
        targets: ref.current,
        translateX: dragOffset > 0 ? window.innerWidth : -window.innerWidth,
        rotate: dragOffset > 0 ? '40deg' : '-40deg',
        opacity: 0,
        duration: 600,
        easing: 'easeOutQuint'
      });
    } else {
      // Reset card position with bouncy animation
      anime({
        targets: ref.current,
        translateX: 0,
        rotate: 0,
        opacity: 1,
        duration: 600,
        easing: 'easeOutElastic(1, .5)'
      });
      setSelectedOption(null);
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
    setSelectedOption(option);
    
    // Animate card to show selection before swiping
    anime({
      targets: ref.current,
      translateX: option === 'option1' ? -50 : 50,
      rotate: option === 'option1' ? -5 : 5,
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => {
        // Trigger swipe after brief delay for better visual feedback
        setTimeout(() => {
          onSwipe(option === 'option1' ? 'left' : 'right');
        }, 100);
        
        // Animate the card off-screen
        anime({
          targets: ref.current,
          translateX: option === 'option1' ? -window.innerWidth : window.innerWidth,
          rotate: option === 'option1' ? '-40deg' : '40deg',
          opacity: 0,
          duration: 600,
          easing: 'easeOutQuint'
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