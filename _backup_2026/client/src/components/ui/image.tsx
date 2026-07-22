
import React from 'react';

interface ImageProps {
  image?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/6cfdf3c1-a020-4420-9603-ba309823a98b.png',
};

const Image: React.FC<ImageProps> = ({ 
  image, 
  width = '360px', 
  height = '120px', 
  borderRadius = '8px',
  className = ''
}) => {
  return (
    <div 
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundImage: `url(${image ?? defaultProps.image})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }} 
    />
  );
};

export default Image;
