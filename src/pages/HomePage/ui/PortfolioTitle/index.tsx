import type { FC } from "react";
import TitleIcon from "../../assets/svg/titleIcon.svg?react";
import EllipseIcon from "../../assets/svg/ellipseIcon.svg?react";
import "./style.css";

export const PortfolioTitle: FC = () => {
  return (
    <div className="portfolio-title">
      <div className="porfolio-title__description first-description">
        <span>UI/UX + Web</span>
        <span>Графический</span>
        <span>Иллюстрации</span>
      </div>
      <div className="portfolio-title__wrapper">
        <TitleIcon className="portfolio-title__title" />
        <EllipseIcon className="portfolio-title__ellipse" />
      </div>
      <div className="porfolio-title__description second-description">
        <span>Ребизова Екатерина</span>
        <span>Дизайнер</span>
      </div>
    </div>
  );
};
