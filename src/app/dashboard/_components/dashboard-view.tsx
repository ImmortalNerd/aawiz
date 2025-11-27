"use client";
import { useAuthContext } from "@/auth/hooks/use-auth-context";
import Button from "@/components/main/button";
import Card from "@/components/main/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import DashboardChart from "./dashboard-chart";
//----------------------------------

const DashboardView = () => {
  const { user } = useAuthContext();

  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <Card
        actions={
          <Button
            variant="contained"
            onClick={() => router.push("/dashboard/users")}
          >
            Go to Users
          </Button>
        }
        className="!bg-background dark:!bg-darkBg"
      >
        <div className="p-4 flex flex-col md:flex-row justify-between gap-3 items-center">
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl text-primary">
              Welcome back 👋{" "}
            </h4>
            <p className="text-lg text-primary capitalize">{user?.firstname}</p>
          </div>
          <Image
            src="/images/dashboard.png"
            alt="dashboard"
            width={200}
            height={200}
          />
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card title="Total Users" subtitle="Total number of registered users">
          <div className="flex justify-between items-end font-bold text-xl">
            <p>1,654</p>
            <DashboardChart data={[20, 41, 63, 33, 28, 35, 50]} />
          </div>
        </Card>
        <Card
          title="Total Transactions"
          subtitle="Total number of transactions"
        >
          <div className="flex justify-between items-end font-bold text-xl">
            <p>16,987</p>
            <DashboardChart data={[113, 58, 100, 78, 65, 98]} color="#00b8d9" />
          </div>
        </Card>
        <Card
          title="Successful Transactions"
          subtitle="Number of successful transactions"
        >
          <div className="flex justify-between items-end font-bold text-xl">
            <p>9,607</p>
            <DashboardChart data={[96, 43, 97, 114, 56, 100]} color="#ff5630" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
