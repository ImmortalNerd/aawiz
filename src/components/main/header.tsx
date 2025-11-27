"use client";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import { usePopover } from "@/hooks/use-popover";
import { IconAccount } from "@/icons/icon-account";
import { IconMoon } from "@/icons/icon-moon";
import { IconSun } from "@/icons/icon-sun";
import { useTheme } from "@/theme/theme-providers";
import React from "react";
import Button from "./button";
import { IconLogout } from "@/icons/icon-logout";
//--------------------------

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthContext();

  const {
    anchorRef,
    popoverElement: accountPopover,
    toggle: toggleAccount,
  } = usePopover<HTMLButtonElement>({
    placement: "bottom-right",
    content: (
      <div className="flex flex-col gap-4 z-[9999]">
        <p className="px-2 py-1 capitalize font-semibold whitespace-nowrap">
          {user?.firstname + " " + user?.lastname}
        </p>
        <Button
          variant="contained"
          color="danger"
          onClick={() => {
            logout();
          }}
          startIcon={<IconLogout width={16} height={16} />}
        >
          Logout
        </Button>
      </div>
    ),
    contentClassName: "text-gray-900 dark:text-gray-100",
  });

  return (
    <>
      <div className="py-2 px-4 flex gap-3 justify-end sticky top-0 z-10 bg-white dark:bg-darkBg">
        <button
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
          className="rounded-full p-2 hover:bg-[#63738114]"
        >
          {theme === "dark" ? <IconSun /> : <IconMoon />}
        </button>
        <button
          ref={anchorRef}
          onClick={toggleAccount}
          className="rounded-full p-2 hover:bg-[#63738114] relative"
        >
          <IconAccount />
        </button>
      </div>
      {accountPopover}
    </>
  );
};

export default Header;
