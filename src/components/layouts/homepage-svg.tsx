export default function HomepageSvg() {
  return (
    <div className="relative w-full aspect-square max-w-lg">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full text-foreground/10 opacity-90"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <path
          d="M40,160 Q100,20 160,160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M40,160 L160,160"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M100,20 L100,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <rect
          x="80"
          y="80"
          width="40"
          height="40"
          fill="currentColor"
          fillOpacity="0.5"
          transform="rotate(45, 100, 100)"
        />
        <circle cx="100" cy="100" r="4" fill="currentColor" />
      </svg>

      <div className="absolute top-1/4 right-0 w-24 h-24 border border-foreground/30 rounded-full animate-bounce duration-3000 ease-in-out"></div>
      <div className="absolute bottom-1/4 left-0 w-16 h-16 border border-foreground/30 rotate-12"></div>
    </div>
  );
}
