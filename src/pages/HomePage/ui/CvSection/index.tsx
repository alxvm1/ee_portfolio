import { Accordion, Button } from "@/shared/ui";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion";
import type { FC } from "react";
import "./style.css";
import FigmaIcon from "../../assets/svg/figmaIcon.svg?react";
import PhotoshopIcon from "../../assets/svg/photoshopIcon.svg?react";
import IllustratorIcon from "../../assets/svg/illustratorIcon.svg?react";
import CorelDRAWIcon from "../../assets/svg/coreldrawIcon.svg?react";
import MaxIcon from "../../assets/svg/3dsIcon.svg?react";
import { DotProgress } from "@/shared/ui/DotProgress";
import eeImage from "../../assets/images/eeImage.png";

export const CvSection: FC = () => {
  return (
    <section id="cv" className="cv-section">
      <p className="cv-section-title">РЕЗЮМЕ</p>
      <div className="flex flex-row w-full gap-10">
        <img src={eeImage} className="cv-section-ee-image" alt="ee-image" />
        <Accordion type="multiple" className="cv-section-accordion flex-1">
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
                  <div className="flex flex-row gap-3">
                    <p className="cv-section-description-text">ФИО:</p>
                    <p className="cv-section-title-text">
                      Ребизова Екатерина Евгеньевна
                    </p>
                  </div>
                  <div className="flex flex-row gap-3">
                    <p className="cv-section-description-text">Год рождения:</p>
                    <p className="cv-section-title-text">2002</p>
                  </div>
                  <div className="flex flex-row gap-3">
                    <p className="cv-section-description-text">
                      Город проживания:
                    </p>
                    <p className="cv-section-title-text">Томск</p>
                  </div>
                  <div className="flex flex-row gap-3">
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
                <div className="flex flex-row gap-8">
                  <p className="cv-section-accent-title-text">/1</p>
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">UI/UX дизайн</p>
                    <p className="cv-section-description-text">
                      Интерфейсы, ПРИЛОЖЕНИЯ: логичный, интуитивно понятный UI и
                      современный UX.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <p className="cv-section-accent-title-text">/2</p>
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">Web - дизайн</p>
                    <p className="cv-section-description-text">
                      Сайты: лэндинги, многостраничные. (создаю дизайн, для
                      вёрстки необходим разработчик)
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <p className="cv-section-accent-title-text">/3</p>
                  <div className="flex flex-col">
                    <p className="cv-section-title-text">Графическими дизайн</p>
                    <p className="cv-section-description-text">
                      Печатная и сувенирная продукция: постеры, листовки,
                      баннеры, упаковка, канцелярия, и др.А так же брендинг и
                      карточки товара
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-8">
                  <p className="cv-section-accent-title-text">/4</p>
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
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-8">
                  <div className="cv-section-software-bubble">
                    <FigmaIcon />
                    <div>
                      <span className="cv-section-software-title">Figma</span>
                      <DotProgress value={5} />
                    </div>
                  </div>
                  <p className="cv-section-description-text">
                    Сайты, графика, интерфейсы
                  </p>
                </div>
                <div className="flex flex-row items-center gap-8">
                  <div className="cv-section-software-bubble">
                    <PhotoshopIcon />
                    <div>
                      <span className="cv-section-software-title">
                        Photoshop
                      </span>
                      <DotProgress value={4} />
                    </div>
                  </div>
                  <p className="cv-section-description-text">
                    Иллюстрации, обработка фото
                  </p>
                </div>
                <div className="flex flex-row items-center gap-8">
                  <div className="cv-section-software-bubble">
                    <IllustratorIcon />
                    <div>
                      <span className="cv-section-software-title">
                        Illustrator
                      </span>
                      <DotProgress value={3} />
                    </div>
                  </div>
                  <p className="cv-section-description-text">
                    Векторные иллюстрации
                  </p>
                </div>
                <div className="flex flex-row items-center gap-8">
                  <div className="cv-section-software-bubble">
                    <CorelDRAWIcon />
                    <div>
                      <span className="cv-section-software-title">
                        CorelDRAW
                      </span>
                      <DotProgress value={3} />
                    </div>
                  </div>
                  <p className="cv-section-description-text">
                    Подготовка макетов к печати
                  </p>
                </div>
                <div className="flex flex-row items-center gap-8">
                  <div className="cv-section-software-bubble">
                    <MaxIcon />
                    <div>
                      <span className="cv-section-software-title">3ds Max</span>
                      <DotProgress value={2} />
                    </div>
                  </div>
                  <p className="cv-section-description-text">3D графика</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <p className="cv-section-title-text">ОБРАЗОВАНИЕ</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <span className="cv-section-accent-title-text">
                      2020 - 2024
                    </span>
                    <span className="cv-section-title-text">[ТГАСУ]</span>
                  </div>
                  <span className="cv-section-description-text">
                    Томский государственный архитектурно-строительный
                    университет, Архитектурный факультет, направление
                    архитектура
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <span className="cv-section-accent-title-text">
                      2023 - 2024
                    </span>
                    <span className="cv-section-title-text">[Нетология]</span>
                  </div>
                  <span className="cv-section-description-text">
                    Курс, Графический дизайн и коммуникации
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <span className="cv-section-accent-title-text">
                      2024 - 2026
                    </span>
                    <span className="cv-section-title-text">[ТГАСУ]</span>
                  </div>
                  <span className="cv-section-description-text">
                    Томский государственный архитектурно-строительный
                    университет, Архитектурный факультет, направление
                    графический дизайн
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <span className="cv-section-accent-title-text">
                      2025 - 2026
                    </span>
                    <span className="cv-section-title-text">[Skillbox]</span>
                  </div>
                  <span className="cv-section-description-text">
                    Курс, UI/UX дизайн
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-12 mb-12">
        <p className="cv-section-contacts-title-text text-center">КОНТАКТЫ</p>
        <div className="flex flex-row gap-1 justify-center">
          <Button className="cv-section-contacts-button">Telegram</Button>
          <Button className="cv-section-contacts-button">ВКонтакте</Button>
          <Button className="cv-section-contacts-button">Почта</Button>
        </div>
      </div>
    </section>
  );
};
