import { scrollToBottom, scrollToTop } from "@/shared/lib/scroll";
import { Button } from "@/shared/ui";
import ArrowDownIcon from "@shared/assets/svg/common/arrowDownIcon.svg?react";
import ContactIcon from "@shared/assets/svg/common/contactsIcon.svg?react";
import LogoIcon from "@shared/assets/svg/logoIcon.svg?react";
import { type FC } from "react";
import "./style.css";
import type { IHeaderProps } from "./types";
import { HeaderSwitch } from "./ui/HeaderSwitch";

export const Header: FC<IHeaderProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <header className="header">
      <LogoIcon className="header-logo" onClick={scrollToTop} />

      {activeSection && onSectionChange && (
        <HeaderSwitch
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )}

      <Button
        variant={"outline"}
        className="header-contacts-button-desktop"
        onClick={scrollToBottom}
      >
        Контакты
        <ArrowDownIcon />
      </Button>
      <button
        className="header-contacts-button-mobile"
        onClick={scrollToBottom}
      >
        <ContactIcon />
      </button>
    </header>
  );
};
