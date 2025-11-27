"use client";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { formatNumber } from "@/utils/format-numbers";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
//--------------------------------------

type Props = {
  data: number[];
  color?: string;
};

const DashboardChart = ({ data, color = "#2754A7" }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (typeof window === "undefined") return null;

  const chartOptions = {
    colors: [color],
    fill: {
      type: "gradient",
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 2,
      },
    },
    tooltip: {
      enabled: true,
      appendTo: () => wrapperRef.current || document.body,
      fixed: {
        enabled: true,
        position: "topRight",
        offsetY: -10,
        offsetX: 10,
      },
      x: { show: false },
      y: {
        formatter: (value: number) => formatNumber(value),
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
      followCursor: false,
      intersect: true,
    },
  };

  return (
    <div
      ref={wrapperRef}
      className="relative h-[36px] w-[60px] overflow-hidden"
      aria-hidden="true"
    >
      <Chart
        type="bar"
        series={[{ data: data }]}
        options={chartOptions}
        width={60}
        height={36}
      />
    </div>
  );
};

export default DashboardChart;
