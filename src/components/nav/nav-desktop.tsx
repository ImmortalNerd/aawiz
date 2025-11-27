"use client";
import Image from "next/image";
import React from "react";
import { useNavData } from "./nav-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
//---------------------------

const NavDesktop = () => {
  const navData = useNavData();

  const pathname = usePathname();

  return (
    <nav className="p-5 grid-rows-[auto_1fr] gap-7 min-w-[300px] border-r border-r-ghost hidden md:grid">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={100}
        priority
      />
      <ul className="flex flex-col">
        {navData.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li
              className={`rounded-lg ${
                isActive
                  ? "bg-primary bg-opacity-30 text-primary"
                  : "hover:bg-[#63738114]"
              }`}
              key={item.title}
            >
              <Link href={item.path} className="flex items-center gap-2 p-3">
                <>
                  {item.icon}
                  <span className="font-semibold">{item.title}</span>
                </>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavDesktop;
