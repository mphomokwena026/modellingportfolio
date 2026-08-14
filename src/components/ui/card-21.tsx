import * as React from "react";
import { cn } from "@/lib/utils";

interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag?: string;
  stats: string;
  href: string;
  themeColor: string;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ className, imageUrl, location, flag, stats, href, themeColor, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          // @ts-ignore
          "--theme-color": themeColor,
        } as React.CSSProperties}
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <a
          href={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-[1.02] group-hover:shadow-[0_0_50px_-15px_hsl(var(--theme-color)/0.5)]"
          aria-label={`Explore details for ${location}`}
          style={{
             boxShadow: `0 0 30px -15px hsl(var(--theme-color) / 0.4)`
          }}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-700 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.9), hsl(var(--theme-color) / 0.4) 40%, transparent 75%)`,
            }}
          />
          
          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            <h3 
              className="text-2xl font-normal tracking-wide transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {location}
            </h3>
            <p 
              className="text-xs text-white/75 mt-1 font-light tracking-widest uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {stats}
            </p>
          </div>
        </a>
      </div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
