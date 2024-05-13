import { useAtom } from "jotai";
import Image from "next/image";

import { navbarCollapsedAtom } from "@/atoms";
import { PATH } from "@/constants";
import { cn } from "@/lib";

type NavbarItemsProps = {
  pathname: string;
};

export const NavbarItems = ({ pathname }: NavbarItemsProps) => {
  const [collapsed] = useAtom(navbarCollapsedAtom);

  const MenuItemSpanClassName =
    "text-base not-italic font-normal leading-[120%] p-0";
  const hidden = collapsed ? "hidden" : "";

  return [
    {
      key: PATH.PORTFOLIO,
      icon: (
        <Image
          className="flex-none"
          src={`/navbar-icon${PATH.PORTFOLIO}${pathname === PATH.PORTFOLIO ? "-active" : ""}.svg`}
          alt="logo"
          width={24}
          height={24}
        />
      ),
      label: (
        <span className={cn(MenuItemSpanClassName, hidden)}>Portfolio</span>
      ),
    },
    {
      key: PATH.SWAP,
      icon: (
        <Image
          className="flex-none"
          src={`/navbar-icon${PATH.SWAP}${pathname === PATH.SWAP ? "-active" : ""}.svg`}
          alt="logo"
          width={24}
          height={24}
        />
      ),
      label: <span className={cn(MenuItemSpanClassName, hidden)}>Swap</span>,
    },
    {
      key: PATH.EARN,
      icon: (
        <Image
          className="flex-none"
          src={`/navbar-icon${PATH.EARN}${pathname === PATH.EARN ? "-active" : ""}.svg`}
          alt="logo"
          width={24}
          height={24}
        />
      ),
      label: <span className={cn(MenuItemSpanClassName, hidden)}>Earn</span>,
    },
    {
      key: PATH.ANALYTICS,
      icon: (
        <Image
          className="flex-none"
          src={`/navbar-icon${PATH.ANALYTICS}${pathname === PATH.ANALYTICS ? "-active" : ""}.svg`}
          alt="logo"
          width={24}
          height={24}
        />
      ),
      label: (
        <span className={cn(MenuItemSpanClassName, hidden)}>Analytics</span>
      ),
    },
    {
      key: PATH.BRIDGE,
      icon: (
        <Image
          className="flex-none"
          src={`/navbar-icon${PATH.BRIDGE}${pathname === PATH.BRIDGE ? "-active" : ""}.svg`}
          alt="logo"
          width={24}
          height={24}
        />
      ),
      label: <span className={cn(MenuItemSpanClassName, hidden)}>Bridge</span>,
    },
  ];
};
