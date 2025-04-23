import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './ProgressBar.css';

const ProgressBar = ({ currentQuestion, totalQuestions }) => {
  const progressBarRef = useRef(null);
  const progressBarTextRef = useRef(null);
  const stepIndicatorsRef = useRef(null);
  
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
      translateY: [5, 0],
      duration: 400,
      easing: 'easeOutQuad'
    });
    
    // Add the animated background effect
    const gradient = progressBarRef.current;
    if (gradient) {
      gradient.style.backgroundPosition = `${progress}% 0`;
    }
    
    // Animate the active step indicator
    if (stepIndicatorsRef.current) {
      const indicators = stepIndicatorsRef.current.querySelectorAll('.step-indicator');
      
      indicators.forEach((indicator, index) => {
        if (index + 1 < currentQuestion) {
          // Past questions
          indicator.classList.add('completed');
          indicator.classList.remove('active');
        } else if (index + 1 === currentQuestion) {
          // Current question
          indicator.classList.add('active');
          indicator.classList.remove('completed');
          
          // Animate the active indicator
          anime({
            targets: indicator,
            scale: [1, 1.2, 1],
            duration: 600,
            easing: 'easeOutElastic(1, .6)'
          });
        } else {
          // Future questions
          indicator.classList.remove('active', 'completed');
        }
      });
    }
  }, [currentQuestion, totalQuestions]);

  // Create step indicators based on total questions
  const renderStepIndicators = () => {
    // For a large number of questions, show simplified indicators
    if (totalQuestions > 7) {
      return (
        <div className="step-indicators simplified" ref={stepIndicatorsRef}>
          <div className={`step-indicator ${currentQuestion >= 1 ? 'completed' : ''} ${currentQuestion === 1 ? 'active' : ''}`}></div>
          <div className="step-divider"></div>
          <div className={`step-indicator ${currentQuestion > Math.floor(totalQuestions/3) ? 'completed' : ''} ${currentQuestion === Math.floor(totalQuestions/3) ? 'active' : ''}`}></div>
          <div className="step-divider"></div>
          <div className={`step-indicator ${currentQuestion > Math.floor(2*totalQuestions/3) ? 'completed' : ''} ${currentQuestion === Math.floor(2*totalQuestions/3) ? 'active' : ''}`}></div>
          <div className="step-divider"></div>
          <div className={`step-indicator ${currentQuestion === totalQuestions ? 'active' : ''}`}></div>
        </div>
      );
    }
    
    // For a smaller number of questions, show all indicators
    const indicators = [];
    for (let i = 1; i <= totalQuestions; i++) {
      indicators.push(
        <div 
          key={i} 
          className={`step-indicator ${currentQuestion > i ? 'completed' : ''} ${currentQuestion === i ? 'active' : ''}`}
        ></div>
      );
      
      if (i < totalQuestions) {
        indicators.push(<div key={`divider-${i}`} className="step-divider"></div>);
      }
    }
    
    return (
      <div className="step-indicators" ref={stepIndicatorsRef}>
        {indicators}
      </div>
    );
  };

  return (
    <div className="progress-container">
      <div 
        className="progress-text" 
        ref={progressBarTextRef}
      >
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span className="progress-percentage">{Math.round((currentQuestion / totalQuestions) * 100)}% Complete</span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress" 
          ref={progressBarRef}
        ></div>
      </div>
      
      {renderStepIndicators()}
    </div>
  );
};

export default ProgressBar;