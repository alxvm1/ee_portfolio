import { type FC, useState } from "react";

import { Header } from "@widgets/Header";
import { type THeaderSwitchOptions } from "@widgets/Header/ui/HeaderSwitch/types";
import { CvSection } from "./ui/CvSection";
import { PortfolioSection } from "./ui/PortfolioSection";
import { Outlet, useLocation } from "react-router-dom";

export const HomePage: FC = () => {
  const location = useLocation();
  const isProjectRoute = location.pathname.startsWith("/project");

  const [manualSection, setManualSection] =
    useState<THeaderSwitchOptions>("portfolio");
  const activeSection = isProjectRoute ? "portfolio" : manualSection;

  return (
    <>
      <Header
        activeSection={activeSection}
        onSectionChange={setManualSection}
      />
      <main className="pt-[52px]">
        {activeSection === "portfolio" ? <PortfolioSection /> : <CvSection />}
      </main>
      <Outlet />
    </>
  );
};
