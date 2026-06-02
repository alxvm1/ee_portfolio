import { Accordion, Button } from "@/shared/ui";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion";
import type { FC } from "react";
import "./style.css";
import { CircularProgress } from "@/shared/ui/CircularProgress";
import eeImage from "../../assets/images/eeImage.png";

export const CvSection: FC = () => {
  return (
    <section id="cv" className="cv-section">
      <div className="cv-section-title-wrapper">
        <img src={eeImage} className="cv-section-ee-image" alt="ee-image" />
        <p className="cv-section-title">РЕЗЮМЕ</p>
      </div>

      <div className="flex flex-row w-full gap-10">
        <Accordion
          type="single"
          collapsible
          className="cv-section-accordion flex-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <p className="cv-section-title-text">ОБО МНЕ</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <p className="cv-section-description-text">
                    Добрый день, меня зовут Екатерина, я дизайнер!
                  </p>
                  <p className="cv-section-description-text">
                    Я мультизадачный специалист, работаю в разных сферах. Создаю
                    современный и запоминающийся дизайн: от эффектных постеров
                    до интуитивно понятных интерфейсов.
                  </p>
                  <p className="cv-section-description-text">
                    На данный момент я являюсь студенткой 4 курса по направлению
                    “Графический дизайн”, и в приоритете рассматриваю
                    предложения IT компаний - на должности ui/ux и web
                    дизайнеров.
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3 items-center cv-section-item-background">
                    <p className="cv-section-description-text">ФИО:</p>
                    <p className="cv-section-title-text">
                      Ребизова Екатерина Евгеньевна
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 items-center cv-section-item-background">
                    <p className="cv-section-description-text">Год рождения:</p>
                    <p className="cv-section-title-text">2002</p>
                  </div>
                  <div className="flex flex-col gap-3 items-center cv-section-item-background">
                    <p className="cv-section-description-text">
                      Условия труда:
                    </p>
                    <p className="cv-section-title-text">
                      Офис(Томск)/Удаленно
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <p className="cv-section-title-text">НАПРАВЛЕНИЯ</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-10">
                <div className="flex flex-row gap-8 cv-section-item-background">
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">UI/UX дизайн</p>
                    <p className="cv-section-description-text">
                      Интерфейсы, ПРИЛОЖЕНИЯ: логичный, интуитивно понятный UI и
                      современный UX.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 cv-section-item-background">
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">Web - дизайн</p>
                    <p className="cv-section-description-text">
                      Сайты: лэндинги, многостраничные. (создаю дизайн, для
                      вёрстки необходим разработчик)
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 cv-section-item-background">
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">Графическими дизайн</p>
                    <p className="cv-section-description-text">
                      Печатная и сувенирная продукция: постеры, листовки,
                      баннеры, упаковка, канцелярия, и др.А так же брендинг и
                      карточки товара
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8 cv-section-item-background">
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">Иллюстрации</p>
                    <p className="cv-section-description-text">
                      Любого жанра: от иллюстраций для детских книг до стрит
                      арта
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <p className="cv-section-title-text">ПРОГРАММЫ</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="cv-section-software-wrapper">
                <CircularProgress value={90} label="Figma" />
                <CircularProgress value={80} label="Photoshop" />
                <CircularProgress value={60} label="Illustrator" />
                <CircularProgress value={60} label="CorelDRAW" />
                <CircularProgress value={40} label="3ds Max" />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <p className="cv-section-title-text">ОБРАЗОВАНИЕ</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2 cv-section-item-background">
                  <span className="cv-section-title-text">ТГАСУ</span>
                  <span className="cv-section-description-text text-[#b1b1b1]">
                    2020 - 2024
                  </span>
                  <span className="cv-section-description-text">
                    Томский государственный архитектурно-строительный
                    университет, Архитектурный факультет, направление
                    архитектура
                  </span>
                </div>
                <div className="flex flex-col gap-2 cv-section-item-background">
                  <span className="cv-section-title-text">Нетология</span>
                  <span className="cv-section-description-text text-[#b1b1b1]">
                    2023 - 2024
                  </span>
                  <span className="cv-section-description-text">
                    Курс, Графический дизайн и коммуникации
                  </span>
                </div>
                <div className="flex flex-col gap-2 cv-section-item-background">
                  <span className="cv-section-title-text">ТГАСУ</span>
                  <span className="cv-section-description-text text-[#b1b1b1]">
                    2024 - 2026
                  </span>
                  <span className="cv-section-description-text">
                    Томский государственный архитектурно-строительный
                    университет, Архитектурный факультет, направление
                    графический дизайн
                  </span>
                </div>
                <div className="flex flex-col gap-2 cv-section-item-background">
                  <span className="cv-section-title-text">Skillbox</span>
                  <span className="cv-section-description-text text-[#b1b1b1]">
                    2025 - 2026
                  </span>
                  <span className="cv-section-description-text">
                    Курс, UI/UX дизайн
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-5 mb-12">
        <p className="cv-section-contacts-title-text text-center">КОНТАКТЫ</p>
        <div className="flex flex-row gap-1 justify-center">
          <Button className="cv-section-contacts-button">Telegram</Button>
          <Button className="cv-section-contacts-button">ВКонтакте</Button>
        </div>
      </div>
    </section>
  );
};
