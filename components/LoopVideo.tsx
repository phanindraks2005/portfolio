"use client";

import { useEffect, useRef } from "react";
import type { Media } from "@/lib/stories";

/**
 * A muted screen recording. Its sources are only attached once `load` is true (the section is near),
 * it plays only while `play` is true, and with reduced motion it stays on its poster.
 */
export function LoopVideo({ media, load, play, className }: { media: Media; load: boolean; play: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !media.video) return;
    if (play && load && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [play, load, media.video]);

  if (!media.video) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={media.poster} alt={media.alt} width={390} height={844} loading="lazy" decoding="async" className={className} />;
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={media.alt}
      disablePictureInPicture
    >
      {load && (
        <>
          <source src={`${media.video}.webm`} type="video/webm" />
          <source src={`${media.video}.mp4`} type="video/mp4" />
        </>
      )}
    </video>
  );
}
