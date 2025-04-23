import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progressBarRef = useRef(null);
  const progressBarTextRef = useRef(null);
  
  useEffect(() => {
    // Calculate progress percentage
    const progress = ((currentQuestion) / totalQuestions) * 100;
    
    // Animate progress bar
    anime({
      targets: progressBarRef.current,
      width: `${progress}%`,
      duration: 600,
      easing: 'easeOutQuart'
    });
    
    // Animate text change
    anime({
      targets: progressBarTextRef.current,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: 'easeOutQuad'
    });
    
    // Add the animated background effect
    const gradient = progressBarRef.current;
    if (gradient) {
      gradient.style.backgroundPosition = `${progress}% 0`;
    }
  }, [currentQuestion, totalQuestions]);

  return (
    <div className="progress-container">
      <div 
        className="progress-text" 
        ref={progressBarTextRef}
      >
        Question {currentQuestion} of {totalQuestions}
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress" 
          ref={progressBarRef}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;