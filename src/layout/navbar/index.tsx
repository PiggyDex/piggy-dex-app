"use client";

import { Menu } from "antd";
import { useAtom } from "jotai";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type FC, useLayoutEffect } from "react";

import ArrowHeadIcon from "@/assets/arrow-head-right-pink.svg";
import LogoutIcon from "@/assets/logout.svg";
import SettingsIcon from "@/assets/settings.svg";
import { borderClassNameAtom, navbarCollapsedAtom } from "@/atoms";
import { PATH } from "@/constants";
import { cn } from "@/lib";

import { NavbarItems } from "./navbarItems";

export const Navbar: FC = () => {
  const [collapsed, setCollapsed] = useAtom(navbarCollapsedAtom);
  const [border, setBorder] = useAtom(borderClassNameAtom);
  const router = useRouter();

  const pathname = usePathname();

  const toggleCollapsed = () => {
    setBorder("[&_*]:border-0");
    setCollapsed(!collapsed);
  };

  const NavbarWidth = collapsed ? "w-16 xl:w-20" : "w-52 2xl:w-64";

  const NavbarAnimate = collapsed
    ? "transition-all duration-300"
    : "transition-all duration-150";

  useLayoutEffect(() => {
    setTimeout(
      () => {
        setBorder("");
      },
      collapsed ? 250 : 100,
    );
  }, [collapsed, setBorder]);

  const MenuItemClassName =
    "[&_.ant-menu-item]:!px-4 [&_.ant-menu-item]:py-3 [&_.ant-menu-item]:flex [&_.ant-menu-item]:flex-row [&_.ant-menu-item]:items-center [&_.ant-menu-item]:justify-center [&_.ant-menu-item]:gap-2";

  const collapsedMenuItemClassName = collapsed
    ? "[&_.ant-menu-title-content]:hidden"
    : "";

  const MenuSelectedItemClassName =
    "[&_.ant-menu-item-selected]:!bg-primary-900 [&_.ant-menu-item-selected]:!text-primary-400";

  const handleItemClick = ({ key }: { key: string }) => {
    if (key === pathname) return;
    router.push(key);
  };

  return (
    <div
      className={cn(
        "h-screen py-6 sticky left-0 flex flex-col bg-navbar items-center justify-between rounded-r-xl",
        NavbarWidth,
        NavbarAnimate,
        border,
      )}
    >
      <div className="flex flex-col items-center gap-5 border-0 border-b border-solid border-neutral-700">
        <div className="flex w-full flex-col items-center justify-center border-0 border-b border-solid border-neutral-700 p-4">
          <div
            onClick={toggleCollapsed}
            className="absolute -right-5 flex items-center justify-center bg-transparent p-3 hover:cursor-pointer"
          >
            <button
              type="button"
              title="Dock Button"
              className=" flex items-center justify-center rounded-full border-none bg-navbar p-1 hover:cursor-pointer"
            >
              <ArrowHeadIcon
                className={cn(
                  "transition-all duration-500 w-4 h-4",
                  !collapsed ? "rotate-180 translate-x-[2px]" : "translate-x-1",
                )}
              />
            </button>
          </div>
          <Image
            className="flex-none transition-all duration-300 will-change-transform hover:cursor-pointer"
            src={collapsed ? "/logo.svg" : "/logo-w-text.svg"}
            alt="logo"
            width={collapsed ? 32 : 162}
            height={32}
            onClick={() => router.push(PATH.HOME)}
          />
        </div>
        <span
          className={cn(
            "will-change-transform ml-4 self-start text-base font-normal not-italic leading-[120%] text-neutral-50",
            collapsed && "animate-collapsing-title w-0",
            !collapsed && "animate-expanding-title",
          )}
        >
          Services
        </span>
        <Menu
          className={cn(
            "bg-navbar text-primary-50 mb-5 transition-all duration-300",
            MenuItemClassName,
            MenuSelectedItemClassName,
            collapsedMenuItemClassName,
            NavbarWidth,
          )}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            pathname !== PATH.HOME ? pathname : PATH.PORTFOLIO,
          ]}
          inlineCollapsed={collapsed}
          items={NavbarItems()}
          onClick={handleItemClick}
        />
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-5 px-4">
        <span
          className={cn(
            "will-change-transform text-base font-normal not-italic leading-[120%] text-neutral-50 !h-full",
            collapsed && "animate-collapsing-title w-0",
            !collapsed && "animate-expanding-title",
          )}
        >
          Account
        </span>
        <div className="flex w-full flex-col items-start">
          <div
            className={cn(
              "group flex w-full items-center justify-start gap-2 py-3 text-primary-400 hover:cursor-pointer",
              collapsed && "justify-center",
            )}
          >
            <SettingsIcon className="text-neutral-50 will-change-transform group-hover:rotate-90 group-hover:text-primary-200 group-hover:duration-500 group-hover:ease-in-out" />
            {!collapsed && (
              <span className="text-base font-normal not-italic leading-[120%] text-neutral-50 group-hover:text-primary-200">
                Settings
              </span>
            )}
          </div>
          <div
            className={cn(
              "group flex w-full items-center justify-start gap-2 py-3 text-primary-400 hover:cursor-pointer",
              collapsed && "justify-center",
            )}
          >
            <LogoutIcon className="text-neutral-50 group-hover:text-primary-200" />
            {!collapsed && (
              <span className="text-base font-normal not-italic leading-[120%] text-neutral-50 group-hover:text-primary-200">
                Logout
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
