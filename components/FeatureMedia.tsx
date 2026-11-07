"use client";

import { useEffect, useRef, useState } from "react";
import type { Media } from "@/lib/stories";
import { LoopVideo } from "./LoopVideo";

/** A recording that loads when it nears the screen and plays only while it's visible. */
export function FeatureMedia({ media, className }: { media: Media; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "500px 0px" });
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <LoopVideo media={media} load={near} play={visible} className={className} />
    </div>
  );
}
