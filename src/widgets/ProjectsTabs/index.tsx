import { cn } from "@shared/lib/utils";
import { type FC } from "react";
import { TABS_CONFIG } from "./config";
import "./style.css";
import type { TProjectsTabsProps } from "./types";

export const ProjectsTabs: FC<TProjectsTabsProps> = ({ active, onChange }) => {
  return (
    <div className="projects-tabs">
      {TABS_CONFIG.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={cn(
            "projects-tabs__item",
            active === tab.value && "projects-tabs__item--active",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export { TABS_CONFIG };
