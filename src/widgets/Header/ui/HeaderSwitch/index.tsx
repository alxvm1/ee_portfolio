import { Button } from "@/shared/ui";
import { useState, type FC } from "react";
import type { THeaderSwitchOptions } from "./types";

export const HeaderSwitch: FC = () => {
  const [activeSection, setActiveSection] =
    useState<THeaderSwitchOptions>("portfolio");

  return (
    <div className="header-switch-wrapper">
      <div
        className="header-switch-background"
        data-portfolio-active={activeSection === "portfolio"}
        data-cv-active={activeSection === "cv"}
      ></div>
      <Button
        className="header-switch-button"
        data-is-active={activeSection === "portfolio"}
        onClick={() => setActiveSection("portfolio")}
      >
        Портфолио
      </Button>
      <Button
        className="header-switch-button"
        onClick={() => setActiveSection("cv")}
      >
        Резюме
      </Button>
    </div>
  );
};
