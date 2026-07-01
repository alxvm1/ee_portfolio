import { authModel, LoginForm } from "@features/Auth";
import type { TProjectCategory } from "@entities/Project";
import { adminPageModel } from "./model";
import { TABS_CONFIG } from "@widgets/ProjectsTabs";
import { Button } from "@shared/ui";
import { useUnit } from "effector-react";
import { type FC, useEffect } from "react";
import { ProjectsList } from "./ui/ProjectsList";
import { TextProjectForm } from "./ui/TextProjectForm";
import { PdfProjectForm } from "./ui/PdfProjectForm";
import "./style.css";

const isTextCategory = (
  category: TProjectCategory,
): category is "graphicDesign" | "illustrations" =>
  category === "graphicDesign" || category === "illustrations";

const AdminPanel: FC = () => {
  const [activeTab, isCreating] = useUnit([
    adminPageModel.stores.$activeCategory,
    adminPageModel.stores.$isCreating,
  ]);

  const [categoryTabClicked, createFormOpened, adminPageMounted, signOutClicked] = useUnit([
    adminPageModel.events.categoryTabClicked,
    adminPageModel.events.createFormOpened,
    adminPageModel.events.adminPageMounted,
    authModel.events.signOutClicked,
  ]);

  useEffect(() => {
    adminPageMounted();
  }, [adminPageMounted]);

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h1 className="admin-panel__title">Управление проектами</h1>
        <Button className="admin-panel__exit-button" variant="outline" onClick={signOutClicked}>
          Выйти
        </Button>
      </div>

      <div className="admin-panel__tabs">
        {TABS_CONFIG.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => categoryTabClicked(tab.value)}
            className={`admin-panel__tab${activeTab === tab.value ? " admin-panel__tab--active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {!isCreating && (
        <Button className="admin-panel__create-button" onClick={createFormOpened}>
          + Добавить проект
        </Button>
      )}

      {isCreating ? (
        isTextCategory(activeTab) ? <TextProjectForm /> : <PdfProjectForm />
      ) : (
        <ProjectsList category={activeTab} />
      )}
    </div>
  );
};

export const AdminPage: FC = () => {
  const [session, isLoading] = useUnit([
    authModel.stores.$session,
    authModel.stores.$isSessionLoading,
  ]);
  const authInitRequested = useUnit(authModel.events.authInitRequested);

  useEffect(() => {
    authInitRequested();
  }, [authInitRequested]);

  if (isLoading) return null;

  return session ? <AdminPanel /> : <LoginForm />;
};
