import { Button } from "@/shared/ui";
import { type FC } from "react";
import type { IHeaderSwitchProps } from "./types";

export const HeaderSwitch: FC<IHeaderSwitchProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="header-switch-wrapper">
      <div
        className="header-switch-background"
        data-portfolio-active={activeSection === "portfolio"}
        data-cv-active={activeSection === "cv"}
      />
      <Button
        className="header-switch-button"
        data-is-active={activeSection === "portfolio"}
        onClick={() => onSectionChange("portfolio")}
      >
        Портфолио
      </Button>
      <Button
        className="header-switch-button"
        data-is-active={activeSection === "cv"}
        onClick={() => onSectionChange("cv")}
      >
        Резюме
      </Button>
    </div>
  );
};
