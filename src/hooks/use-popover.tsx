"use client";

import React, { useState, useRef, useEffect } from "react";

interface UsePopoverOptions {
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "bottom-right"
    | "top-right";
  content: React.ReactNode;
  offset?: number;
  className?: string;
  contentClassName?: string;
}

export const usePopover = <T extends HTMLElement = HTMLElement>({
  placement = "bottom",
  content,
  offset = 8,
  className = "",
  contentClassName = "",
}: UsePopoverOptions & { anchorType?: T }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const anchorRef = useRef<T>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  const calculatePosition = () => {
    if (!anchorRef.current || !popoverRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = anchorRect.top - popoverRect.height - offset;
        left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
        break;
      case "bottom":
        top = anchorRect.bottom + offset;
        left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
        break;
      case "left":
        top = anchorRect.top + (anchorRect.height - popoverRect.height) / 2;
        left = anchorRect.left - popoverRect.width - offset;
        break;
      case "right":
        top = anchorRect.top + (anchorRect.height - popoverRect.height) / 2;
        left = anchorRect.right + offset;
        break;
      case "bottom-right":
        top = anchorRect.bottom + offset;
        left = anchorRect.right;
        break;
      case "top-right":
        top = anchorRect.top - popoverRect.height - offset;
        left = anchorRect.right;
        break;
      default:
        top = anchorRect.bottom + offset;
        left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
    }

    if (top < 0) top = Math.max(anchorRect.top + offset, 0);
    if (left < 0) left = 0;
    if (top + popoverRect.height > window.innerHeight)
      top = window.innerHeight - popoverRect.height;
    if (left + popoverRect.width > window.innerWidth)
      left = window.innerWidth - popoverRect.width;

    setPosition({
      top: top + scrollY,
      left: left + scrollX,
    });
  };

  useEffect(() => {
    if (open) {
      requestAnimationFrame(calculatePosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, placement, offset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        anchorRef.current &&
        popoverRef.current &&
        !anchorRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", calculatePosition);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", calculatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const popoverElement = open ? (
    <div
      ref={popoverRef}
      className={`fixed z-[9999] bg-white dark:bg-darkBg rounded-lg popover-shadow p-4 min-w-[200px] ${contentClassName}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left - 20}px`,
      }}
    >
      {content}
    </div>
  ) : null;

  return {
    open,
    anchorRef,
    popoverElement,
    toggle,
    close,
    className,
  };
};
