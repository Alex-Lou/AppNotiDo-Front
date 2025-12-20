function Skeleton({ className = '', variant = 'rounded', animate = true }) {
  const baseClasses = 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800';
  const animationClass = animate ? 'animate-shimmer bg-[length:200%_100%]' : '';
  
  const variants = {
    rounded: 'rounded-lg',
    circle: 'rounded-full',
    'rounded-xl': 'rounded-xl',
    'rounded-2xl': 'rounded-2xl',
  };

  return (
    <div 
      className={`${baseClasses} ${animationClass} ${variants[variant]} ${className}`}
      aria-hidden="true"
    />
  );
}

export default Skeleton;