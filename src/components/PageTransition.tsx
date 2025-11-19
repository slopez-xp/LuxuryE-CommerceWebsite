import { useEffect, useState } from 'react';

interface PageTransitionProps {
  pageKey: string;
  children: React.ReactNode;
  duration?: number; // ms
}

export function PageTransition({ pageKey, children, duration = 300 }: PageTransitionProps) {
  const [currentChildren, setCurrentChildren] = useState<React.ReactNode>(children);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsExiting(true);
    const timer = setTimeout(() => {
      setCurrentChildren(children);
      requestAnimationFrame(() => setIsExiting(false));
    }, duration);
    return () => clearTimeout(timer);
  }, [pageKey, children, duration]);

  const style: React.CSSProperties = {
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? 'translateY(8px) scale(0.995)' : 'translateY(0) scale(1)',
    willChange: 'opacity, transform',
    // make sure the animated element doesn't unexpectedly add margins or spacing
    display: 'block',
  };

  // outer element uses display: contents so it doesn't participate in layout;
  // the inner element receives the animated styles.
  return (
    <div style={{ display: 'contents' }}>
      <div style={style} aria-hidden={isExiting}>
        {currentChildren}
      </div>
    </div>
  );
}