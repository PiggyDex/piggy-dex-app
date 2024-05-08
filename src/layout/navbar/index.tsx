"use client";

import { Button, Menu } from "antd";
import { useAtom } from "jotai";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type FC } from "react";

import LogoutIcon from "@/assets/logout.svg";
import SettingsIcon from "@/assets/settings.svg";
import { NavbarCollapsedAtom } from "@/atoms";
import { PATH } from "@/constants";
import { cn } from "@/lib";

import { NavbarItems } from "./navbarItems";

export const Navbar: FC = () => {
  const [collapsed, setCollapsed] = useAtom(NavbarCollapsedAtom);
  const router = useRouter();

  const pathname = usePathname();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const NavbarWidth = collapsed ? "w-16 xl:w-20" : "w-52 2xl:w-64";

  const NavbarAnimate = collapsed
    ? "transition-all duration-300 ease-in-out"
    : "transition-all duration-100 ease-in-out";

  const MenuItemClassName =
    "[&_.ant-menu-item]:!px-4 [&_.ant-menu-item]:py-3 [&_.ant-menu-item]:flex [&_.ant-menu-item]:flex-row [&_.ant-menu-item]:items-center [&_.ant-menu-item]:justify-center [&_.ant-menu-item]:gap-2";

  const collapsedMenuItemClassName = collapsed
    ? "[&_.ant-menu-title-content]:hidden"
    : "";

  const MenuSelectedItemClassName =
    "[&_.ant-menu-item-selected]:!bg-primary-900 [&_.ant-menu-item-selected]:!text-primary-400";

  const handleItemClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <div
      className={cn(
        "h-screen py-6 sticky left-0 flex flex-col bg-navbar items-center justify-between rounded-r-xl",
        NavbarWidth,
        NavbarAnimate,
      )}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className="absolute mb-4 translate-x-96"
      >
        {collapsed ? "Expand" : "Collapse"}
      </Button>
      <div className="flex flex-col items-center gap-5 border-0 border-b border-solid border-neutral-700">
        <div className="flex w-full flex-col items-center justify-center border-0 border-b border-solid border-neutral-700 p-4">
          <Image
            className="flex-none"
            src={collapsed ? "/logo.svg" : "/logo-w-text.svg"}
            alt="logo"
            width={collapsed ? 32 : 162}
            height={32}
          />
        </div>
        {!collapsed && (
          <span className="ml-4 self-start text-base font-normal not-italic leading-[120%] text-neutral-50">
            Services
          </span>
        )}
        <Menu
          className={cn(
            "bg-navbar text-primary-50 mb-5",
            MenuItemClassName,
            MenuSelectedItemClassName,
            collapsedMenuItemClassName,
            NavbarWidth,
          )}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname || PATH.PORTFOLIO]}
          inlineCollapsed={collapsed}
          items={NavbarItems({ pathname })}
          onClick={handleItemClick}
        />
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-5 px-4">
        <span className="text-base font-normal not-italic leading-[120%] text-neutral-50">
          Account
        </span>
        <div className="flex flex-col items-start">
          <div className="group flex items-center gap-2 py-3 text-primary-400 hover:cursor-pointer">
            <SettingsIcon className="text-neutral-50 will-change-transform group-hover:rotate-90 group-hover:text-primary-200 group-hover:duration-500 group-hover:ease-in-out" />
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-50 group-hover:text-primary-200">
              Settings
            </span>
          </div>
          <div className="group flex items-center gap-2 py-3 hover:cursor-pointer">
            <LogoutIcon className="text-neutral-50 group-hover:text-primary-200" />
            <span className="text-base font-normal not-italic leading-[120%] text-neutral-50 group-hover:text-primary-200">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
