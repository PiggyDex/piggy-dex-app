import { useAtom } from "jotai";

import AnalyticsIcon from "@/assets/navbar-icon/analytics.svg";
import BridgeIcon from "@/assets/navbar-icon/bridge.svg";
import EarnIcon from "@/assets/navbar-icon/earn.svg";
import PortfolioIcon from "@/assets/navbar-icon/portfolio.svg";
import SwapIcon from "@/assets/navbar-icon/swap.svg";
import { navbarCollapsedAtom } from "@/atoms";
import { PATH } from "@/constants";
import { cn } from "@/lib";

export const NavbarItems = () => {
  const [collapsed] = useAtom(navbarCollapsedAtom);

  const MenuItemSpanClassName =
    "text-base not-italic font-normal leading-[120%] p-0";
  const hidden = collapsed ? "hidden" : "";

  return [
    {
      key: PATH.PORTFOLIO,
      icon: <PortfolioIcon className="h-6 w-6 flex-none" />,
      label: (
        <span className={cn(MenuItemSpanClassName, hidden)}>Portfolio</span>
      ),
    },
    {
      key: PATH.SWAP,
      icon: <SwapIcon className="h-6 w-6 flex-none" />,
      label: <span className={cn(MenuItemSpanClassName, hidden)}>Swap</span>,
    },
    {
      key: PATH.EARN,
      icon: <EarnIcon className="h-6 w-6 flex-none" />,
      label: <span className={cn(MenuItemSpanClassName, hidden)}>Earn</span>,
      disabled: true,
    },
    {
      key: PATH.ANALYTICS,
      icon: <AnalyticsIcon className="h-6 w-6 flex-none" />,
      label: (
        <span className={cn(MenuItemSpanClassName, hidden)}>Analytics</span>
      ),
      disabled: true,
    },
    {
      key: PATH.BRIDGE,
      icon: <BridgeIcon className="h-6 w-6 flex-none" />,
      label: <span className={cn(MenuItemSpanClassName, hidden)}>Bridge</span>,
      disabled: true,
    },
  ];
};
