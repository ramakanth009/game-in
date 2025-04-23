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
  
  useEffect(() => {
    // Calculate normalized percentages
    const creativePercent = Math.min(100, (traits.creative / maxPossibleValue) * 100);
    const analyticalPercent = Math.min(100, (traits.analytical / maxPossibleValue) * 100);
    const socialPercent = Math.min(100, (traits.social / maxPossibleValue) * 100);
    const technicalPercent = Math.min(100, (traits.technical / maxPossibleValue) * 100);
    
    // Animate meter progress
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
  }, [traits]);

  return (
    <div className="personality-meters">
      <div className="personality-meter meter-creative">
        <div className="meter-label">
          <span>Creative</span>
          <span className="meter-value">{Math.round((traits.creative / maxPossibleValue) * 100)}%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress creative-progress" ref={creativeRef}></div>
        </div>
      </div>
      
      <div className="personality-meter meter-analytical">
        <div className="meter-label">
          <span>Analytical</span>
          <span className="meter-value">{Math.round((traits.analytical / maxPossibleValue) * 100)}%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress analytical-progress" ref={analyticalRef}></div>
        </div>
      </div>
      
      <div className="personality-meter meter-social">
        <div className="meter-label">
          <span>Social</span>
          <span className="meter-value">{Math.round((traits.social / maxPossibleValue) * 100)}%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress social-progress" ref={socialRef}></div>
        </div>
      </div>
      
      <div className="personality-meter meter-technical">
        <div className="meter-label">
          <span>Technical</span>
          <span className="meter-value">{Math.round((traits.technical / maxPossibleValue) * 100)}%</span>
        </div>
        <div className="meter-bar">
          <div className="meter-progress technical-progress" ref={technicalRef}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityMeters;