/**
 * A visible slot for the interview answers. Phase 1 keeps these empty on purpose:
 * the words on the finished site are the owner's own, not written for him.
 */
export function Yours({ q, hint, className = "" }: { q: string; hint: string; className?: string }) {
  return (
    <span className={`v2-yours ${className}`}>
      <span className="v2-yours-q">{q}</span> {hint}
    </span>
  );
}
