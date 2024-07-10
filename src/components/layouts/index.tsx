import React from "react";

import TopBar from "@/components/layouts/top-bar";
import NavBar from "@/components/layouts/nav-bar";
import MobileFooter from "@/components/layouts/mobile-footer";
import Footer from "@/components/layouts/footer";
// import Overview from "@/components/layouts/overview";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <TopBar />
      <NavBar />
      {children}
      <Footer />
      <MobileFooter />
    </>
  );
}
