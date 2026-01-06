'use client';

import { memo, ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks';

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'blur';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const animationStyles: Record<AnimationType, { initial: string; visible: string }> = {
  fadeUp: {
    initial: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  fadeIn: {
    initial: 'opacity-0',
    visible: 'opacity-100',
  },
  slideLeft: {
    initial: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  slideRight: {
    initial: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  scale: {
    initial: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
  blur: {
    initial: 'opacity-0 blur-sm',
    visible: 'opacity-100 blur-0',
  },
};

function AnimateOnScrollComponent({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

  const styles = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${isVisible ? styles.visible : styles.initial} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export const AnimateOnScroll = memo(AnimateOnScrollComponent);
