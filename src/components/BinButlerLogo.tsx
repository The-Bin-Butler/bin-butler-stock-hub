interface BinButlerLogoProps {
  className?: string;
}

export default function BinButlerLogo({ className = "h-16 w-auto" }: BinButlerLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/d5074cf5-37ae-442a-85a3-f8c04d5f33d7.png" 
        alt="The Bin Butler Logo" 
        className="h-12 w-auto"
        onError={(e) => {
          console.error('Logo failed to load:', e);
          e.currentTarget.style.display = 'none';
        }}
        onLoad={() => console.log('Logo loaded successfully')}
      />
    </div>
  );
}