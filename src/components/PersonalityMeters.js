import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './PersonalityMeters.css';

const PersonalityMeters = ({ traits }) => {
  const maxPossibleValue = 100;
  
  // References for animation
  const creativeRef = useRef(null);
  const analyticalRef = useRef(null);
  const socialRef = useRef(null);
  const technicalRef = useRef(null);
  
  // References for label animations
  const creativeValueRef = useRef(null);
  const analyticalValueRef = useRef(null);
  const socialValueRef = useRef(null);
  const technicalValueRef = useRef(null);
  
  useEffect(() => {
    // Calculate normalized percentages
    const creativePercent = Math.min(100, (traits.creative / maxPossibleValue) * 100);
    const analyticalPercent = Math.min(100, (traits.analytical / maxPossibleValue) * 100);
    const socialPercent = Math.min(100, (traits.social / maxPossibleValue) * 100);
    const technicalPercent = Math.min(100, (traits.technical / maxPossibleValue) * 100);
    
    // Animate meter progress bars
    anime({
      targets: creativeRef.current,
      width: `${creativePercent}%`,
      duration: 800,
      easing: 'easeOutExpo'
    });
    
    anime({
      targets: analyticalRef.current,
      width: `${analyticalPercent}%`,
      duration: 800,
      easing: 'easeOutExpo',
      delay: 100
    });
    
    anime({
      targets: socialRef.current,
      width: `${socialPercent}%`,
      duration: 800,
      easing: 'easeOutExpo',
      delay: 200
    });
    
    anime({
      targets: technicalRef.current,
      width: `${technicalPercent}%`,
      duration: 800,
      easing: 'easeOutExpo',
      delay: 300
    });
    
    // Animate percentage value change with counting effect
    const countUp = (target, value, duration) => {
      let start = 0;
      const end = Math.round(value);
      const range = end - start;
      const startTime = performance.now();
      
      const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime > duration) {
          if (target.current) target.current.textContent = `${end}%`;
          return;
        }
        
        const progress = elapsedTime / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        const currentValue = Math.floor(start + (range * easeProgress));
        
        if (target.current) target.current.textContent = `${currentValue}%`;
        requestAnimationFrame(updateNumber);
      };
      
      requestAnimationFrame(updateNumber);
    };
    
    // Start the counter animations with different delays
    countUp(creativeValueRef, creativePercent, 800);
    countUp(analyticalValueRef, analyticalPercent, 800);
    countUp(socialValueRef, socialPercent, 800);
    countUp(technicalValueRef, technicalPercent, 800);
    
  }, [traits]);

  return (
    <div className="personality-meters">
      <div className="personality-meter meter-creative">
        <div className="meter-label">
          <span>Creative</span>
          <span className="meter-value" ref={creativeValueRef}>0%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress creative-progress" ref={creativeRef}></div>
        </div>
      </div>
      
      <div className="personality-meter meter-analytical">
        <div className="meter-label">
          <span>Analytical</span>
          <span className="meter-value" ref={analyticalValueRef}>0%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress analytical-progress" ref={analyticalRef}></div>
        </div>
      </div>
      
      <div className="personality-meter meter-social">
        <div className="meter-label">
          <span>Social</span>
          <span className="meter-value" ref={socialValueRef}>0%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress social-progress" ref={socialRef}></div>
        </div>
      </div>
      
      <div className="personality-meter meter-technical">
        <div className="meter-label">
          <span>Technical</span>
          <span className="meter-value" ref={technicalValueRef}>0%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress technical-progress" ref={technicalRef}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityMeters;