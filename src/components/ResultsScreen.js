import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import './ResultsScreen.css';

const ResultsScreen = ({ result, onRestart }) => {
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const resultsContentRef = useRef(null);
  
  // References for animation elements
  const profileRef = useRef(null);
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const careersRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Show loader, then results with appropriate timing
    const timer = setTimeout(() => {
      setIsResultsVisible(true);
      createConfetti();
      
      // Play entrance animations with staggered timing
      const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 600
      });
      
      timeline.add({
        targets: profileRef.current,
        opacity: [0, 1],
        translateY: [30, 0]
      });
      
      timeline.add({
        targets: statsRef.current,
        opacity: [0, 1],
        translateY: [20, 0]
      }, '-=400');
      
      timeline.add({
        targets: skillsRef.current,
        opacity: [0, 1],
        translateY: [20, 0]
      }, '-=400');
      
      timeline.add({
        targets: careersRef.current,
        opacity: [0, 1],
        translateY: [20, 0]
      }, '-=400');
      
      timeline.add({
        targets: buttonsRef.current,
        opacity: [0, 1],
        translateY: [20, 0]
      }, '-=400');
    }, 1500); // Reduced from 2000ms for better UX
    
    return () => clearTimeout(timer);
  }, []);

  // Create confetti animation for celebration effect
  const createConfetti = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#ff4d6d', '#4ecdc4', '#6366f1', '#8b5cf6', '#f59e0b'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '-10px';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      confettiContainer.appendChild(confetti);
      
      // Animate confetti with varying duration and delay
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      // Add custom animation using anime.js
      anime({
        targets: confetti,
        translateY: [0, window.innerHeight + 100],
        translateX: [0, (Math.random() - 0.5) * 200],
        rotate: [0, Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)],
        opacity: [1, 0],
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'easeOutQuad'
      });
      
      // Remove confetti after animation completes
      setTimeout(() => {
        confetti.remove();
      }, (duration + delay) * 1000);
    }
    
    // Clean up confetti container after animation
    setTimeout(() => {
      confettiContainer.remove();
    }, 8000);
  };

  // Handle share result with better error handling
  const handleShare = () => {
    try {
      const shareText = `I discovered my ideal tech career path: ${result.data.name}! Find yours with the Tech Career Path Finder!`;
      
      if (navigator.share) {
        navigator.share({
          title: 'My Tech Career Path',
          text: shareText,
          url: window.location.href
        }).catch(err => {
          // Fallback to clipboard if share fails
          copyToClipboard(shareText);
        });
      } else {
        // Fallback to clipboard
        copyToClipboard(shareText);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Ultimate fallback - just show tooltip
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };
  
  // Helper function to copy text to clipboard
  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setShowShareTooltip(true);
          setTimeout(() => setShowShareTooltip(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    } else {
      // Older browsers fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
      }
      
      document.body.removeChild(textArea);
    }
  };

  // Get background color for profile emoji based on career path
  const getProfileEmojiBackground = () => {
    const path = result.path;
    const colors = {
      fullstack: 'rgba(99, 102, 241, 0.15)',
      datascience: 'rgba(139, 92, 246, 0.15)',
      marketing: 'rgba(236, 72, 153, 0.15)',
      cybersecurity: 'rgba(16, 185, 129, 0.15)',
      uxui: 'rgba(245, 158, 11, 0.15)'
    };
    
    return colors[path] || 'rgba(99, 102, 241, 0.15)';
  };

  // Get color for profile details based on career path
  const getProfileDetailsBackground = () => {
    const path = result.path;
    const colors = {
      fullstack: 'rgba(99, 102, 241, 0.1)',
      datascience: 'rgba(139, 92, 246, 0.1)',
      marketing: 'rgba(236, 72, 153, 0.1)',
      cybersecurity: 'rgba(16, 185, 129, 0.1)',
      uxui: 'rgba(245, 158, 11, 0.1)'
    };
    
    return colors[path] || 'rgba(99, 102, 241, 0.1)';
  };

  // If result is not available yet, show error
  if (!result || !result.data) {
    return (
      <div className="results-screen">
        <div className="results-header">
          <h2 className="results-title">Oops! Something went wrong</h2>
          <p className="results-subtitle">Unable to calculate your results</p>
        </div>
        <button className="action-button restart-button" onClick={onRestart}>
          <i className="fas fa-redo"></i> Try Again
        </button>
      </div>
    );
  }

  // Destructure result data for easier access
  const { data, normalizedTraits, matchScore } = result;

  return (
    <div className="results-screen">
      <div className="results-header">
        <h2 className="results-title">Your Ideal Tech Career</h2>
        <p className="results-subtitle">Based on your preferences</p>
      </div>
      
      {!isResultsVisible ? (
        <div className="loader">
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-dot"></div>
          <div className="loading-text">Analyzing your answers...</div>
        </div>
      ) : (
        <div className="results-content" ref={resultsContentRef}>
          <div className="profile-header" ref={profileRef}>
            <div 
              className="profile-emoji" 
              style={{ backgroundColor: getProfileEmojiBackground() }}
            >
              {data.emoji}
            </div>
            <div className="profile-title">
              <h3>{data.name}</h3>
              <p>{data.tagline}</p>
            </div>
          </div>
          
          <div className="match-indicator">
            <div className="match-circle" style={{ 
              background: `conic-gradient(${data.color} ${matchScore}%, #e9ecef ${matchScore}%)` 
            }}>
              <div className="match-value">{matchScore}%</div>
            </div>
            <div className="match-label">Match Score</div>
          </div>
          
          <p className="profile-description">
            {data.description}
          </p>
          
          <div className="profile-stats" ref={statsRef}>
            <div className="stat">
              <div className="stat-value" style={{ color: 'var(--uxui-color)' }}>
                {Math.round(normalizedTraits.creative)}%
              </div>
              <div className="stat-label">Creative</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: 'var(--datascience-color)' }}>
                {Math.round(normalizedTraits.analytical)}%
              </div>
              <div className="stat-label">Analytical</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: 'var(--marketing-color)' }}>
                {Math.round(normalizedTraits.social)}%
              </div>
              <div className="stat-label">Social</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ color: 'var(--cybersecurity-color)' }}>
                {Math.round(normalizedTraits.technical)}%
              </div>
              <div className="stat-label">Technical</div>
            </div>
          </div>
          
          <div 
            className="profile-details" 
            ref={skillsRef}
            style={{ backgroundColor: getProfileDetailsBackground() }}
          >
            <h3 className="details-title">
              <i className="fas fa-laptop-code"></i> Skills to Develop
            </h3>
            <ul className="details-list">
              {data.skills.map((skill, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div 
            className="profile-details" 
            ref={careersRef}
            style={{ backgroundColor: getProfileDetailsBackground() }}
          >
            <h3 className="details-title">
              <i className="fas fa-briefcase"></i> Career Opportunities
            </h3>
            <ul className="details-list">
              {data.careers.map((career, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i>
                  {career}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="action-buttons" ref={buttonsRef}>
            <button 
              className="action-button restart-button" 
              onClick={onRestart}
            >
              <i className="fas fa-redo"></i> Try Again
            </button>
            
            <button 
              className="action-button share-button" 
              onClick={handleShare}
            >
              <i className="fas fa-share-alt"></i> Share Result
              {showShareTooltip && (
                <span className="share-tooltip">Copied to clipboard!</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;