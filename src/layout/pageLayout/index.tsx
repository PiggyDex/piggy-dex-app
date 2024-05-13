import { type FC, type ReactNode } from "react";

import { Navbar } from "@/layout";

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-start overflow-x-hidden">
      <Navbar />
      {children}
    </main>
  );
};
