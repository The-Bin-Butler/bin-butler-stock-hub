interface BinButlerLogoProps {
  className?: string;
}

export default function BinButlerLogo({ className = "h-16 w-auto" }: BinButlerLogoProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg shadow-soft">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 text-primary-foreground"
        >
          <path d="M3 6h18l-2 13H5L3 6Z" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-primary">The Bin Butler</span>
        <span className="text-sm text-muted-foreground">Stock Hub</span>
      </div>
    </div>
  );
}