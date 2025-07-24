import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };
  
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <img
          src="/images/Heartbeat.svg"
          alt="PulseFlow Icon"
          className="w-full h-full object-contain"
        />
      </div>
      <span className={`font-public-sans font-semibold text-gray-900 ${textSizeClasses[size]}`}>
        PulseFlow
      </span>
    </div>
  );
};

export default Logo;
