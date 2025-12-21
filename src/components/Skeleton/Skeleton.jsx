// src/components/Skeleton/Skeleton.jsx
import {
  SKELETON_BASE,
  SKELETON_ANIMATION,
  SKELETON_ROUNDED,
  SKELETON_CIRCLE,
  SKELETON_ROUNDED_XL,
  SKELETON_ROUNDED_2XL
} from '../../constants/styles';

function Skeleton({ className = '', variant = 'rounded', animate = true }) {
  const animationClass = animate ? SKELETON_ANIMATION : '';
  
  const variants = {
    rounded: SKELETON_ROUNDED,
    circle: SKELETON_CIRCLE,
    'rounded-xl': SKELETON_ROUNDED_XL,
    'rounded-2xl': SKELETON_ROUNDED_2XL,
  };

  return (
    <div 
      className={`${SKELETON_BASE} ${animationClass} ${variants[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
