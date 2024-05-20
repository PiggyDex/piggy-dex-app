import { type FC } from "react";

import { cn } from "@/lib";

interface IntervalSelectProps {
  className?: string;
  activeInterval: string;
  setActiveInterval: (interval: string) => void;
}

export const IntervalsSelect: FC<IntervalSelectProps> = ({
  className,
  activeInterval,
  setActiveInterval,
}) => {
  const intervals = ["1M", "3M", "6M", "All"];

  return (
    <div className={cn("flex flex-row self-stretch", className)}>
      {intervals.map((interval) => (
        <span
          key={interval}
          className={cn(
            "px-2 py-1 text-base not-italic font-normal leading-[120%]",
            activeInterval === interval
              ? "text-primary-500"
              : "text-neutral-500",
            "transition-all duration-300 ease-in-out cursor-pointer ",
          )}
          onClick={() => {
            setActiveInterval(interval);
          }}
        >
          {interval}
        </span>
      ))}
    </div>
  );
};
