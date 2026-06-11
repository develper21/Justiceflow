import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-navy-900 mb-6">{title}</h3>
      )}
      {children}
    </div>
  );
};
