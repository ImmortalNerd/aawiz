import React from "react";

export function IconDashboard({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 1 0-4 0m3.45-1.45L15.5 9.5"></path>
        <path d="M6.4 20a9 9 0 1 1 11.2 0z"></path>
      </g>
    </svg>
  );
}
