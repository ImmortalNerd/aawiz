"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useNavData } from "./nav-data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navData = useNavData();
  const pathname = usePathname();

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <button onClick={toggleDrawer}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}
      {isOpen && (
        <nav className="fixed inset-0 z-40 md:hidden">
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleDrawer}
          />
          <div
            className={`relative w-80 h-full bg-white dark:bg-darkBg p-5 grid grid-rows-[auto_1fr] gap-7 overflow-y-auto transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-[-100%]"
            }`}
          >
            <div className="flex justify-between items-start">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={100}
              />
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ul className="flex flex-col">
              {navData.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li
                    className={`rounded-lg ${
                      isActive
                        ? "bg-primary bg-opacity-30 text-primary"
                        : "hover:bg-slate-100"
                    }`}
                    key={item.title}
                  >
                    <Link
                      href={item.path}
                      className="flex items-center gap-2 p-3"
                      onClick={toggleDrawer}
                    >
                      <>
                        {item.icon}
                        <span className="font-bold">{item.title}</span>
                      </>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavMobile;
