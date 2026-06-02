import { type FC, useState } from "react";

import { Header } from "@widgets/Header";
import { HeroSection } from "./ui/HeroSection";
import { ProjectsSection } from "./ui/ProjectsSection";
import { ContactSection } from "./ui/ContactSection";
import { type THeaderSwitchOptions } from "@widgets/Header/ui/HeaderSwitch/types";
import { CvSection } from "./ui/CvSection";

export const HomePage: FC = () => {
  const [activeSection, setActiveSection] =
    useState<THeaderSwitchOptions>("portfolio");

  return (
    <>
      <Header
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="pt-[152px]">
        {activeSection === "portfolio" ? (
          <>
            <HeroSection />
            <ProjectsSection />
            <ContactSection />
          </>
        ) : (
          <CvSection />
        )}
      </main>
    </>
  );
};
