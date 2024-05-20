import { type FC } from "react";

import { cn } from "@/lib";

interface StyledTabsProps {
  items: string[];
  className?: string;
  activeTab: string;
  setActiveTab: (key: string) => void;
}

export const StyledTabs: FC<StyledTabsProps> = ({
  items,
  className,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-start border-0 !border-b border-solid border-neutral-200">
        {items.map((item) => (
          <div
            key={item}
            className={cn(
              "flex items-center px-6 py-3 cursor-pointer",
              "transition-all duration-300 ease-in-out",
              activeTab === item
                ? "border-0 !border-b-2 border-solid border-primary-500 text-primary-500 text-base not-italic font-bold leading-[120%]"
                : " border-0 !border-b-2 border-solid border-transparent text-neutral-300 text-base not-italic font-normal leading-[120%]",
            )}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
