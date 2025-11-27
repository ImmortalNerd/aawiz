import AuthGuard from "@/auth/guard/auth-guard";
import Header from "@/components/main/header";
import Loading from "@/components/main/loading";
import SideBar from "@/components/nav/side-bar";
import MainView from "@/layouts/main-view";
import { Suspense } from "react";
//-----------------------

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthGuard>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] min-h-screen">
          <SideBar />
          <div className="flex flex-col relative">
            <Header />
            <MainView>{children}</MainView>
          </div>
        </div>
      </AuthGuard>
    </Suspense>
  );
}
