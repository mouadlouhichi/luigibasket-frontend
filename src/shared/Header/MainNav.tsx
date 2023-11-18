"use client";

import React, { FC, use, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTimeoutFn } from "react-use";
import { settings } from "@/app";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Link } from "@/lib/router-events";
import { useUserContext } from "@/providers/UserProvider";
import { PathName, Route } from "@/routers/types";
import useAppStore from "@/store";
import { AppUser } from "@/types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import { NAVIGATION } from "@/data/navigation";
import { useIsClient } from "@/hooks/use-is-client";
import MenuBar from "@/shared/MenuBar";
import Navigation from "@/shared/Navigation/Navigation";
import LocaleSwitcher from "@/shared/Switchers/LocaleSwitcher";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Skeleton from "@/components/Skeleton";
import ThemeSwitcher from "@/components/SwitchDarkMode";

import AvatarDropdown from "./AvatarDropdown";
import Cart from "./Cart";

export interface MainNavProps {
  className?: string;
  type?: "moderated" | "main" | "dashboard";
  isLoading?: boolean;
  hasSurvey?: boolean;
  user: AppUser;
  hasBorder?: boolean;
}

const MainNav: FC<MainNavProps> = ({
  className = "",
  type = "main",
  isLoading,
  hasSurvey = false,
  user,
}) => {
  const { isAdmin } = useAppStore();

  const renderUserLogin = () => {
    if (user && user?.name) {
      return <AvatarDropdown user={user} />;
    } else {
      return (
        <Button intent={"secondary"} className="mr-2 " href="/login">
          Login
        </Button>
      );
    }
  };

  const renderSurveyButton = () => {
    if (!hasSurvey) {
      return (
        <Link href={"/survey" as Route} className="flex">
          <Button className="self-center" intent={"primary"}>
            Get Started
          </Button>
        </Link>
      );
    }
  };

  const [showModal, setShowModal] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  const [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //
  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const { getBasketCount } = useAppStore();

  const mounted = useIsClient();

  switch (type) {
    case "main":
      return (
        <>
          <div className={` relative z-10 ${className}`}>
            <div className="relative flex h-20 justify-between px-4 md:px-8 2xl:container">
              <div className="hidden flex-1 justify-start space-x-4 sm:space-x-10 md:flex">
                <Logo className=" -mt-2 " size="lg" />
                <Navigation />
              </div>

              <div className="!mx-auto flex  flex-[3] md:hidden md:px-3 ">
                <div className="flex-1 self-center">
                  <div className="flex items-center justify-between">
                    <Logo className="-ml-1 -mt-2 " />
                    {NAVIGATION.length > 0 && <MenuBar />}
                    {settings.carteEnabled && (
                      <div className="relative flex h-fit" onClick={openModal}>
                        <ShoppingCartIcon
                          width={24}
                          hanging={24}
                          className="min-w-[1.5rem]	 min-h-[1.5rem]	"
                        />
                        <span className="absolute top-[-4px] left-[1rem] w-4 h-4 bg-black text-white rounded-full text-xs flex items-center justify-center">
                          {(mounted && getBasketCount()) || 0}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden flex-1 shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
                <div className="hidden gap-2 space-x-0.5 xl:flex items-center">
                  {settings.themeToggleEnabled && <ThemeSwitcher />}
                  {settings.internationalizationEnabled && (
                    <LocaleSwitcher className="flex h-12 items-center justify-center self-center" />
                  )}
                  {settings.authEnabled && renderUserLogin()}
                  {settings.surveyEnabled && !hasSurvey && (
                    <Link href={"/survey" as Route} className="flex">
                      <Button className="self-center" intent={"primary"}>
                        Get Started
                      </Button>
                    </Link>
                  )}
                  {settings.carteEnabled && (
                    <div
                      className="relative flex h-fit  items-center"
                      onClick={openModal}
                    >
                      <ShoppingCartIcon
                        width={24}
                        hanging={24}
                        className="min-w-[1.5rem]	 min-h-[1.5rem]	"
                      />
                      <span className="absolute top-[-4px] left-[1rem] w-4 h-4 bg-black text-white rounded-full text-xs flex items-center justify-center">
                        {(mounted && getBasketCount()) || 0}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center xl:hidden">
                  {settings.themeToggleEnabled && <ThemeSwitcher />}

                  {NAVIGATION.length > 0 && <MenuBar />}
                  <div className="px-0.5" />
                  {settings.carteEnabled && (
                    <div className="relative flex h-fit" onClick={openModal}>
                      <ShoppingCartIcon
                        width={24}
                        hanging={24}
                        className="min-w-[1.5rem]	 min-h-[1.5rem]	"
                      />
                      <span className="absolute top-[-4px] left-[1rem] w-4 h-4 bg-black text-white rounded-full text-xs flex items-center justify-center">
                        {(mounted && getBasketCount()) || 0}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Cart
            showModal={showModal}
            closeModal={closeModal}
            resetIsShowingDialog={resetIsShowingDialog}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
          />
        </>
      );
    case "moderated":
      return (
        <div className={` relative z-10 ${className}`}>
          <div className="relative flex h-20 justify-between px-4 ">
            <div className="!mx-auto flex  flex-[3] md:px-3 ">
              <div className="flex-1 self-center">
                <div className="flex items-center justify-between">
                  <Logo className="-ml-1 -mt-2 w-[8rem] self-center" />
                  <MenuBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "dashboard":
      return (
        <div className={` relative z-10 ${className}`}>
          <div className="relative flex h-20 justify-between px-4 md:px-8 2xl:container">
            <div className="hidden flex-1 justify-start space-x-4 sm:space-x-10 md:flex">
              <Logo className=" -mt-2 " size="lg" />
              <Navigation type="dashboard" />
            </div>

            <div className="!mx-auto flex  flex-[3] md:hidden md:px-3 ">
              <div className="flex-1 self-center">
                <div className="flex items-center justify-between">
                  <Logo className="-ml-1 -mt-2 " />
                  <p> MESSAGES</p>
                  <MenuBar />
                </div>
              </div>
            </div>

            <div className="hidden flex-1 shrink-0 justify-end text-neutral-700 dark:text-neutral-100 md:flex lg:flex-none">
              <div className="hidden gap-2 space-x-0.5 xl:flex items-center">
                {settings.themeToggleEnabled && <ThemeSwitcher />}
                {settings.internationalizationEnabled && (
                  <LocaleSwitcher className="flex h-12 items-center justify-center self-center" />
                )}
                {renderUserLogin()}
                {renderSurveyButton()}
              </div>

              <div className="flex items-center xl:hidden">
                {settings.themeToggleEnabled && <ThemeSwitcher />}
                <div className="px-0.5" />

                <MenuBar />
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default MainNav;
