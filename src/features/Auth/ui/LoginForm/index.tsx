import { Button, Input, Label } from "@shared/ui";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { type FC } from "react";
import { authModel } from "../../model";
import "./style.css";

export const LoginForm: FC = () => {
  const { fields, submit } = useForm(authModel.forms.loginForm);
  const [isSubmitting] = useUnit([authModel.stores.$isSigningIn]);

  return (
    <div className="login-form__wrapper">
      <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="login-form">
        <div className="login-form__field">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="login-form__input"
            value={fields.email.value}
            onChange={(e) => fields.email.onChange(e.target.value)}
          />
          {fields.email.firstError && (
            <p className="login-form__error">{fields.email.firstError.errorText}</p>
          )}
        </div>

        <div className="login-form__field">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            className="login-form__input"
            value={fields.password.value}
            onChange={(e) => fields.password.onChange(e.target.value)}
          />
          {fields.password.firstError && (
            <p className="login-form__error">{fields.password.firstError.errorText}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Входим..." : "Войти"}
        </Button>
      </form>
    </div>
  );
};
