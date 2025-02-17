import Sidebar from "@/components/sidebar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-2 p-2 min-h-dvh">
      <Sidebar />
      <section className="h-full rounded p-4 bordered-wrapper">
        {children}
      </section>
    </div>
  );
};

export default Layout;
