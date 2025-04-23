import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './GigaversityHeader.css';
import gigaLogo from '../assets/giga-loogo.svg';

const GigaversityHeader = ({ soundEnabled, toggleSound }) => {
  const logoRef = useRef(null);

  useEffect(() => {
    // Logo subtle animation
    anime({
      targets: logoRef.current,
      translateY: ['-5px', '5px'],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    });
  }, []);

  return (
    <div className="gigaversity-header">
      <div className="logo-container" ref={logoRef}>
        <img 
          src={gigaLogo} 
          alt="Gigaversity Logo" 
          className="gigaversity-logo" 
        />
      </div>
      
      <div className="header-right">
        <button 
          className={`sound-toggle ${!soundEnabled ? 'sound-off' : ''}`}
          onClick={toggleSound}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
        >
          <i className={`fas ${soundEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
        </button>
        
        <div className="tagline">
          <span className="powered-by">Powered by</span>
          <span className="gigaversity-text">GIGAVERSITY</span>
        </div>
      </div>
    </div>
  );
};

export default GigaversityHeader;