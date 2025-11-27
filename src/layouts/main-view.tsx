import React from "react";

const MainView = ({ children }: { children: React.ReactNode }) => {
  return <main className="p-2 w-full">{children}</main>;
};

export default MainView;
