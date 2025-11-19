import { useState } from 'react';

interface VideoWithFallbackProps {
  src: string;
  poster?: string;
  className?: string;
  alt?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export function VideoWithFallback({
  src,
  poster,
  className,
  alt = '',
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
}: VideoWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return poster ? <img src={poster} alt={alt} className={className} /> : null;
  }

  return (
    <video
      src={src}
      poster={poster}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      controls={controls}
      onError={() => setErrored(true)}
    />
  );
}