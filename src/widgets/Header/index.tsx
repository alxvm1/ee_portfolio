import { type FC } from "react";
import "./style.css";
import { HeaderSwitch } from "./ui/HeaderSwitch";
import { Button } from "@/shared/ui";
import LogoIcon from "@shared/assets/svg/logoIcon.svg?react";
import ArrowDownIcon from "@shared/assets/svg/common/arrowDownIcon.svg?react";

export const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-sm">
      <LogoIcon />
      <HeaderSwitch />
      <Button variant={"outline"} className="header-contacts-button">
        Связаться
        <ArrowDownIcon />
      </Button>
    </header>
  );
};
