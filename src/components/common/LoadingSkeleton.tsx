export default function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`
        relative 
        overflow-hidden 
        bg-gray-200 
        rounded-md
        before:absolute
        before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_2s_infinite]
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white/60
        before:to-transparent
        ${className}
      `}
    >
      <div className="invisible">LoadingSkeleton</div>
    </div>
  );
}
