import { type FC } from "react";

import { cn } from "@/lib";

type StyledHrProps = {
  className?: string;
};

export const StyledHr: FC<StyledHrProps> = ({ className }) => {
  return <hr className={cn("w-full h-0", className)} />;
};
